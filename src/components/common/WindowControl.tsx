import { FC } from 'react'
import { FCProps } from '@/types/FCProps'
import { ipcRenderer } from 'electron'
import {
	MdCropSquare,
	MdOutlineHorizontalRule,
	MdOutlineClose,
} from 'react-icons/md'

const WindowControl: FC<FCProps> = ({ className }) => {
	const handleMinimize = () => {
		ipcRenderer.send('minimize')
	}

	const handleMaximize = () => {
		ipcRenderer.send('maximize')
	}

	const handleClose = () => {
		ipcRenderer.send('close')
	}

	return (
		<div className={`${className} controls flex space-x-2 items-center`}>
			<MdOutlineHorizontalRule
				onClick={handleMinimize}
				className="text-gray-500 w-5 h-5 cursor-pointer"
			/>
			<MdCropSquare
				onClick={handleMaximize}
				className="text-gray-500 w-5 h-5 cursor-pointer"
			/>
			<MdOutlineClose
				onClick={handleClose}
				className="text-gray-500 w-5 h-5 cursor-pointer"
			/>
		</div>
	)
}

export default WindowControl
