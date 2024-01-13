import { useCurrentMusicStorage } from "@/storage/CurrentPlayingMusic"
import { globalMusicElementAtom } from "@/stores/MusicTrack/MusicTrack"
import { useAtom } from "jotai"

/**
 * 音乐播放控制
 */
export const useGlobalMusicController = () => {
  const [audioEl] = useAtom(globalMusicElementAtom)
  const currentMusicStorage = useCurrentMusicStorage()
  let cachedVolume = currentMusicStorage.getVolume() ?? 1
  const play = () => {
    audioEl!.play()
  }
  const pause = () => {
    audioEl!.pause()
  }
  const isMuted = () => {
    return audioEl!.volume === 0 || audioEl!.muted
  }
  const setVolume = (value: number) => {
    audioEl!.volume = value
    currentMusicStorage.setVolume(value)
  }
  const volumeUp = () => {
    const newVolume = audioEl!.volume + 0.1
    audioEl!.volume = newVolume
    currentMusicStorage.setVolume(newVolume)
  }
  const volumeDown = () => {
    const newVolume = audioEl!.volume - 0.1
    audioEl!.volume = newVolume
    currentMusicStorage.setVolume(newVolume)
  }
  const mute = () => {
    cachedVolume = audioEl!.volume
    audioEl!.volume = 0
    currentMusicStorage.setVolume(0)
  }
  const cancelMute = () => {
    audioEl!.volume = cachedVolume
    currentMusicStorage.setVolume(cachedVolume)
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
  return { play, pause, setVolume, volumeUp, volumeDown, isMuted, mute, cancelMute, toggleMute, getCachedVolume }
}
