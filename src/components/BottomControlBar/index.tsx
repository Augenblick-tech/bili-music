import IconButton from "@mui/material/IconButton"
import { MdPause, MdPlayArrow } from "react-icons/md"
import { styled } from "@mui/material/styles"
import Slider from "@mui/material/Slider"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { atom, useAtom } from "jotai"
import {
  handlePlayMusicAtom,
  handlePauseMusicAtom,
  musicPlayerStateAtom,
  handleJumpMusicProgressAtom,
} from "@/stores/MusicTrack/MusicTrack"
import { PlayStatus } from "@/types/MusicPlayer"
import { useEffect } from "react"
import { Avatar } from "@mui/material"

const progressAtom = atom(0)

const BottomControlBar = ({ className }: MergeWithDefaultProps) => {
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, handlePauseMusic] = useAtom(handlePauseMusicAtom)

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  function PlayOrPauseButton() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return (
      <button
        onClick={() => {
          if (musicPlayerState?.playStatus == PlayStatus.playing) {
            handlePauseMusic()
          } else {
            handlePlayMusic()
          }
        }}
      >
        {musicPlayerState?.playStatus == PlayStatus.playing ? (
          <IconButton aria-label="pause">
            <MdPause />
          </IconButton>
        ) : (
          <IconButton aria-label="play">
            <MdPlayArrow />
          </IconButton>
        )}
      </button>
    )
  }

  function CoverImage() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return musicPlayerState?.cover ? <Avatar variant="rounded" src={musicPlayerState?.cover}></Avatar> : <div></div>
  }

  function TitleLabel() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return <div className="name">{musicPlayerState?.title}</div>
  }

  function CurrentTimeLabel() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    if (
      !musicPlayerState?.duration ||
      isNaN(musicPlayerState?.duration) ||
      !musicPlayerState?.progress ||
      isNaN(musicPlayerState?.progress)
    ) {
      return formatDuration(0)
    }
    return formatDuration(Math.ceil((musicPlayerState?.duration ?? 0) * (musicPlayerState?.progress ?? 0)))
  }

  function EndingTimeLabel() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return formatDuration(Math.ceil(musicPlayerState?.duration ?? 0))
  }

  function ProgressSlider() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    const [progress, setProgress] = useAtom(progressAtom)
    const [, handleJumpMusicProgress] = useAtom(handleJumpMusicProgressAtom)
    // 是否按下了鼠标（未松开）
    let isMouseDown = false

    useEffect(() => {
      if (!isMouseDown) setProgress((musicPlayerState?.progress ?? 0) * 100)
    }, [musicPlayerState])

    return (
      <AirbnbSlider
        aria-label="Temperature"
        defaultValue={0}
        value={progress}
        onChange={(_: Event, newValue: number | number[]) => {
          setProgress(newValue as number)
        }}
        onMouseDown={(_) => {
          isMouseDown = true
        }}
        onMouseUp={(_) => {
          isMouseDown = false
          handleJumpMusicProgress(progress / 100)
        }}
      />
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
          <CoverImage />
          <TitleLabel />
        </div>
        <div className="control flex-1">
          <CurrentTimeLabel />
          <PlayOrPauseButton />
          <EndingTimeLabel />
          <ProgressSlider />
        </div>
        <div className="function flex-1">
          <button>function</button>
        </div>
      </main>
    </div>
  )
}

export default BottomControlBar
