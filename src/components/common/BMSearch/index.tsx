import { FC, useState } from 'react'
import { FCProps } from '@/types/FCProps'
import { BiliVideoAtom } from '@/stores/BiliVideo'
import { useAtom } from 'jotai'
import { getBiliVideoSearch, getBiliVideoInfo } from '@/api/BiliVideo'
import { ipcRenderer } from 'electron'
import { BiliSearchAtom } from '@/stores/BiliVideo'

const BMSearch: FC<FCProps> = ({ className }) => {
	const [videoAtom, setVideoAtom] = useAtom(BiliVideoAtom)
	const [searchField, setSearchField] = useState('')
	const [_, setSearchResult] = useAtom(BiliSearchAtom)

	const handleSearch = async () => {
		const result = await getBiliVideoSearch(searchField)
		console.log(result)
		setSearchResult(result.data)
		console.log(result.data.result[0].bvid)
		const videoData = await getBiliVideoInfo({
			bvid: result.data.result[0].bvid,
		})
		console.log(videoData)
	}

	return (
		<div className={`${className} flex`}>
			<div className="input-wrapper h-9 w-48 border border-gray-300 rounded-xl flex justify-center items-center overflow-hidden p-2">
				<input
					type="text"
					className="text-gray-500 h-full w-full bg-transparent outline-none"
					value={searchField}
					onChange={(e) => {
						setSearchField(e.target.value)
					}}
				/>
			</div>
			<button onClick={handleSearch}>搜索</button>
			<button
				onClick={() => {
					ipcRenderer.send('login')
				}}>
				登录
			</button>
			<button
				onClick={() => {
					ipcRenderer.send('logout')
				}}>
				注销
			</button>
		</div>
	)
}

export default BMSearch
