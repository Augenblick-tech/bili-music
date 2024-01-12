import { globalMusicElementAtom } from "@/stores/MusicTrack/MusicTrack"
import { useAtom } from "jotai"

export function useGlobalMusicController() {
  const [audioEl] = useAtom(globalMusicElementAtom)
  const setVolume = (value: number) => {
    if (!audioEl) return
    audioEl.volume = value
  }
  const volumeUp = () => {
    if (!audioEl) return
    audioEl.volume = audioEl.volume + 0.1
  }
  const volumeDown = () => {
    if (!audioEl) return
    audioEl.volume = audioEl.volume - 0.1
  }
  return { setVolume, volumeUp, volumeDown }
}
