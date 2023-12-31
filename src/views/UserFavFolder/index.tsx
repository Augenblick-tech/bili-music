import { handleFavFolderDetailListAtom, nextFavFolderDetailListAtom } from "@/stores/UserFavFolder/UserFavFolderInfo"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { Button, ConfigProvider, Table } from "antd"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaRegCirclePlay } from "react-icons/fa6"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import Column from "antd/es/table/Column"
import { FavFolderListItem } from "@/types/bili/BiliUserFavFolder"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { useScrollToTop } from "@/hooks/useScrollToTop"
import { formatDuration } from "@/utils/videoUtils"
import { replacePlayMusicListAtom } from "@/stores/MusicTrack/MusicPlayList"
import { getBiliVideoInfo, getBiliVideoURL } from "@/api/BiliVideo"
import { removeHTMLTags } from "@/utils/htmlUtil"
import { musicPlayerStateAtom, changeMusicFromBliVideoAtom, handlePlayMusicAtom } from "@/stores/MusicTrack/MusicTrack"
import type { PlayListItem } from "@/types/MusicPlayList"

const FolderSongList = () => {
  const { id } = useParams()
  const [favFolderDetailList] = useAtom(handleFavFolderDetailListAtom)
  const [, nextFavFolderDetailList] = useAtom(nextFavFolderDetailListAtom)
  const [sentinel, hasMore, setHasMore] = useInfiniteScroll<HTMLDivElement>(async () => {
    await nextFavFolderDetailList()
  })

  const [musicPlayerState] = useAtom(musicPlayerStateAtom)
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, replacePlayMusicList] = useAtom(replacePlayMusicListAtom)

  useEffect(() => {
    setHasMore(true)
  }, [id, setHasMore])

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: "transparent",
              footerBg: "transparent",
              headerBg: "transparent",
              rowHoverBg: "white",
            },
          },
        }}
      >
        <Table<FavFolderListItem>
          dataSource={favFolderDetailList?.data.medias}
          rowKey={(record) => {
            return record.bvid
          }}
          pagination={false}
          size="small"
          tableLayout="fixed"
          rowClassName="fav-song-list-row"
          className={`
            ml-2.5
            [&_.ant-table]:bg-transparent
            [&_.fav-song-list-row]:overflow-hidden
            [&_.fav-song-list-row_td:first-child]:[border-top-left-radius:10px] [&_.fav-song-list-row_td:first-child]:[border-bottom-left-radius:10px]
            [&_.fav-song-list-row_td:last-child]:[border-top-right-radius:10px] [&_.fav-song-list-row_td:last-child]:[border-bottom-right-radius:10px]
            [&_.fav-song-list-row:hover]:rounded-md [&_.fav-song-list-row:hover]:shadow-lg
            [&_.fav-song-list-row:hover_.cover]:block [&_.fav-song-list-row:hover_.cover]:bg-[rgba(107,114,128,0.5)]
        `}
        >
          <Column<FavFolderListItem>
            title="标题"
            dataIndex="title"
            key="title"
            render={(value, record, index) => {
              return (
                <div
                  className="flex"
                  ref={index === (favFolderDetailList?.data.medias.length ?? 0) - 1 ? sentinel : null}
                >
                  <div className="flex items-center mr-2 w-12 h-12 relative overflow-hidden">
                    <img className="h-full w-full rounded object-cover" src={record.cover} alt="" />
                    <div className="cover absolute t-0 l-0 h-full w-full rounded hidden">
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
                              favFolderDetailList?.data.medias.map((v) => {
                                return {
                                  bvid: v.bvid,
                                  url: media.data.dash.audio[0].baseUrl,
                                  duration: info.data.pages[0].duration,
                                  title: removeHTMLTags(v.title),
                                  cover: v.cover,
                                }
                              }) as PlayListItem[],
                            )
                            console.log(musicPlayerState)
                          } catch (error) {
                            console.error(error)
                          }
                        }}
                        className="text-white cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span>{value}</span>
                  </div>
                </div>
              )
            }}
          />
          <Column
            title="时长"
            dataIndex="duration"
            key="duration"
            width="56px"
            render={(value) => {
              return formatDuration(value)
            }}
          />
        </Table>
      </ConfigProvider>
      {!hasMore && <div className="text-center text-gray-400 text-sm py-2 my-2 select-none">没有更多了哦~</div>}
    </div>
  )
}

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "歌曲",
    children: <FolderSongList />,
  },
]

const UserFavFolder = ({ className }: MergeWithDefaultProps) => {
  const { id } = useParams()
  const [favFolderDetailList, getFavFolderDetailList] = useAtom(handleFavFolderDetailListAtom)
  const [topRef, scrollToTop] = useScrollToTop<HTMLDivElement>()

  const [musicPlayerState] = useAtom(musicPlayerStateAtom)
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, replacePlayMusicList] = useAtom(replacePlayMusicListAtom)

  useEffect(() => {
    const fetch = async () => {
      await getFavFolderDetailList(Number(id))
    }
    fetch()
    scrollToTop()
  }, [getFavFolderDetailList, id, scrollToTop])

  return (
    <div className={`${className ?? ""} scrollbar h-full padding-footer`} ref={topRef}>
      <header className="flex mb-2">
        <div className="cover w-44 h-44 mr-8 rounded-xl overflow-hidden">
          <img className="h-full object-cover" src={favFolderDetailList?.data.info.cover} alt="" />
        </div>
        <div className="cover-info flex flex-col justify-between">
          <section>
            <h1 className="text-xl font-bold">{favFolderDetailList?.data.info.title}</h1>
            {/* <div className="up-info">
            <img src="" alt="" />
          </div> */}
            <p className="text-sm">{favFolderDetailList?.data.info.intro}</p>
          </section>
          <section>
            <Button
              icon={<FaRegCirclePlay />}
              type="primary"
              className={`
              bg-[rgb(var(--color-primary))] flex items-center
              [&.ant-btn.ant-btn-primary:hover]:bg-[rgb(var(--color-primary))] [&.ant-btn.ant-btn-primary:hover]:[filter:brightness(0.95)]
              [&_svg]:h-full
              `}
              onClick={async () => {
                try {
                  if (!favFolderDetailList?.data.medias[0].bvid) {
                    return
                  }
                  const info = await getBiliVideoInfo({ bvid: favFolderDetailList?.data.medias[0].bvid })
                  const media = await getBiliVideoURL({
                    bvid: favFolderDetailList?.data.medias[0].bvid,
                    cid: info.data?.cid,
                    fnval: 16,
                  })
                  changeMusicFromBliVideo(info.data, media.data)
                  handlePlayMusic()
                  replacePlayMusicList(
                    favFolderDetailList?.data.medias.map((v) => {
                      return {
                        bvid: v.bvid,
                        url: media.data.dash.audio[0].baseUrl,
                        duration: info.data.pages[0].duration,
                        title: removeHTMLTags(v.title),
                        cover: v.cover,
                      }
                    }) as PlayListItem[],
                  )
                  console.log(musicPlayerState)
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              播放全部
            </Button>
          </section>
        </div>
      </header>
      <main className="mr-4">
        <Tabs items={tabItems} className="[&_.ant-tabs-nav]:mb-0" />
      </main>
    </div>
  )
}

export default UserFavFolder
