import { TbBrandBilibili } from "react-icons/tb"
import MenuList from "./MenuList"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"

const SideBar = ({ className }: MergeWithDefaultProps) => {
  return (
    <div className={`${className ?? ""} select-none`}>
      <div className="logo h-[--header-height] m-[--safe-area-height] flex items-center justify-center">
        <TbBrandBilibili className="text-pink-500 mr-2 text-4xl" />
        <span className="text-xl">哔哩音乐</span>
      </div>
      <div className="scrollbar main-height">
        <MenuList />
      </div>
    </div>
  )
}

export default SideBar
