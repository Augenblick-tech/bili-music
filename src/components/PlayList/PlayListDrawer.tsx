import { musicPlayListAtom } from "@/stores/MusicTrack/MusicPlayList"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { Drawer } from "antd"
import { useAtom } from "jotai"

type Props = {
  open: boolean
  onClose: () => void
}

const PlayListDrawer = ({ className, open, onClose }: MergeWithDefaultProps<Props>) => {
  const [musicPlayList] = useAtom(musicPlayListAtom)
  return (
    <div className={`${className}`}>
      <Drawer title="播放列表" placement="right" onClose={onClose} open={open}>
        {musicPlayList.map((item, index) => (
          <p>{item.title}</p>
        ))}
      </Drawer>
    </div>
  )
}

export default PlayListDrawer
