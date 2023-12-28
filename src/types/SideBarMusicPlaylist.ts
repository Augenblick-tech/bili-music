import { MenuListItem } from "./MenuList"

/**
 * 侧边栏音乐收藏夹
 */
export interface SideBarMusicPlaylistItem extends MenuListItem {
  /** 歌单标题 */
  title: string
  /** 歌单封面 */
  cover: string
  /** 收藏夹 media_id */
  id: number
  /** 收藏夹路径 + media_id */
  path: string
}
