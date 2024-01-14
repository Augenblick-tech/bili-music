import { handlePlayNextMusicAtom } from "@/stores/PlayingMusic/MusicPlayList"
import {
  globalMusicElementAtom,
  handleUpdateMusicProgressAtom,
  musicPlayerStateAtom,
} from "@/stores/PlayingMusic/PlayingMusic"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { PlayStatus } from "@/types/MusicPlayer"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { addProxyToUrl } from "@/utils/htmlUtil"
import { CurrentPlayingMusicStorage } from "@/storage/CurrentPlayingMusic"

/**
 * 全局音乐播放轨道，作为音乐播放器情景下的核心，在视图上隐藏不可见
 */
const GlobalMusicAudio = ({ className }: MergeWithDefaultProps) => {
  const [playingMusicState] = useAtom(musicPlayerStateAtom)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [, handleUpdateMusicProgress] = useAtom(handleUpdateMusicProgressAtom)
  const [, handlePlayNextMusic] = useAtom(handlePlayNextMusicAtom)
  const [, setGlobalMusicElement] = useAtom(globalMusicElementAtom)

  useEffect(() => {
    if (!playingMusicState) return
    if (playingMusicState?.playStatus == PlayStatus.playing) {
      audioRef.current?.play()
    }
    if (playingMusicState?.playStatus == PlayStatus.paused) {
      audioRef.current?.pause()
    }
  }, [playingMusicState])

  useEffect(() => {
    setGlobalMusicElement(audioRef.current)
    if (audioRef.current) {
      audioRef.current.volume = CurrentPlayingMusicStorage.getVolume()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 定期更新状态中的播放进度
    const ref = audioRef.current
    const interval = setInterval(() => {
      if (!audioRef.current) return
      handleUpdateMusicProgress(audioRef.current.currentTime / audioRef.current.duration)
    }, 1000)

    audioRef.current?.addEventListener("ended", handlePlayNextMusic)

    return () => {
      clearInterval(interval)
      ref?.removeEventListener("ended", handlePlayNextMusic)
    }
  }, [handlePlayNextMusic, handleUpdateMusicProgress])

  return (
    <audio
      id="music_player_audio"
      className={className}
      src={addProxyToUrl(playingMusicState?.url ?? "")}
      controls
      ref={audioRef}
    />
  )
}

export default GlobalMusicAudio
