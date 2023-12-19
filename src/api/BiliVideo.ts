import { request } from "./axios"
import { BiliVideoURL, BiliVideoQuality, BiliVideoInfoResp } from "@/types/bili/BiliVideo"
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
  return request<BiliVideoInfoResp>({
    url: "/x/web-interface/view",
    method: "GET",
    params,
  })
}

export const getBiliVideoSearch = (keyword: string) => {
  return request<BiliSearchData>({
    url: "/x/web-interface/wbi/search/type",
    method: "GET",
    params: {
      search_type: "video",
      keyword,
    },
  })
}
