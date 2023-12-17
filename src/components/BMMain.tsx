import { FC } from 'react'
import { FCProps } from '@/types/FCProps'
import BMHeader from './BMHeader'
import { Outlet } from 'react-router-dom'

const BMMain: FC<FCProps> = ({ className }) => {
	return (
		<div className={className}>
			<BMHeader className="h-[--headerHeight]" />
			<div className="bm-panel">
				<Outlet />
			</div>
		</div>
	)
}

export default BMMain
