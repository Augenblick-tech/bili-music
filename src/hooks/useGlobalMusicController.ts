import { globalMusicElementAtom } from "@/stores/MusicTrack/MusicTrack"
import { useAtom } from "jotai"

/**
 * 音乐播放控制
 */
export const useGlobalMusicController = () => {
  const [audioEl] = useAtom(globalMusicElementAtom)
  let cachedVolume = audioEl?.volume ?? 1
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
  }
  const volumeUp = () => {
    audioEl!.volume = audioEl!.volume + 0.1
  }
  const volumeDown = () => {
    audioEl!.volume = audioEl!.volume - 0.1
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
  return { play, pause, setVolume, volumeUp, volumeDown, isMuted, mute, cancelMute, toggleMute, getCachedVolume }
}
