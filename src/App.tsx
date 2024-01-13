import SideBar from "@/components/SideBar"
import BMMain from "@/components/BMMain"
import BottomControlBar from "@/components/BottomControlBar"
import GlobalMusicAudio from "./components/GlobalMusicAudio"
import { useSetAtom } from "jotai"
import { themeAtom } from "./stores/AppTheme"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { locationAtom } from "./stores/location"
import { userAtom } from "./stores/AuthInfo"
import { getUserId } from "./utils/authUtils"

function App() {
  const setTheme = useSetAtom(themeAtom)
  const location = useLocation()
  const setLoc = useSetAtom(locationAtom)
  const setUser = useSetAtom(userAtom)

  useEffect(() => {
    const theme = "default"
    setTheme(theme)
  }, [setTheme])

  useEffect(() => {
    setLoc({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      searchParams: new URLSearchParams(location.search),
    })
  }, [location, setLoc])

  useEffect(() => {
    window.electronAPI &&
      window.biliAuth.onLoginSuccess(async () => {
        const userId = await getUserId()
        setUser(userId)
      })
    getUserId().then((userId) => setUser(userId))
  }, [setUser])

  return (
    <div className="app relative h-screen rounded-lg bg-[rgb(var(--bg-color))] border overflow-hidden">
      <header className="h-[--safe-area-height] absolute top-0 w-screen electron-drag flex justify-end items-center"></header>
      <main className="flex h-screen w-screen overflow-hidden padding-footer">
        <SideBar className="w-56 bg-[rgb(var(--sidebar-bg-color))]" />
        <BMMain className="flex-1 min-w-0 bg-[rgb(var(--bg-color))]" />
        <GlobalMusicAudio className="w-0 h-0 absolute bottom-0 right-0" />
      </main>
      <footer className="h-[--footer-height]">
        <BottomControlBar className="fixed bottom-0 h-[--footer-height] backdrop-blur-3xl bg-opacity-60 border-t bg-white w-screen" />
      </footer>
    </div>
  )
}

export default App
