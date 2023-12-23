import { request } from "./axios"
import { BiliVideoURL, BiliVideoQuality, BiliVideoInfo } from "@/types/bili/BiliVideo"
import { BiliSearchData } from "@/types/bili/BiliSearch"

interface BiliVideoReq {
  bvid: string
  cid: number // 分P id
  qn?: BiliVideoQuality // 视频质量
  fnval?: number // 视频格式
  fnver?: number
  fourk?: number | 0 | 1 // 是否为 4K
  session?: string
  otype?: "json"
  platform?: string | "pc" | "html5"
  high_quality?: number | 0 | 1 // 是否为高质量
}

export const getBiliVideoURL = (params: BiliVideoReq) => {
  return request<BiliVideoURL>({
    url: "/x/player/playurl",
    method: "GET",
    params,
  })
}

interface BiliVideoInfoReq {
  bvid: string
}

export const getBiliVideoInfo = (params: BiliVideoInfoReq) => {
  return request<BiliVideoInfo>({
    url: "/x/web-interface/view",
    method: "GET",
    params,
  })
}

interface BiliVideoSearchReq {
  keyword: string
  order?: string | "totalrank" | "click" | "pubdate" // 排序方式, 默认为 totalrank, 可选值为 totalrank, click, pubdate, dm, stow
  page?: number
}

export const getBiliVideoSearch = (params: BiliVideoSearchReq) => {
  return request<BiliSearchData>({
    url: "/x/web-interface/wbi/search/type",
    method: "GET",
    params: {
      search_type: "video",
      ...params,
    },
  })
}
