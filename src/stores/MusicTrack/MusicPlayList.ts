import { PlayListItem } from "@/types/MusicPlayList"
import { atom, useAtom } from "jotai"
import { changeMusicFromBliVideoAtom } from "./MusicTrack"

/**
 * 全局音乐播放列表
 */
const _musicPlayListAtom = atom<PlayListItem[]>([])
const musicPlayListAtom = atom((get) => get(_musicPlayListAtom))

/**
 * 播放播放列表指定音乐
 */
const handlePlayMusicListItemAtom = atom(null, (get, set, playListItem: PlayListItem) => {
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  if (!playListItem.biliInfo) return
  if (!playListItem.biliUrl) return
  changeMusicFromBliVideo(playListItem.biliInfo, playListItem.biliUrl)
})

/**
 * 添加播放列表
 */
const addPlayMusicListAtom = atom(null, (get, set, newPlayList: PlayListItem[]) => {
  const musicPlayList = get(_musicPlayListAtom)
  set(_musicPlayListAtom, [...musicPlayList, ...newPlayList])
})

/**
 * 替换播放列表
 */
const replacePlayMusicListAtom = atom(null, (get, set, newPlayList: PlayListItem[]) => {
  set(_musicPlayListAtom, newPlayList)
})

export { musicPlayListAtom, handlePlayMusicListItemAtom, addPlayMusicListAtom, replacePlayMusicListAtom }
