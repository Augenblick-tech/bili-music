import { getBiliVideoInfo, getBiliVideoURL } from "@/api/BiliVideo"
import { musicPlayListAtom } from "@/stores/PlayingMusic/MusicPlayList"
import { changeMusicFromBliVideoAtom, handlePlayMusicAtom } from "@/stores/PlayingMusic/PlayingMusic"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { ConfigProvider, Drawer } from "antd"
import { useAtom } from "jotai"
import MusicImage from "@/components/common/MusicImage"

type Props = {
  open: boolean
  onClose: () => void
}

const PlayListDrawer = ({ className, open, onClose }: MergeWithDefaultProps<Props>) => {
  const [musicPlayList] = useAtom(musicPlayListAtom)
  const [, changeMusicFromBliVideo] = useAtom(changeMusicFromBliVideoAtom)
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)

  return (
    <div className={`${className}`}>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: "rgb(248 250 252)",
            padding: 0,
            paddingLG: 0,
          },
        }}
      >
        <Drawer className="bg-slate-50" title="播放列表" placement="right" onClose={onClose} open={open}>
          {musicPlayList.map((item) => (
            <div
              className="flex round-2 p-2 rounded-xl cursor-pointer hover:bg-white"
              key={item.title + item.biliInfo?.bvid}
              onClick={async () => {
                const info = await getBiliVideoInfo({ bvid: item.bvid })
                const media = await getBiliVideoURL({
                  bvid: item.bvid,
                  cid: info.data?.cid,
                  fnval: 16,
                })
                changeMusicFromBliVideo(info.data, media.data)
                handlePlayMusic()
              }}
            >
              <MusicImage className="w-[3rem] h-[3rem] object-cover rounded-lg" src={item.cover} />
              <div className="p-2">
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </Drawer>
      </ConfigProvider>
    </div>
  )
}

export default PlayListDrawer
