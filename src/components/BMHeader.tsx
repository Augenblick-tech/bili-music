import { FC } from 'react'
import { FCProps } from '@/types/FCProps'

const BMHeader: FC<FCProps> = ({ className }) => {
	return (
		<div className={className}>
			<h1>BMHeader</h1>
		</div>
	)
}

export default BMHeader
