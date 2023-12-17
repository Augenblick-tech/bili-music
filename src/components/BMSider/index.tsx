import { FC } from 'react'
import { FCProps } from '@/types/FCProps'
import { RiNeteaseCloudMusicFill } from 'react-icons/ri'
import BMMenuList from './BMMenuList'

const BMSider: FC<FCProps> = ({ className }) => {
	return (
		<div className={className}>
			<div className="logo h-[--headerHeight] flex items-center justify-center">
				<RiNeteaseCloudMusicFill className="text-red-500 mr-2 text-4xl" />
				<span className="text-xl">网易云音乐</span>
			</div>
			<div className="bm-panel">
				<BMMenuList />
			</div>
		</div>
	)
}

export default BMSider
