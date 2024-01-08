import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { AiOutlineLoading } from "react-icons/ai"

const InfiniteSpin = ({ className }: MergeWithDefaultProps) => {
  return (
    <div className={`${className ?? ""} flex h-full justify-center items-center`}>
      <AiOutlineLoading className="animate-spin w-10 h-10 text-gray-800" />
    </div>
  )
}

export default InfiniteSpin
