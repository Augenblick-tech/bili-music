import { handlePlayNextMusicAtom } from "@/stores/PlayingMusic/MusicPlayList"
import { globalMusicElementAtom, musicPlayerStateAtom } from "@/stores/PlayingMusic/PlayingMusic"
import { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { addProxyToUrl } from "@/utils/htmlUtil"
import { CurrentPlayingMusicStorage } from "@/storage/CurrentPlayingMusic"
import { PlayStatus } from "@/types/MusicPlayer"

/**
 * 全局音乐播放轨道，作为音乐播放器情景下的核心，在视图上隐藏不可见
 */
const GlobalMusicAudio = ({ className }: MergeWithDefaultProps) => {
  const [playingMusicState] = useAtom(musicPlayerStateAtom)

  const audioRef = useRef<HTMLAudioElement>(null)

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
  }, [setGlobalMusicElement])

  useEffect(() => {
    // 定期更新状态中的播放进度
    const ref = audioRef.current
    audioRef.current?.addEventListener("ended", handlePlayNextMusic)

    return () => {
      ref?.removeEventListener("ended", handlePlayNextMusic)
    }
  }, [handlePlayNextMusic])

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
