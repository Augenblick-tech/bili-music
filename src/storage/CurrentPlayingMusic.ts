const CURRENT_VOLUME = "current_music_volume"
const CURRENT_PROGRESS = "current_music_progress"

/**
 * 当前音乐数据
 */
export function useCurrentMusicStorage() {
  function getProgress() {
    return Number(localStorage.getItem(CURRENT_PROGRESS))
  }
  function setProgress(progress: number) {
    localStorage.setItem(CURRENT_PROGRESS, progress.toString())
  }
  function getVolume() {
    return Number(localStorage.getItem(CURRENT_VOLUME))
  }
  function setVolume(volume: number) {
    localStorage.setItem(CURRENT_VOLUME, volume.toString())
  }
  return { getProgress, setProgress, getVolume, setVolume }
}
