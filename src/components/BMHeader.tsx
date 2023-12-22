import WindowControl from "@/components/common/WindowControl"
import BMSearch from "@/components/common/BMSearch"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"

const BMHeader = ({ className }: MergeWithDefaultProps) => {
  return (
    <div className={`${className ?? ""} flex m-[--safe-area-height] justify-between items-center select-none`}>
      <BMSearch />
      <div className="left-side flex">
        <div className="user-info space-x-2">
          <button
            onClick={() => {
              window.biliAuth.openLoginWindow()
            }}
          >
            登录
          </button>
          <button
            onClick={() => {
              window.biliAuth.handleLogout()
            }}
          >
            注销
          </button>
        </div>
        <div className="divide mx-2 text-gray-300">|</div>
        <WindowControl />
      </div>
    </div>
  )
}

export default BMHeader
