import { BiliResp } from "./BiliResp"

export interface BiliSearchData {
  seid: number
  page: number
  pagesize: number // 每页条数，固定 20
  numResults: number // 总条数
  numPages: number // 总页数
  result: BiliSearchResult[]
}

export interface BiliSearchResult {
  type: string
  id: number // 视频 avid
  author: string // up 主名
  mid: number // up 主 id
  typeid: number // 分区 id
  typename: string // 分区名
  arcurl: string // 视频链接
  aid: number // 视频 avid
  bvid: string // 视频 bvid
  title: string // 视频标题
  description: string // 视频简介
  pic: string // 视频封面
  play: number // 播放量
  video_review: number // 弹幕数
  favorites: number // 收藏数
  tag: string // 视频标签, 逗号分隔
  review: number // 评论数
  pubdate: number // 发布时间
  senddate: number // 投稿时间
  duration: number // 视频时长
}

export type BiliSearch = BiliResp<BiliSearchData>
