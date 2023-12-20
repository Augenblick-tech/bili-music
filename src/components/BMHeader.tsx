import { FC } from "react"
import { FCProps } from "@/types/FCProps"
import WindowControl from "@/components/common/WindowControl"
import BMSearch from "@/components/common/BMSearch"

const BMHeader: FC<FCProps> = ({ className }) => {
  return (
    <div className={`${className} flex m-[--safe-area-height] justify-between items-center select-none`}>
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
