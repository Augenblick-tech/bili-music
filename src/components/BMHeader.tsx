import WindowControl from "@/components/common/WindowControl"
import SearchBar from "@/components/common/SearchBar"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { proxyUrl } from "@/api/axios"
import { getTopDomain } from "@/utils/htmlUtil"
import { useSetAtom } from "jotai"
import { userAtom } from "@/stores/AuthInfo"

const BMHeader = ({ className }: MergeWithDefaultProps) => {
  const setUser = useSetAtom(userAtom)

  const setCookie = () => {
    // document.cookie = ""
    const cookie = prompt("请输入 cookie")
    if (!cookie) {
      return
    }

    const cookieMap = cookie.split(";").reduce(
      (prev, curr) => {
        const [key, value] = curr.trim().split("=")
        prev[key] = value
        return prev
      },
      {} as Record<string, string>,
    )

    console.log(cookieMap)

    for (const [key, value] of Object.entries(cookieMap)) {
      console.log(getTopDomain(proxyUrl))
      const date = new Date()
      date.setFullYear(date.getFullYear() + 1)
      document.cookie = `${key}=${value}; domain=${"." + getTopDomain(proxyUrl)}; path=/; expires=${date.toUTCString()}`
    }
  }

  return (
    <div className={`${className ?? ""} flex m-[--safe-area-height] justify-between items-center select-none`}>
      <SearchBar />
      <div className="left-side flex">
        <div className="user-info space-x-2">
          {!window.electronAPI && <button onClick={setCookie}>设置 cookie</button>}
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
              setUser()
            }}
          >
            注销
          </button>
        </div>
        {window.electronAPI && (
          <>
            <div className="divide mx-2 text-gray-300">|</div>
            <WindowControl />
          </>
        )}
      </div>
    </div>
  )
}

export default BMHeader
