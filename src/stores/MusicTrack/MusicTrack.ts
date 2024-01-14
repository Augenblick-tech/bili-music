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
 * 当前播放音乐的音量
 */
export const playingMusicVolumeAtom = atom(CurrentPlayingMusicStorage.getVolume())

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
  set(_musicPlayerStateAtom, { ...state, playStatus: PlayStatus.paused })
})

/**
 * 更新播放进度
 *
 * @param progress [0~1] 播放进度，小数
 */
export const handleUpdateMusicProgressAtom = atom(null, (get, set, progress: number) => {
  const state = get(_musicPlayerStateAtom)
  if (!state) return
  set(_musicPlayerStateAtom, { ...state, progress: progress })
})

/**
 * 立即跳转音乐播放进度
 *
 * @param progress [0~1] 播放进度，小数
 */
export const handleJumpMusicProgressAtom = atom(null, (_, __, progress: number) => {
  const musicAudioElement = document.getElementById("music_player_audio") as HTMLAudioElement
  musicAudioElement.currentTime = musicAudioElement.duration * progress
})
