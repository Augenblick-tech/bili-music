const CURRENT_VOLUME = "current_music_volume"
const CURRENT_PROGRESS = "current_music_progress"

/**
 * 当前音乐数据的本地存储
 */
export class CurrentPlayingMusicStorage {
  static getProgress() {
    return Number(localStorage.getItem(CURRENT_PROGRESS))
  }
  static setProgress(progress: number) {
    localStorage.setItem(CURRENT_PROGRESS, progress.toString())
  }
  static getVolume() {
    return Number(localStorage.getItem(CURRENT_VOLUME))
  }
  static setVolume(volume: number) {
    localStorage.setItem(CURRENT_VOLUME, volume.toString())
  }
}
