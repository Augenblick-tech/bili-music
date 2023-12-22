import { FC, useRef, useState } from "react"
import { FCProps } from "@/types/FCProps"
import { readonlyBiliVideoAtom } from "@/stores/BiliVideo"
import { useAtom } from "jotai"

const GlobalMusicPlayer: FC<FCProps> = ({ className }) => {
  return (
    <div className={`${className}`}>
    </div>
  )
}

export default GlobalMusicPlayer
