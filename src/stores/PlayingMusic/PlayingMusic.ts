import { CurrentPlayingMusicStorage } from "@/storage/CurrentPlayingMusic"
import { MusicPlayerState, PlayStatus } from "@/types/MusicPlayer"
import { BiliVideoInfo, BiliVideoURL } from "@/types/bili/BiliVideo"
import { atom } from "jotai"

/**
 * 音频 HTML 元素
 */
export const globalMusicElementAtom = atom<HTMLAudioElement | null>(null)

/**
 * 当前音乐的状态。
 */
const _musicPlayerStateAtom = atom<MusicPlayerState | null>(null)
export const musicPlayerStateAtom = atom((get) => get(_musicPlayerStateAtom))

/**
 * 当前播放音乐的音量（虚拟，非实际音量）
 * 只用于拖动音量条
 */
export const playingMusicVolumeAtom = atom(CurrentPlayingMusicStorage.getVolume())

/**
 * 当前音乐的播放状态
 */
export const playingMusicStatusAtom = atom<PlayStatus>(PlayStatus.paused)

/**
 * 从url加载音乐
 */
export const changeMusicUrlAtom = atom(null, (get, set, url: string) => {
  const state = get(_musicPlayerStateAtom)
  if (!state) return
  set(_musicPlayerStateAtom, { ...state, url: url })
})

/**
 * 从bili视频加载音乐
 */
export const changeMusicFromBliVideoAtom = atom(
  null,
  (_, set, biliVideoInfo: BiliVideoInfo, biliVideoUrl: BiliVideoURL) => {
    set(_musicPlayerStateAtom, {
      playStatus: PlayStatus.paused,
      url: biliVideoUrl.dash.audio[0].baseUrl,
      progress: 0,
      currentTime: 0,
      duration: biliVideoInfo.pages[0].duration,
      title: biliVideoInfo.title,
      cover: biliVideoInfo.pic,
      biliInfo: biliVideoInfo,
      biliUrl: biliVideoUrl,
    })
  },
)

export const updatePlayingMusicProgressAtom = atom(null, (get, set, progress: number) => {
  const state = get(_musicPlayerStateAtom)
  if (!state) return
  set(_musicPlayerStateAtom, { ...state, progress: progress })
})

/**
 * 立即播放
 */
export const handlePlayMusicAtom = atom(null, (get, set) => {
  const state = get(_musicPlayerStateAtom)
  if (!state) return
  set(_musicPlayerStateAtom, { ...state, playStatus: PlayStatus.playing })
})

/**
 * 暂停播放
 */
export const handlePauseMusicAtom = atom(null, (get, set) => {
  const state = get(_musicPlayerStateAtom)
  if (!state) return
  const globalMusicController = set(globalMusicControllerAtom)
  globalMusicController.pause()
  set(_musicPlayerStateAtom, { ...state, playStatus: PlayStatus.paused })
})

/**
 * 立即跳转音乐播放进度
 *
 * @param progress [0~1] 播放进度，小数
 */
export const handleJumpMusicProgressAtom = atom(null, (get, __, progress: number) => {
  const musicElement = get(globalMusicElementAtom)
  if (!musicElement) {
    return console.error(`globalMusicElementAtom is ${musicElement}`)
  }
  musicElement.currentTime = musicElement.duration * progress
})

/**
 * 音乐播放控制
 */
export const globalMusicControllerAtom = atom(null, (get) => {
  const audioEl = get(globalMusicElementAtom)
  let cachedVolume = CurrentPlayingMusicStorage.getVolume() ?? 1
  const getProgress = () => {
    return audioEl!.currentTime / audioEl!.duration
  }
  const play = () => {
    audioEl!.play()
  }
  const pause = () => {
    audioEl!.pause()
  }
  const isPaused = () => {
    return audioEl!.paused
  }
  const isMuted = () => {
    return audioEl!.volume === 0 || audioEl!.muted
  }
  const setVolume = (value: number) => {
    audioEl!.volume = value
  }
  const volumeUp = () => {
    const newVolume = audioEl!.volume + 0.1
    audioEl!.volume = newVolume
  }
  const volumeDown = () => {
    const newVolume = audioEl!.volume - 0.1
    audioEl!.volume = newVolume
  }
  const mute = () => {
    cachedVolume = audioEl!.volume
    audioEl!.volume = 0
  }
  const cancelMute = () => {
    audioEl!.volume = cachedVolume
  }
  const toggleMute = () => {
    if (audioEl!.muted || audioEl!.volume === 0) {
      cancelMute()
    } else {
      mute()
    }
  }
  const getCachedVolume = () => {
    return cachedVolume
  }
  return {
    getProgress,
    play,
    pause,
    isPaused,
    setVolume,
    volumeUp,
    volumeDown,
    isMuted,
    mute,
    cancelMute,
    toggleMute,
    getCachedVolume,
  }
})
