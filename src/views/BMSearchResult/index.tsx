import { FCProps } from '@/types/FCProps'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getBiliVideoSearch } from '@/api/BiliVideo'
import { BiliSearchData } from '@/types/bili/BiliSearch'

const BMSearchResult: FC<FCProps> = ({ className }) => {
	const [params] = useSearchParams()
	const [searchResult, setSearchResult] = useState<BiliSearchData>()

	useEffect(() => {
		getBiliVideoSearch(params.get('keyword')!).then((res) => {
			console.log(res)
			setSearchResult(res.data)
		})
	}, [params])

	return (
		<div className={className}>
			{searchResult?.result?.map((item) => (
				<div key={item.id}>
					<a
						href={`https://www.bilibili.com/video/${item.bvid}`}
						target="_blank"
						rel="noreferrer">
						{item.title}
					</a>
				</div>
			))}
		</div>
	)
}

export default BMSearchResult
