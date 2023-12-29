import { handlePlayNextMusicAtom } from "@/stores/MusicTrack/MusicPlayList"
import { handleUpdateMusicProgressAtom, musicPlayerStateAtom } from "@/stores/MusicTrack/MusicTrack"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { PlayStatus } from "@/types/MusicPlayer"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react"

/**
 * 全局音乐播放轨道，作为音乐播放器情景下的核心，在视图上隐藏不可见
 */
const GlobalMusicAudio = ({ className }: MergeWithDefaultProps) => {
  const [musicPlayerState] = useAtom(musicPlayerStateAtom)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [, handleUpdateMusicProgress] = useAtom(handleUpdateMusicProgressAtom)
  const [, handlePlayNextMusic] = useAtom(handlePlayNextMusicAtom)

  useEffect(() => {
    if (!musicPlayerState) return
    if (musicPlayerState?.playStatus == PlayStatus.playing) {
      audioRef.current?.play()
    }
    if (musicPlayerState?.playStatus == PlayStatus.paused) {
      audioRef.current?.pause()
    }
  }, [musicPlayerState])

  useEffect(() => {
    // 定期更新状态中的播放进度
    let interval = setInterval(() => {
      if (!audioRef.current) return
      handleUpdateMusicProgress(audioRef.current.currentTime / audioRef.current.duration)
    }, 1000)

    audioRef.current?.addEventListener("ended", handlePlayNextMusic)

    return () => {
      clearInterval(interval)
      audioRef.current?.removeEventListener("ended", handlePlayNextMusic)
    }
  }, [])

  return <audio id="music_player_audio" className={className} src={musicPlayerState?.url} controls ref={audioRef} />
}

export default GlobalMusicAudio
