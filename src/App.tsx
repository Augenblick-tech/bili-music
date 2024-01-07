import SideBar from "@/components/SideBar"
import BMMain from "@/components/BMMain"
import BottomControlBar from "@/components/BottomControlBar"
import GlobalMusicAudio from "./components/GlobalMusicAudio"
import { useAtom } from "jotai"
import { themeAtom } from "./stores/AppTheme"
import { useEffect } from "react"

function App() {
  const [, setTheme] = useAtom(themeAtom)

  useEffect(() => {
    const theme = "default"
    setTheme(theme)
  }, [setTheme])

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
