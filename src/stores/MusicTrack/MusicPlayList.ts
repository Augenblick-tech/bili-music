import { PlayListItem } from "@/types/MusicPlayList"
import { atom, useAtom } from "jotai"
import { changeMusicFromBliVideoAtom, handlePlayMusicAtom, musicPlayerStateAtom } from "./MusicTrack"
import { getBiliVideoInfo, getBiliVideoURL } from "@/api/BiliVideo"

/**
 * 全局音乐播放列表
 */
const _musicPlayListAtom = atom<PlayListItem[]>([])
const musicPlayListAtom = atom((get) => get(_musicPlayListAtom))

/**
 * 播放播放列表指定音乐
 */
const handlePlayMusicListItemAtom = atom(null, (_get, _set, playListItem: PlayListItem) => {
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
const replacePlayMusicListAtom = atom(null, (_get, set, newPlayList: PlayListItem[]) => {
  set(_musicPlayListAtom, newPlayList)
})

/**
 * 播放下一首
 */
const handlePlayNextMusicAtom = atom(null, (get, set) => {
  const current = get(musicPlayerStateAtom)
  const list = get(_musicPlayListAtom)
  const findIndex = list.findIndex((v) => v.bvid == current?.biliInfo?.bvid)
  const nextIndex = findIndex + 1
  getBiliVideoData(list[nextIndex].bvid).then((data) => {
    set(changeMusicFromBliVideoAtom, data.info.data, data.media.data)
    set(handlePlayMusicAtom)
  })
})

async function getBiliVideoData(bvid: string) {
  const info = await getBiliVideoInfo({ bvid: bvid })
  const media = await getBiliVideoURL({
    bvid: bvid,
    cid: info.data?.cid,
    fnval: 16,
  })
  return { info, media }
}

export {
  musicPlayListAtom,
  handlePlayMusicListItemAtom,
  addPlayMusicListAtom,
  replacePlayMusicListAtom,
  handlePlayNextMusicAtom,
}
