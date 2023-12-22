import { FC, useEffect, useRef, useState } from "react"
import { FCProps } from "@/types/FCProps"
import { BiliVideoAtom } from "@/stores/BiliVideo"
import { useAtom } from "jotai"
import { getBiliVideoURL } from "@/api/BiliVideo"
import IconButton from "@mui/material/IconButton"
import { MdPause, MdPlayArrow } from "react-icons/md"
import { styled } from "@mui/material/styles"
import Slider from "@mui/material/Slider"

const BMBottomControlBar: FC<FCProps> = ({ className }) => {
  const [videoAtom, setVideoAtom] = useAtom(BiliVideoAtom)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoStat, setVideoStat] = useState<"playing" | "paused">("paused")
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    getBiliVideoURL({
      bvid: "BV1y7411Q7Eq",
      cid: 171776208,
      fnval: 16,
    }).then((res) => {
      // console.log(res)
      console.log(res.data?.dash?.audio[0].baseUrl)
      setVideoAtom(res.data)
    })
  }, [setVideoAtom])

  setInterval(() => {
    setCurrentTime(videoRef.current?.currentTime ?? 0)
    setProgressValue(videoRef.current?.currentTime ?? 0 / (videoRef.current?.duration ?? 1))
  }, 1000)

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  function PlayOrPauseButton() {
    return videoStat == "playing" ? (
      <IconButton aria-label="pause">
        <MdPause />
      </IconButton>
    ) : (
      <IconButton aria-label="play">
        <MdPlayArrow />
      </IconButton>
    )
  }
  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#FC344F",
    height: 3,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
      height: 16,
      width: 16,
      backgroundColor: "#fff",
      border: "1px solid currentColor",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
      },
      "& .airbnb-bar": {
        height: 9,
        width: 1,
        backgroundColor: "currentColor",
        marginLeft: 1,
        marginRight: 1,
      },
    },
    "& .MuiSlider-track": {
      height: 3,
    },
    "& .MuiSlider-rail": {
      color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
      opacity: theme.palette.mode === "dark" ? undefined : 1,
      height: 3,
    },
  }))

  return (
    <div className={`${className}`}>
      <main className="flex justify-between relative">
        <div className="song-info flex-1">
          <audio
            className="w-0 h-0 absolute bottom-0 right-0"
            src={(() => {
              const url = videoAtom?.dash?.audio[0].baseUrl
              return url
            })()}
            controls
            ref={videoRef}
          />
          {/* <div className="name">{videoAtom?.dash?.audio[0].baseUrl}</div> */}
          <div className="name">BV1y7411Q7Eq</div>
        </div>
        <div className="control flex-1">
          <button
            onClick={() => {
              if (videoStat === "paused") {
                videoRef.current?.play()
                setVideoStat("playing")
              } else {
                videoRef.current?.pause()
                setVideoStat("paused")
              }
            }}
          >
            <PlayOrPauseButton />
          </button>
          {formatDuration(Math.ceil(videoRef.current?.currentTime ?? 0))}
          <AirbnbSlider aria-label="Temperature" defaultValue={30} value={progressValue} onMouseUp={(e) => {}} />
        </div>
        <div className="function flex-1">
          <button>function</button>
        </div>
      </main>
    </div>
  )
}

export default BMBottomControlBar
