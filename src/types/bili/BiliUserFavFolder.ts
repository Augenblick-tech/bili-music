/**
 * 用户收藏夹
 */
export type UserFavFolder<T> = {
  /** 创建的收藏夹数 */
  count: number
  /** 收藏夹列表 */
  list: T
}

/**
 * 用户创建的收藏夹
 */
export type UserCreatedFavFolder = UserFavFolder<UserCreatedFavFolderItem[]>

/**
 * 用户收藏的收藏夹
 */
export type UserCollectedFavFolder = UserFavFolder<UserCollectedFavFolderItem[]>

/**
 * 收藏夹列表项
 */
export type UserFavFolderItem = {
  /** 收藏夹 mlid */
  id: number
  /** 原始收藏夹mlid */
  fid: number
  /** 创建用户的 mid */
  mid: number
  /**
   * 收藏夹属性位配置
   * 第 0 位：0 为默认收藏夹，1 为其他收藏夹
   * 第 1 位：0 为公开收藏夹，1 为私密收藏夹
   */
  attr: number
  /** 收藏夹名称 */
  title: string
  fav_state: number
  /** 收藏夹总计视频数 */
  media_count: number
}

/**
 * 用户创建的收藏夹列表项
 */
export type UserCreatedFavFolderItem = UserFavFolderItem

/**
 * 用户收藏的收藏夹列表项
 */
export type UserCollectedFavFolderItem = UserCreatedFavFolderItem & {
  /** 收藏夹封面 */
  cover: string
  /** 收藏夹创建用户信息 */
  upper: Upper
  cover_type: number
  intro: string
  /** 创建时间 */
  ctime: number
  /** 审核时间 */
  mtime: number
  state: number
}

type Upper = {
  /** 创建人 mid */
  mid: number
  /** 创建人名称 */
  name: string
  /** 创建人头像 */
  face: string
}

/**
 * 收藏夹元数据
 */
export type FavFolderInfo = {
  /** 收藏夹 mlid（完整 id ）收藏夹原始 id + 创建者 mid 尾号 2 位 */
  id: number
  /** 收藏夹原始 id */
  fid: number
  /** 创建者 mid */
  mid: number
  /**
   * 收藏夹属性位配置
   * 第 0 位：0 为默认收藏夹，1 为其他收藏夹
   * 第 1 位：0 为公开收藏夹，1 为私密收藏夹
   * @example 0 // 默认收藏夹
   */
  attr: number
  /** 收藏夹名称 */
  title: string
  /** 收藏夹封面 */
  cover: string
  cover_type: number
  /** 收藏夹状态数 */
  cnt_info: FolderCntInfo
  /** 类型（？） */
  type: number
  /** 备注 */
  intro: string
  /** 创建时间 */
  ctime: number
  /** 收藏时间 */
  mtime: number
  /** 状态 */
  state: number
  /** 收藏状态, 1 为已收藏, 0 为未收藏 */
  fav_state: number
  /** 点赞状态 */
  like_state: number
  /** 收藏夹视频数 */
  media_count: number
}

type FolderCntInfo = {
  /** 收藏数 */
  collect: number
  /** 播放数 */
  play: number
  /** 点赞数 */
  thumb_up: number
  /** 分享数 */
  share: number
}

/**
 * 收藏夹内容明细列表
 */
export type FavFolderDetailList = {
  /** 收藏夹元数据 */
  info: FavFolderInfo
  /** 收藏夹内容列表 */
  medias: FavFolderListItem[]
  /** 是否有下一页 */
  has_more: boolean
  ttl: number
}

/**
 * 收藏夹全部内容
 */
export type FavFolderListItem = {
  /** 内容 id, 视频稿件：视频稿件avid, 音频：音频auid, 视频合集：视频合集id */
  id: number
  /** 内容类型, 2 为视频稿件, 12 为音频, 21 为视频合集 */
  type: number
  /** 标题 */
  title: string
  /** 封面 */
  cover: string
  /** 简介 */
  intro: string
  /** 视频分P数	*/
  page: number
  /** 视频时长 */
  duration: number
  /** up主信息 */
  upper: Upper
  /** 状态数 */
  cnt_info: FolderCntInfo
  /** 投稿时间 */
  ctime: number
  /** 发布时间 */
  pubtime: number
  /** 收藏时间 */
  fav_time: number
  /** 视频稿件 bvid */
  bv_id: string
  /** 视频稿件 bvid */
  bvid: string
}
