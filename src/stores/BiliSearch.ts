import { atom } from "jotai"
import type { BiliSearchResult } from "@/types/bili/BiliSearch"
import { BiliVideoSearchReq, getBiliVideoSearch } from "@/api/BiliVideo"

const searchResultsAtom = atom<BiliSearchResult[] | null>(null)

export const handleSearcuResultsAtom = atom(
  (get) => get(searchResultsAtom),
  async (_, set, params: BiliVideoSearchReq) => {
    return new Promise((resolve, reject) => {
      getBiliVideoSearch(params)
        .then((res) => {
          set(searchResultsAtom, res.data.result)
          resolve(res.data.result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
)
