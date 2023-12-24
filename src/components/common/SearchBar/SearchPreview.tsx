import { forwardRef } from "react"
import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { BiliSearchResult } from "@/types/bili/BiliSearch"

type BMSearchPreviewProps = MergeWithDefaultProps<{
  data?: BiliSearchResult[] | null
  onClick?: (keyword: string) => void
}>

const BMSearchPreview = forwardRef<HTMLDivElement, BMSearchPreviewProps>(({ className, data, onClick }, ref) => {
  return (
    <div className={`${className} z-10`} ref={ref}>
      {data?.map((item, index) => {
        if (index > 9) return null
        return (
          <div
            key={item.id}
            onClick={() => onClick?.(item.title.replace('<em class="keyword">', "").replace("</em>", ""))}
            className="p-2 [&_.keyword]:text-red-500 [&_.keyword]:[font-style:normal] cursor-pointer [&:hover]:bg-slate-50 rounded-md"
          >
            <div
              className="text-ellipsis whitespace-nowrap overflow-hidden"
              dangerouslySetInnerHTML={{ __html: item.title }}
            ></div>
          </div>
        )
      })}
    </div>
  )
})

export default BMSearchPreview
