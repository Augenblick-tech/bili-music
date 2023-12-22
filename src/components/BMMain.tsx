import { Outlet } from "react-router-dom"
import BMHeader from "./BMHeader"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"

const BMMain = ({ className }: MergeWithDefaultProps) => {
  return (
    <div className={className ?? ""}>
      <BMHeader className="h-[--headerHeight]" />
      <div className="bm-panel ml-[--safe-area-height]">
        <Outlet />
      </div>
    </div>
  )
}

export default BMMain
