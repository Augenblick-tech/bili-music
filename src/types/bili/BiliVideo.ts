import { BiliResp } from "./BiliResp"

export interface BiliVideoURL {
  from: string
  result: string
  message: string
  quality: BiliVideoQuality
  format: string
  timelength: number
  accept_format: string
  accept_description: string[]
  accept_quality: number[]
  video_codecid: number
  seek_param: string
  seek_type: string
  durl: BiliVideoDURL[]
  dash: BiliVideoDASH
  support_formats: BiliVideoFormat[]
  high_format: BiliVideoFormat
  last_play_time: number
  last_play_cid: number
}

export type BiliVideoURLResp = BiliResp<BiliVideoURL>

export enum BiliVideoQuality {
  "240P 极速" = 6,
  "360P 流畅" = 16,
  "480P 清晰" = 32,
  "720P 高清" = 64,
  "720P60 高帧率" = 74,
  "1080P 高清" = 80,
  "1080P+ 高码率" = 112,
  "1080P60 高帧率" = 116,
  "4K 超清" = 120,
}

interface BiliVideoDURL {
  order: number // 视频分段序号
  length: number // 视频长度
  size: number // 视频大小
  ahead: string // 视频地址
  vhead: string // 音频地址
  url: string // 视频地址
  backup_url: string[] // 视频备用地址
}

interface BiliVideoDASH {
  duration: number // 视频总时长
  minBufferTime: number
  video: BiliVideoDASHItem[]
  audio: BiliVideoDASHItem[]
  dolby: BiliVideoDASHDolby
  flac: BiliVideoDASHFlac
}

interface BiliVideoDASHItem {
  id: number // 音视频清晰度代码
  baseUrl: string // 默认流 URL
  backupUrl: string[] // 备用流 URL
  bandwidth: number
  mimeType: string
  codec: string
  width?: number
  height?: number
  frameRate?: string
  sar?: string
  startWithSAP?: number
}

interface BiliVideoDASHDolby {
  type: number // 1：普通杜比音效, 2：全景杜比音效
  audio: BiliVideoDASHItem[]
}

interface BiliVideoDASHFlac {
  audio: BiliVideoDASHItem[]
}

interface BiliVideoFormat {
  quality: number
  format: string
  new_description: string
  display_desc: string
  superscript: string
  codec: string
}

export interface BiliVideoInfo {
  bvid: string // BV号
  aid: number // AV号
  videos: number // 分P数量
  tid: number // 分区id
  tname: string // 分区名
  copyright: number | 1 | 2 // 1: 原创，2: 转载
  pic: string // 封面图
  title: string // 标题
  pubdate: number // 发布时间
  ctime: number // 创建时间
  desc: string // 简介
  desc_v2: BiliVideoDescV2[] // 简介 v2
  state: number // 状态
  duration: number // 稿件总时长(所有分 P 的总时长)
  owner: BiliVideoOwner // UP主信息
  stat: BiliVideoStat // 视频状态
  dynamic: string // 动态
  cid: number // 视频 1P id
  dimension: BiliVideoDimension // 视频尺寸
  pages: BiliVideoPage[] // 分P信息
  subtitle: BiliVideoSubtitle // 字幕信息
  // staff: BiliVideoStaff // 制作人员
}

export type BiliVideoInfoResp = BiliResp<BiliVideoInfo>

interface BiliVideoDescV2 {
  raw_text: string
  type: number
  biz_id: number
}

interface BiliVideoOwner {
  mid: number // UP主 id
  name: string // UP主名
  face: string // UP主头像
}

interface BiliVideoStat {
  aid: number // AV号
  view: number // 播放量
  danmaku: number // 弹幕数
  reply: number // 评论数
  favorite: number // 收藏数
  coin: number // 硬币数
  share: number // 分享数
  now_rank: number // 当前排名
  his_rank: number // 历史最高排名
  like: number // 点赞数
  dislike: number // 点踩数
  evaluation: string // 评分
  argue_msg: string // 争议信息
}

interface BiliVideoDimension {
  width: number
  height: number
  rotate: number
}

interface BiliVideoPage {
  cid: number // 分P id
  page: number // 分P序号
  from: string // 分P来源
  part: string // 分P标题
  duration: number // 分P时长
  dimension: BiliVideoDimension // 分P尺寸
}

interface BiliVideoSubtitle {
  allow_submit: boolean // 是否允许字幕提交
  list: BiliVideoSubtitleItem[] // 字幕列表
}

interface BiliVideoSubtitleItem {
  id: number // 字幕 id
  vid: number // 视频 id
  lan: string // 字幕语言
  lan_doc: string // 字幕语言文档
  is_lock: boolean // 是否锁定
  author_mid: number // 作者 id
  subtitle_url: string // 字幕地址
  // author: BiliVideoSubtitleAuthor // 作者信息
}
