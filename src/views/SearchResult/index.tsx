import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FaRegCirclePlay } from "react-icons/fa6"
import { getBiliVideoInfo, getBiliVideoURL } from "@/api/BiliVideo"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { formatPlayCount, formatTime } from "@/utils/videoUtils"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { useAtom, useSetAtom } from "jotai"
import { handleSearchResultsAtom, nextSearchResultsAtom } from "@/stores/BiliSearch/BiliSearch"
import { changeMusicFromBliVideoAtom, handlePlayMusicAtom, musicPlayerStateAtom } from "@/stores/MusicTrack/MusicTrack"
import { useScrollToTop } from "@/hooks/useScrollToTop"
import { replacePlayMusicListAtom } from "@/stores/MusicTrack/MusicPlayList"
import { removeHTMLTags } from "@/utils/htmlUtil"
import useLoading from "@/hooks/useLoading"
import InfiniteSpin from "@/components/common/InfiniteSpin"
import type { BiliSearchResult } from "@/types/bili/BiliSearch"
import Column from "antd/es/table/Column"
import { PlayListItem } from "@/types/MusicPlayList"
import MusicListTable from "@/components/common/MusicListTable"
import MusicImage from "@/components/common/MusicImage"

type OrderType = "totalrank" | "click" | "pubdate"

const SearchResult = ({ className }: MergeWithDefaultProps) => {
  const [params] = useSearchParams()
  const [searchResult, handleSearchResult] = useAtom(handleSearchResultsAtom)
  const nextSearchResult = useSetAtom(nextSearchResultsAtom)
  const [order, setOrder] = useState<OrderType>("totalrank")
  const [containerRef, scrollToTop] = useScrollToTop<HTMLDivElement>()
  const [loading] = useLoading(() => {
    return searchResult ? false : true
  }, [searchResult])

  const [musicPlayerState] = useAtom(musicPlayerStateAtom)
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, replacePlayMusicList] = useAtom(replacePlayMusicListAtom)

  const keyword = params.get("keyword") || ""

  useEffect(() => {
    handleSearchResult({
      keyword,
      order,
    })
    scrollToTop()
  }, [handleSearchResult, keyword, order, scrollToTop])

  const [sentinel, hasMore] = useInfiniteScroll<HTMLTableRowElement>(async () => {
    return nextSearchResult({
      keyword,
      order,
    })
  })

  const sortArr: [string, OrderType][] = [
    ["综合排序", "totalrank"],
    ["最多播放", "click"],
    ["最新发布", "pubdate"],
  ]

  return (
    <div className={`${className ?? ""} scrollbar h-full`} ref={containerRef}>
      <div className="title mb-2">
        <span>
          <span className="keyword mr-2 font-bold text-2xl">{params.get("keyword")}</span>
          <span className="text-sm text-gray-400">的搜索结果如下:</span>
        </span>
      </div>
      <div className="sort mb-2 flex space-x-2">
        {sortArr.map(([label, value]) => (
          <button
            key={value}
            className={`${
              order === value ? "bg-[#DFF6FD] text-[#00AEEC]" : ""
            } border-none shadow-none [&:hover]:text-[#00AEEC] text-xs px-3 py-2 rounded-lg`}
            onClick={() => setOrder(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {searchResult && !loading ? (
        <MusicListTable<BiliSearchResult>
          dataSource={searchResult}
          rowKey={(record) => {
            return record.bvid
          }}
          tableLayout="fixed"
          className="mx-2.5 select-none"
        >
          <Column<BiliSearchResult>
            title="标题"
            dataIndex="title"
            key="title"
            width="60%"
            render={(value, record, index) => {
              return (
                <div className="flex" ref={index === (searchResult?.length ?? 0) - 1 ? sentinel : null}>
                  <div className="flex items-center mr-2 w-16 h-16 flex-shrink-0 rounded-lg relative overflow-hidden">
                    <MusicImage className="h-full w-full rounded object-cover" src={record.pic} alt="" />
                    <div className="cover absolute t-0 l-0 h-full w-full hidden">
                      <FaRegCirclePlay
                        onClick={async () => {
                          // 立即播放
                          try {
                            const info = await getBiliVideoInfo({ bvid: record.bvid })
                            const media = await getBiliVideoURL({
                              bvid: record.bvid,
                              cid: info.data?.cid,
                              fnval: 16,
                            })
                            changeMusicFromBliVideo(info.data, media.data)
                            handlePlayMusic()
                            replacePlayMusicList(
                              searchResult?.map((v) => {
                                return {
                                  bvid: v.bvid,
                                  url: media.data.dash.audio[0].baseUrl,
                                  duration: info.data.pages[0].duration,
                                  title: removeHTMLTags(v.title),
                                  cover: v.pic,
                                }
                              }) as PlayListItem[],
                            )
                            console.log(musicPlayerState)
                          } catch (error) {
                            console.error(error)
                          }
                        }}
                        className="text-white cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className="[&>.keyword]:text-red-500 [&>em]:[font-style:normal]"
                      dangerouslySetInnerHTML={{ __html: value }}
                    ></span>
                  </div>
                </div>
              )
            }}
          />
          <Column<BiliSearchResult> title="UP主" dataIndex="author" key="author" />
          <Column<BiliSearchResult>
            title="播放量"
            dataIndex="play"
            key="play"
            render={(value) => {
              return formatPlayCount(value)
            }}
          />
          <Column<BiliSearchResult>
            title="发布时间"
            dataIndex="pubdate"
            key="pubdate"
            render={(value) => {
              return formatTime(value * 1000)
            }}
          />
        </MusicListTable>
      ) : (
        <InfiniteSpin />
      )}
      {!hasMore ||
        (searchResult?.length !== 0 && (
          <div className="text-center text-gray-400 text-sm py-2 my-2 select-none">没有更多了哦~</div>
        ))}
    </div>
  )
}

export default SearchResult
