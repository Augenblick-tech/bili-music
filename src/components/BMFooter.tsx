import { FC, useEffect, useRef, useState } from 'react'
import { FCProps } from '@/types/FCProps'
// import { BiliVideoURL } from '@/types/bili/BiliVideo'
import { getBiliVideoURL } from '@/api/BiliVideo'
import { BiliVideoAtom } from '@/stores/BiliVideo'
import { useAtom } from 'jotai'

const BMFooter: FC<FCProps> = ({ className }) => {
	// const [videoData, setVideoData] = useState<BiliVideoURL>()
	const [videoAtom, setVideoAtom] = useAtom(BiliVideoAtom)

	const videoRef = useRef<HTMLVideoElement>(null)
	const [videoStat, setVideoStat] = useState<'playing' | 'paused'>('paused')

	// useEffect(() => {
	// 	getBiliVideoURL({
	// 		bvid: 'BV1y7411Q7Eq',
	// 		cid: 171776208,
	// 		fnval: 16,
	// 	}).then((res) => {
	// 		// console.log(res)
	// 		// console.log(res.data?.dash?.audio[0].baseUrl)
	// 		setVideoAtom(res.data)
	// 	})
	// }, [setVideoAtom])

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
					<div className="name">BV1y7411Q7Eq</div>
				</div>
				<div className="control flex-1">
					<button
						onClick={() => {
							if (videoStat === 'paused') {
								videoRef.current?.play()
								setVideoStat('playing')
							} else {
								videoRef.current?.pause()
								setVideoStat('paused')
							}
						}}>
						play
					</button>
				</div>
				<div className="function flex-1">
					<button>function</button>
				</div>
			</main>
		</div>
	)
}

export default BMFooter
