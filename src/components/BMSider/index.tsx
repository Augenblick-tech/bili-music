import { FC } from 'react'
import { FCProps } from '@/types/FCProps'
import { TbBrandBilibili } from "react-icons/tb";
import BMMenuList from './BMMenuList'

const BMSider: FC<FCProps> = ({ className }) => {
	return (
		<div className={`${className} select-none`}>
			<div className="logo h-[--headerHeight] mt-[--safe-area-height] flex items-center justify-center">
				<TbBrandBilibili className="text-pink-500 mr-2 text-4xl" />
				<span className="text-xl">哔哩音乐</span>
			</div>
			<div className="bm-panel">
				<BMMenuList />
			</div>
		</div>
	)
}

export default BMSider
