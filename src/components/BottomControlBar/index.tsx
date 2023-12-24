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
import { FaPlay } from "react-icons/fa6"
import { FaPause } from "react-icons/fa6"
import { ConfigProvider, Slider } from "antd"

const progressAtom = atom(0)

const BottomControlBar = ({ className }: MergeWithDefaultProps) => {
  const [, handlePlayMusic] = useAtom(handlePlayMusicAtom)
  const [, handlePauseMusic] = useAtom(handlePauseMusicAtom)

  function formatDuration(value: number) {
    let minute = Math.floor(value / 60)
    let secondLeft = value - minute * 60
    return `${minute < 10 ? `0${minute}` : minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  function PlayOrPauseButton() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return (
      <button
        className="inline-flex items-center justify-center bg-gray-400/20 hover:bg-gray-400/30 active:scale-90 w-9 h-9 rounded-full"
        aria-label={musicPlayerState?.playStatus == PlayStatus.playing ? "pause" : "play"}
        onClick={() => {
          if (musicPlayerState?.playStatus == PlayStatus.playing) {
            handlePauseMusic()
          } else {
            handlePlayMusic()
          }
        }}
      >
        {musicPlayerState?.playStatus == PlayStatus.playing ? <FaPause /> : <FaPlay />}
      </button>
    )
  }

  function CoverImage() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return musicPlayerState?.cover ? (
      <img aria-label="cover" className="rounded-md w-12 h-12 object-cover" src={musicPlayerState?.cover}></img>
    ) : (
      <div></div>
    )
  }

  function TitleLabel() {
    const [musicPlayerState] = useAtom(musicPlayerStateAtom)
    return <div className="text-sm ml-2 line-clamp-2">{musicPlayerState?.title}</div>
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

    useEffect(() => {
      setProgress((musicPlayerState?.progress ?? 0) * 100)
    }, [musicPlayerState])

    return (
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              handleLineWidthHover: 2,
              railBg: "rgba(150, 150, 150, 0.3)",
            },
          },
          token: {
            colorPrimary: "rgb(255, 19,   103)",
          },
        }}
      >
        <Slider
          className="w-full mx-2"
          aria-label="progess"
          defaultValue={0}
          value={progress}
          onChange={(value: number | number[]) => {
            setProgress(value as number)
          }}
          onChangeComplete={(value) => {
            handleJumpMusicProgress(value / 100)
          }}
        />
      </ConfigProvider>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="h-full flex justify-between items-center relative px-5">
        <div className="simple-meta flex-[30%] flex items-center">
          <CoverImage />
          <TitleLabel />
        </div>
        <div className="control flex-[50%] justify-center pl-5 pr-5 text-slate-700">
          <div className="control-buttons flex justify-center items-center pt-2">
            <PlayOrPauseButton />
          </div>
          <div className="control-timer flex justify-center items-center">
            <CurrentTimeLabel />
            <ProgressSlider />
            <EndingTimeLabel />
          </div>
        </div>
        <div className="function flex-[30%]">
        </div>
      </div>
    </div>
  )
}

export default BottomControlBar
