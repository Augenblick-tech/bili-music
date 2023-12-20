import { atom } from "jotai"
import { BiliVideoURL } from "@/types/bili/BiliVideo"
import { BiliSearchData } from "@/types/bili/BiliSearch"

export const BiliVideoAtom = atom<BiliVideoURL | null>(null)
export const readonlyBiliVideoAtom = atom((get) => get(BiliVideoAtom))

export const BiliSearchAtom = atom<BiliSearchData | null>(null)
