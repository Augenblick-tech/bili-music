import BMSider from '@/components/BMSider'
import BMMain from '@/components/BMMain'
import BMFooter from '@/components/BMFooter'

function App() {
	return (
		<div className="app relative m-2 rounded-lg bg-[--bgColor] border overflow-hidden">
			<main className="flex h-[calc(100vh-(0.5rem+1px)*2)] w-[calc(100vw-(0.5rem+1px)*2)]">
				<BMSider className="w-56 bg-[rgb(240,243,246)]" />
				<BMMain className="flex-1 min-w-0 bg-[--bgColor]" />
			</main>
			<footer>
				<BMFooter className="absolute bottom-0 h-[--footerHeight] backdrop-blur-3xl bg-opacity-80 border-t bg-white w-screen" />
			</footer>
		</div>
	)
}

export default App
