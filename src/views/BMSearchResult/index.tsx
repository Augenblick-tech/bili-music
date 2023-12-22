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
import { getBiliVideoSearch } from "@/api/BiliVideo"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { formatPlayCount, formatTime } from "@/utils/videoUtils"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import type { BiliSearchResult } from "@/types/bili/BiliSearch"

const BMSearchResult = ({ className }: MergeWithDefaultProps) => {
  const [params] = useSearchParams()
  const [searchResult, setSearchResult] = useState<BiliSearchResult[]>()
  const [sort, setSort] = useState<"comprehensive" | "mostPlayed" | "latest">("comprehensive")

  const keyword = params.get("keyword") || ""

  useEffect(() => {
    getBiliVideoSearch({
      keyword,
    })
      .then((res) => {
        console.log(res)
        setSearchResult(res.data.result || [])
      })
      .catch((err) => {
        console.log(err)
        setSearchResult([])
      })
  }, [keyword])

  const [sentinel, hasMore] = useInfiniteScroll<HTMLTableRowElement>(async (page: number) => {
    return getBiliVideoSearch({
      keyword,
      page,
      order: sort,
    }).then((res) => {
      console.log(res)
      setSearchResult((prev) => {
        if (!prev) return res.data.result
        const prevResult = prev
        const newResult = res.data.result?.filter((item) => {
          return !prevResult.some((prevItem) => item.type === "video" && prevItem.id === item.id)
        })
        return prevResult.concat(newResult || [])
      })
      return {
        hasMore: res.data.numPages > 0 && res.data.page < 50,
        nextPage: res.data.page + 1,
      }
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
    <div className={className ?? ""}>
      <div className="title mb-2">
        <span>
          <span className="keyword mr-2 font-bold text-2xl">{params.get("keyword")}</span>
          <span className="text-sm text-gray-400">的搜索结果如下:</span>
        </span>
      </div>
      <div className="sort mb-2 flex space-x-2">
        <SortButton selected={sort === "comprehensive"} onClick={() => setSort("comprehensive")}>
          综合排序
        </SortButton>
        <SortButton selected={sort === "mostPlayed"} onClick={() => setSort("mostPlayed")}>
          最多播放
        </SortButton>
        <SortButton selected={sort === "latest"} onClick={() => setSort("latest")}>
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
                          onClick={() => {
                            console.log("play")
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
                  {item.pubdate ? formatTime(item.pubdate) : "未知"}
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
