import { FC, useState } from 'react'
import { FCProps } from '@/types/FCProps'
import { useAtom } from 'jotai'
import { getBiliVideoSearch } from '@/api/BiliVideo'
import { BiliSearchAtom } from '@/stores/BiliVideo'

const BMSearch: FC<FCProps> = ({ className }) => {
	const [searchField, setSearchField] = useState('')
	const [, setSearchResult] = useAtom(BiliSearchAtom)

	const handleSearch = async () => {
		const result = await getBiliVideoSearch(searchField)
		console.log(result)
		setSearchResult(result.data)
		console.log('first search result: ', result.data.result[0])
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
					window.biliAuth.openLoginWindow()
				}}>
				登录
			</button>
			<button
				onClick={() => {
					window.biliAuth.handleLogout()
				}}>
				注销
			</button>
		</div>
	)
}

export default BMSearch
