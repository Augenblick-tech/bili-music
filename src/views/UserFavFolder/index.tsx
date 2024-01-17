import { handleFavFolderDetailListAtom, nextFavFolderDetailListAtom } from "@/stores/UserFavFolder/UserFavFolderInfo"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { Button } from "antd"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { FaRegCirclePlay } from "react-icons/fa6"
import { BiLinkExternal } from "react-icons/bi"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import Column from "antd/es/table/Column"
import { FavFolderDetailList, FavFolderListItem } from "@/types/bili/BiliUserFavFolder"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { useScrollToTop } from "@/hooks/useScrollToTop"
import { formatDuration } from "@/utils/videoUtils"
import { replacePlayMusicListAtom } from "@/stores/PlayingMusic/MusicPlayList"
import { getBiliVideoInfo, getBiliVideoURL } from "@/api/BiliVideo"
import { removeHTMLTags } from "@/utils/htmlUtil"
import {
  musicPlayerStateAtom,
  changeMusicFromBliVideoAtom,
  handlePlayMusicAtom,
} from "@/stores/PlayingMusic/PlayingMusic"
import type { PlayListItem } from "@/types/MusicPlayList"
import InfiniteSpin from "@/components/common/InfiniteSpin"
import useLoading from "@/hooks/useLoading"
import MusicListTable from "@/components/common/MusicListTable"
import MusicImage from "@/components/common/MusicImage"
import useContextMenu from "@/hooks/useContextMenu"
import ContextMenu from "@/components/common/ContextMenu"
import type { ContextMenuItem } from "@/types/ContextMenu"

const FolderSongList = ({ items }: { items?: FavFolderDetailList }) => {
  const { id } = useParams()
  const [, nextFavFolderDetailList] = useAtom(nextFavFolderDetailListAtom)
  const [sentinel, hasMore, setHasMore] = useInfiniteScroll<HTMLDivElement>(async () => {
    await nextFavFolderDetailList()
  })
  const menuRef = useRef(null)
  const { visible, show } = useContextMenu(menuRef)

  const [playingMusicState] = useAtom(musicPlayerStateAtom)
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, replacePlayMusicList] = useAtom(replacePlayMusicListAtom)

  useEffect(() => {
    setHasMore(true)
  }, [id, setHasMore])

  const clickToPlayMusic = async (bvid: string) => {
    try {
      const info = await getBiliVideoInfo({ bvid })
      const media = await getBiliVideoURL({
        bvid,
        cid: info.data?.cid,
        fnval: 16,
      })
      changeMusicFromBliVideo(info.data, media.data)
      handlePlayMusic()
      replacePlayMusicList(
        items?.medias.map((v) => {
          return {
            bvid: v.bvid,
            url: media.data.dash.audio[0].baseUrl,
            duration: info.data.pages[0].duration,
            title: removeHTMLTags(v.title),
            cover: v.cover,
          }
        }) as PlayListItem[],
      )
      console.log(playingMusicState)
    } catch (error) {
      console.error(error)
    }
  }

  const getContextMenuItems = (record: FavFolderListItem): ContextMenuItem[] => {
    return [
      {
        key: "1",
        icon: <FaRegCirclePlay />,
        label: "播放",
        onClick: () => clickToPlayMusic(record.bvid),
      },
      {
        key: "2",
        icon: <BiLinkExternal />,
        label: "观看视频",
        onClick: () => window.open(`https://www.bilibili.com/video/${record.bvid}`),
      },
    ]
  }

  return (
    <div>
      <ContextMenu ref={menuRef} visible={visible} />
      <MusicListTable<FavFolderListItem>
        dataSource={items?.medias}
        rowKey={(record) => {
          return record.bvid
        }}
        size="small"
        tableLayout="fixed"
        className="ml-2.5"
        onRow={(record) => {
          return {
            onContextMenu: (e) => show(e, getContextMenuItems(record)),
          }
        }}
      >
        <Column<FavFolderListItem>
          title="标题"
          dataIndex="title"
          key="title"
          render={(value, record, index) => {
            return (
              <div className="flex" ref={index === (items?.medias.length ?? 0) - 1 ? sentinel : null}>
                <div className="flex items-center mr-2 w-12 h-12 relative overflow-hidden flex-shrink-0">
                  <MusicImage className="h-full w-full rounded object-cover" src={record.cover} alt="" />
                  <div className="cover absolute t-0 l-0 h-full w-full rounded hidden">
                    <FaRegCirclePlay
                      onClick={() => {
                        clickToPlayMusic(record.bvid)
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
          align="center"
          width="98px"
          render={(value) => {
            return formatDuration(value)
          }}
        />
      </MusicListTable>
      {!hasMore && <div className="text-center text-gray-400 text-sm py-2 my-2 select-none">没有更多了哦~</div>}
    </div>
  )
}

const UserFavFolder = ({ className }: MergeWithDefaultProps) => {
  const { id } = useParams()
  const [favFolderDetailList, getFavFolderDetailList] = useAtom(handleFavFolderDetailListAtom)
  const [topRef, scrollToTop] = useScrollToTop<HTMLDivElement>()
  const [loading] = useLoading(() => favFolderDetailList?.data === undefined, [favFolderDetailList?.data])

  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, replacePlayMusicList] = useAtom(replacePlayMusicListAtom)

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "歌曲",
      children: <FolderSongList items={favFolderDetailList?.data} />,
    },
  ]

  useEffect(() => {
    const fetch = async () => {
      await getFavFolderDetailList(Number(id))
    }
    fetch()
    scrollToTop()
  }, [getFavFolderDetailList, id, scrollToTop])

  if (loading) {
    return <InfiniteSpin />
  }

  return (
    <div className={`${className ?? ""} scrollbar h-full`} ref={topRef}>
      <header className="flex mb-2">
        <div className="cover w-44 h-44 mr-8 rounded-xl overflow-hidden flex-shrink-0">
          <MusicImage className="h-full object-cover" src={favFolderDetailList?.data.info.cover || ""} alt="" />
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
