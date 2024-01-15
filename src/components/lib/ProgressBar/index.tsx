import { useEffect, useRef } from "react"
import ModuleClasss from "./ProgressBar.module.css"

export interface ProgressBarProps {
  className?: string
  /**
   * Current progress. Range in [0-1], eg. 0.23
   */
  progress?: number
  // defaultProgress?: number
  /**
   * Handle progress change.
   */
  onChange?: (progress: number) => void
  /**
   * Handle progress change when mouse up.
   */
  onChangeComplete?: (progress: number) => void
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  // onMouseUp?: React.MouseEventHandler<HTMLDivElement>
}

/**
 * 进度条组件（长条状），由当前进度与完整进度两个长条元素组成
 */
const ProgressBar = ({ className, progress, onMouseDown, onChange, onChangeComplete }: ProgressBarProps) => {
  const isMouseDown = useRef(false)

  const targtRef = useRef<HTMLDivElement>(null)
  /**
   * Current progress bar in front.
   */
  function CurrentBar() {
    return (
      <div className={`${ModuleClasss["progress-bar__current"]}`} style={{ width: (progress ?? 0) * 100 + "%" }}></div>
    )
  }
  /**
   * Full bar placed behind.
   */
  function FullBar() {
    return <div className={`${ModuleClasss["progress-bar__full"]}`}></div>
  }

  const getEventProgress = (e: MouseEvent | React.MouseEvent): number => {
    const fullWidth = targtRef.current?.clientWidth ?? 0
    const currentWidth = e.clientX - (targtRef.current?.offsetLeft ?? 0)
    let progress = 0
    if (currentWidth > fullWidth) {
      progress = 1
    } else if (currentWidth > 0 && currentWidth < fullWidth) {
      progress = currentWidth / fullWidth
    }
    return progress
  }

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (onChange && isMouseDown.current) onChange(getEventProgress(e))
    }
    const handleUp = (e: MouseEvent) => {
      if (onChangeComplete && isMouseDown.current) onChangeComplete(getEventProgress(e))
      isMouseDown.current = false
    }
    document.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseup", handleUp)
    return () => {
      document.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseup", handleUp)
    }
  })

  return (
    <div
      ref={targtRef}
      className={`${className} ${ModuleClasss["progress-bar"]}`}
      onMouseDown={(e) => {
        if (onMouseDown) onMouseDown(e)
        if (onChange) onChange(getEventProgress(e))
        isMouseDown.current = true
      }}
    >
      <FullBar />
      <CurrentBar />
    </div>
  )
}

export default ProgressBar
