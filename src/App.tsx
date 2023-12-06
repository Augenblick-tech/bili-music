import BMSider from '@/components/BMSider'
import BMMain from '@/components/BMMain'
import BMFooter from '@/components/BMFooter'

function App() {
	return (
		<div className="app relative m-2 rounded-lg bg-[--bgColor] overflow-hidden">
			<main className="flex h-[calc(100vh-(0.5rem)*2)] w-[calc(100vw-(0.5rem)*2)]">
				<BMSider className="w-72 bg-slate-500" />
				<BMMain className="flex-1 min-w-0" />
			</main>
			<footer>
				<BMFooter className="absolute bottom-0 h-[--footerHeight] bg-opacity-80 bg-red-500 w-screen" />
			</footer>
		</div>
	)
}

export default App
