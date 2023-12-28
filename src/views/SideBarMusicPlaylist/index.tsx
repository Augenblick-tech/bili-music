import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { useParams } from "react-router-dom"

const SideBarMusicPlaylist = ({ className }: MergeWithDefaultProps) => {
  const { id } = useParams()
  return <div className={className ?? ""}>{id}</div>
}

export default SideBarMusicPlaylist
