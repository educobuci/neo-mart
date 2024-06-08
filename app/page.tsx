'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  LocalAudioTrack,
  LocalVideoTrack,
  createLocalTracks,
} from 'twilio-video'

export default function Home() {
  const videoElement = useRef<HTMLVideoElement>(null)
  const audioElement = useRef<HTMLAudioElement>(null)

  const onMediaMount = useCallback(() => {
    createLocalTracks({
      audio: true,
      video: true,
    }).then((tracks) => {
      const [localAudioTrack, localVideoTrack] = tracks as [
        LocalAudioTrack,
        LocalVideoTrack,
      ]
      localAudioTrack.attach(audioElement.current!)
      localVideoTrack.attach(videoElement.current!)
    })
  }, [])

  useEffect(() => {
    if (videoElement.current && audioElement.current) {
      onMediaMount()
    }
  }, [onMediaMount])

  return (
    <main>
      <video ref={videoElement} className="-scale-x-100" autoPlay={true} />
      <audio ref={audioElement} autoPlay={true} />
    </main>
  )
}
