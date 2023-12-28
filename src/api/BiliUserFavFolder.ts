import {
  UserCreatedFavFolder,
  UserCollectedFavFolder,
  FavFolderInfo,
  FavFolderListItem,
} from "@/types/bili/BiliUserFavFolder"
import { request } from "./axios"

/**
 * 获取用户创建的收藏夹
 * @param params
 */
export const getUserCreatedFolder = (params: {
  /** 用户 mid */
  up_mid: number
}) => {
  return request<UserCreatedFavFolder>({
    url: "/x/v3/fav/folder/created/list-all",
    method: "GET",
    params,
  })
}

/**
 * 获取用户收藏的收藏夹
 * @param params
 */
export const getUserCollectedFolder = (params: {
  /** 每页项数 */
  ps: number
  /** 页码，从 1 开始 */
  pn: number
  /** 用户 mid */
  up_mid: number
  /** 平台类型，填写web 返回值才会包含用户收藏的视频合集 */
  platform?: "web"
}) => {
  return request<UserCollectedFavFolder>({
    url: "/x/v3/fav/folder/collected/list",
    method: "GET",
    params,
  })
}

/**
 * 获取收藏夹元数据
 */
export const getFavFolderInfo = (params: {
  /** 目标收藏夹id（完整id） */
  media_id: number
}) => {
  return request<FavFolderInfo>({
    url: "/x/v3/fav/folder/info",
    method: "GET",
    params,
  })
}

/**
 * 获取收藏夹全部内容
 */
export const getFavFolderList = (params: {
  /** 目标收藏夹id（完整id） */
  media_id: number
  /** 平台标识 */
  platform?: "web"
}) => {
  return request<FavFolderListItem[] | null>({
    url: "/x/v3/fav/resource/list",
    method: "GET",
    params,
  })
}
