import { TbBrandBilibili } from "react-icons/tb"
import BMMenuList from "./BMMenuList"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"

const BMSider = ({ className }: MergeWithDefaultProps) => {
  return (
    <div className={`${className ?? ""} select-none`}>
      <div className="logo h-[--header-height] mt-[--safe-area-height] flex items-center justify-center">
        <TbBrandBilibili className="text-pink-500 mr-2 text-4xl" />
        <span className="text-xl">哔哩音乐</span>
      </div>
      <div className="scrollbar main-height padding-footer">
        <BMMenuList />
      </div>
    </div>
  )
}

export default BMSider
