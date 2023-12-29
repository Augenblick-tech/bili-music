import { BiliVideoInfo, BiliVideoURL } from "./bili/BiliVideo"

/**
 * 播放列表项
 */
export interface PlayListItem {
  /** 音轨链接 */
  url: string
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