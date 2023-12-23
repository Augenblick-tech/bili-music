import { BiliVideoInfo, BiliVideoURL } from "./bili/BiliVideo"

/**
 * 音乐播放器状态
 */
export interface MusicPlayerState {
  playStatus: PlayStatus
  /** 音轨链接 */
  url: string
  /** 当前播放进度，注：非实时更新，故而有延迟 */
  progress: number
  /** 当前播放时间点，实时更新 */
  currentTime: number

  /** 完整时长 */
  duration: number

  /** 标题 */
  title: string
  /** 封面 */
  cover: string

  /** bili视频信息 */
  biliInfo?: BiliVideoInfo
  /** bili视频链接配置 */
  biliUrl?: BiliVideoURL
}

/**
 * 音乐的播放状态
 */
export enum PlayStatus {
  /**当前无播放任务 */
  empty,
  /** 正在播放 */
  playing,
  /** 已暂停 */
  paused,
  /** 缓冲中 */
  loading,
}
