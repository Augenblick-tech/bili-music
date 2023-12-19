import BMSider from "@/components/BMSider"
import BMMain from "@/components/BMMain"
import BMFooter from "@/components/BMFooter"

function App() {
  return (
    <div className="app relative rounded-lg bg-[--bgColor] border overflow-hidden">
      <header className="h-[--safe-area-height] absolute top-0 w-screen electron-drag flex justify-end items-center"></header>
      <main className="flex h-[calc(100vh-(1px)*2)] w-[calc(100vw-(1px)*2)]">
        <BMSider className="w-56 bg-[rgb(240,243,246)]" />
        <BMMain className="flex-1 min-w-0 bg-[--bgColor]" />
      </main>
      <footer>
        <BMFooter className="absolute bottom-0 h-[--footerHeight] backdrop-blur-3xl bg-opacity-60 border-t bg-white w-screen" />
      </footer>
    </div>
  )
}

export default App
