import { getFavFolderList } from "@/api/BiliUserFavFolder"
import type { FavFolderDetailList } from "@/types/bili/BiliUserFavFolder"
import { atom } from "jotai"

const favFolderDetailListAtom = atom<{
  media_id: number
  pn: number
  ps: number
  data: FavFolderDetailList
} | null>(null)

export const handleFavFolderDetailListAtom = atom(
  (get) => get(favFolderDetailListAtom),
  async (_, set, media_id: number) => {
    const res = await getFavFolderList({
      media_id,
      pn: 1,
      ps: 20,
    })

    set(favFolderDetailListAtom, {
      media_id,
      pn: 1,
      ps: 20,
      data: res.data,
    })
  },
)

export const nextFavFolderDetailListAtom = atom(null, async (get, set) => {
  const oldRes = get(favFolderDetailListAtom)
  if (!oldRes || !oldRes.data.has_more) {
    return Promise.reject("No more results")
  }

  const res = await getFavFolderList({
    media_id: oldRes.media_id,
    pn: oldRes.pn + 1,
    ps: oldRes.ps,
  })

  if (!res.data.medias) {
    return Promise.reject("No more results")
  }

  set(favFolderDetailListAtom, {
    ...oldRes,
    pn: oldRes.pn + 1,
    data: {
      ...oldRes.data,
      medias: [...oldRes.data.medias, ...res.data.medias],
    },
  })
})
