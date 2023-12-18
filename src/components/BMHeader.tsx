import { FC } from 'react'
import { FCProps } from '@/types/FCProps'
import WindowControl from '@/components/common/WindowControl'
import BMSearch from '@/components/common/BMSearch'

const BMHeader: FC<FCProps> = ({ className }) => {
	return (
		<div
			className={`${className} flex m-[--safe-area-height] justify-between items-center select-none`}>
			<BMSearch />
			<WindowControl />
		</div>
	)
}

export default BMHeader
