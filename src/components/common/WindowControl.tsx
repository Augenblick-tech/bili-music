import { MdCropSquare, MdOutlineHorizontalRule, MdOutlineClose } from "react-icons/md"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"

const WindowControl = ({ className }: MergeWithDefaultProps) => {
  const handleMinimize = () => {
    window.windowControl.minimize()
  }

  const handleMaximize = () => {
    window.windowControl.maximize()
  }

  const handleClose = () => {
    window.windowControl.close()
  }

  return (
    <div className={`${className ?? ""} controls flex space-x-2 items-center`}>
      <MdOutlineHorizontalRule onClick={handleMinimize} className="text-gray-500 w-5 h-5 cursor-pointer" />
      <MdCropSquare onClick={handleMaximize} className="text-gray-500 w-5 h-5 cursor-pointer" />
      <MdOutlineClose onClick={handleClose} className="text-gray-500 w-5 h-5 cursor-pointer" />
    </div>
  )
}

export default WindowControl
