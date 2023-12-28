import { getUserCreatedFolder, getUserCollectedFolder } from "@/api/BiliUserFavFolder"
import type { UserCollectedFavFolder, UserCreatedFavFolder } from "@/types/bili/BiliUserFavFolder"
import { atom } from "jotai"

const userCreatedFolderAtom = atom<UserCreatedFavFolder | null>(null)
const userCollectedFolderAtom = atom<UserCollectedFavFolder | null>(null)

export const handleUserCreatedFolderAtom = atom(
  (get) => get(userCreatedFolderAtom),
  async (_, set, mid: number) => {
    const res = await getUserCreatedFolder({
      up_mid: mid,
    })
    console.log(res.data)
    set(userCreatedFolderAtom, res.data)
  },
)

export const handleUserCollectedFolderAtom = atom(
  (get) => get(userCollectedFolderAtom),
  async (_, set, mid: number) => {
    const res = await getUserCollectedFolder({
      ps: 70,
      pn: 1,
      up_mid: mid,
    })
    console.log(res.data)
    set(userCollectedFolderAtom, res.data)
  },
)
