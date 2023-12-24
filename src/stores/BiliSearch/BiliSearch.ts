import { atom } from "jotai"
import type { BiliSearchResult, BiliSearchData } from "@/types/bili/BiliSearch"
import { BiliVideoSearchReq, getBiliVideoSearch } from "@/api/BiliVideo"

const searchDataAtom = atom<BiliSearchData | null>(null)
const searchResultsAtom = atom<BiliSearchResult[] | null>(null)
const searchPreviewResultsAtom = atom<BiliSearchResult[] | null>(null)

const handleSearch = async (params: BiliVideoSearchReq) => {
  const res = await getBiliVideoSearch(params)
  console.log(res)
  if (!res.data || res.data.numPages <= 0) return Promise.reject("No more results")
  return res.data
}

/**
 * 搜索框搜索结果预览
 */
export const handleSearchPreviewResultsAtom = atom(
  (get) => get(searchPreviewResultsAtom),
  async (_, set, params: BiliVideoSearchReq) => {
    try {
      const data = await handleSearch(params)
      const results = data.result.filter((item) => item.type === "video")
      set(searchPreviewResultsAtom, results)
    } catch (err) {
      if (err === "No more results") {
        set(searchPreviewResultsAtom, [])
      } else {
        throw err
      }
    }
  },
)

/**
 * 搜索页具体结果
 */
export const handleSearchResultsAtom = atom(
  (get) => get(searchResultsAtom),
  async (get, set, params: BiliVideoSearchReq) => {
    try {
      const data = await handleSearch(params)
      set(searchDataAtom, data)
      const results = data.result.filter((item) => item.type === "video")
      set(searchResultsAtom, results)
    } catch (err) {
      if (err === "No more results") {
        get(searchResultsAtom) && set(searchResultsAtom, [])
      } else {
        throw err
      }
    }
  },
)

/**
 * 搜索页加载下一页
 */
export const nextSearchResultsAtom = atom(null, async (get, set, params: Omit<BiliVideoSearchReq, "page">) => {
  const searchData = get(searchDataAtom)
  const results = get(searchResultsAtom)
  if (results === null || searchData === null) return
  const res = await getBiliVideoSearch({ ...params, page: searchData.page + 1 })
  if (res.data.numPages <= 0 || !res.data.result) return Promise.reject("No more results")
  set(searchDataAtom, res.data)
  const newResults = res.data.result.filter(
    (item) => !results.some((result) => item.type === "video" && result.id === item.id),
  )
  set(searchResultsAtom, [...results, ...newResults])
})
