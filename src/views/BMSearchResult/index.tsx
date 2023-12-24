import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material"
import { FaRegCirclePlay } from "react-icons/fa6"
import { getBiliVideoInfo, getBiliVideoURL } from "@/api/BiliVideo"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { formatPlayCount, formatTime } from "@/utils/videoUtils"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { useAtom } from "jotai"
import { handleSearchResultsAtom, nextSearchResultsAtom } from "@/stores/BiliSearch/BiliSearch"
import { changeMusicFromBliVideoAtom, handlePlayMusicAtom, musicPlayerStateAtom } from "@/stores/MusicTrack/MusicTrack"
import { useScrollToTop } from "@/hooks/useScrollToTop"

const BMSearchResult = ({ className }: MergeWithDefaultProps) => {
  const [params] = useSearchParams()
  const [searchResult, handleSearchResult] = useAtom(handleSearchResultsAtom)
  const [, nextSearchResult] = useAtom(nextSearchResultsAtom)
  const [order, setOrder] = useState<"totalrank" | "click" | "pubdate">("totalrank")
  const [containerRef, scrollToTop] = useScrollToTop<HTMLDivElement>()

  const [musicPlayerState] = useAtom(musicPlayerStateAtom)
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)

  const keyword = params.get("keyword") || ""

  useEffect(() => {
    handleSearchResult({
      keyword,
      order,
    })
    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, order])

  const [sentinel, hasMore] = useInfiniteScroll<HTMLTableRowElement>(async () => {
    return nextSearchResult({
      keyword,
      order,
    })
  })

  const SortButton = ({
    selected,
    children,
    onClick,
  }: MergeWithDefaultProps<{
    selected?: boolean
    onClick?: () => void | undefined
  }>) => {
    return (
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          display: "inline",
          flex: "none",
          fontSize: "12px",
          borderRadius: "6px",
          "&.Mui-selected": {
            backgroundColor: "#DFF6FD",
            color: "#00AEEC",
          },
        }}
      >
        {children}
      </ListItemButton>
    )
  }

  return (
    <div className={`${className ?? ""} scrollbar h-full padding-footer`} ref={containerRef}>
      <div className="title mb-2">
        <span>
          <span className="keyword mr-2 font-bold text-2xl">{params.get("keyword")}</span>
          <span className="text-sm text-gray-400">的搜索结果如下:</span>
        </span>
      </div>
      <div className="sort mb-2 flex space-x-2">
        <SortButton selected={order === "totalrank"} onClick={() => setOrder("totalrank")}>
          综合排序
        </SortButton>
        <SortButton selected={order === "click"} onClick={() => setOrder("click")}>
          最多播放
        </SortButton>
        <SortButton selected={order === "pubdate"} onClick={() => setOrder("pubdate")}>
          最新发布
        </SortButton>
      </div>
      <TableContainer
        sx={{
          padding: "4px var(--safe-area-height) 18px 9px",
          width: "inherit",
        }}
      >
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableHead className="select-none">
            <TableRow>
              {["标题", "UP主", "播放量", "发布时间"].map((item) => (
                <TableCell
                  sx={{
                    fontSize: "12px",
                    padding: "4px 8px",
                  }}
                  align={item === "标题" ? "left" : "center"}
                  key={item}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableRow-root td:first-of-type": {
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              },
              "& .MuiTableRow-root td:last-child": {
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              },
              "& .MuiTableRow-root td": {
                fontSize: "12px",
              },
            }}
          >
            {searchResult?.map((item, index) => (
              <TableRow
                ref={index === searchResult.length - 1 ? sentinel : null}
                key={item.id}
                sx={{
                  margin: "4px 12px",
                  borderRadius: "0.5rem",
                  "&:hover .cover": {
                    display: "block",
                    backgroundColor: "rgba(107, 114, 128,0.5)",
                  },
                }}
                className="select-none [&:hover]:bg-white [&:hover]:shadow-lg"
              >
                <TableCell
                  width={"450px"}
                  sx={{
                    padding: "0.75rem",
                  }}
                >
                  <div className="flex text-sm">
                    <div className="pic w-16 h-16 flex-shrink-0 relative rounded-lg mr-4 overflow-hidden">
                      <div className="cover absolute t-0 l-0 h-full w-full hidden">
                        <FaRegCirclePlay
                          onClick={async () => {
                            // 立即播放
                            try {
                              const info = await getBiliVideoInfo({ bvid: item.bvid })
                              const media = await getBiliVideoURL({
                                bvid: item.bvid,
                                cid: info.data?.cid!,
                                fnval: 16,
                              })
                              changeMusicFromBliVideo(info.data, media.data)
                              handlePlayMusic()
                              console.log(musicPlayerState)
                            } catch (error) {
                              console.error(error)
                            }
                          }}
                          className="text-white cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                        />
                      </div>
                      <img src={item.pic} className="h-full w-full object-cover" alt="" />
                    </div>
                    <span
                      className="[&>.keyword]:text-red-500 [&>em]:[font-style:normal]"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></span>
                  </div>
                </TableCell>
                <TableCell align="center">{item.author}</TableCell>
                <TableCell align="center">{formatPlayCount(item.play)}</TableCell>
                <TableCell className="flex-shrink-0" align="center">
                  {item.pubdate ? formatTime(item.pubdate * 1000) : "未知"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!hasMore || searchResult?.length == 0) && (
        <div className="text-center text-gray-400 text-sm py-2 my-2 select-none">没有更多了哦~</div>
      )}
    </div>
  )
}

export default BMSearchResult
