import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Add your own licensed MP3 at public/audio/background.mp3 to replace the local
 * default. The hook catches missing/unsupported audio and uses a quiet Web Audio
 * ambience instead, so the experience is still complete on a fresh deploy.
 */
export function useAudio() {
  const audioRef = useRef(null)
  const contextRef = useRef(null)
  const ambienceRef = useRef([])
  const objectUrlRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.62)
  const [ambientOn, setAmbientOn] = useState(true)
  const [trackName, setTrackName] = useState('K. — Cigarettes After Sex')

  const ensureContext = useCallback(async () => {
    if (!contextRef.current) {
      contextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (contextRef.current.state === 'suspended') await contextRef.current.resume()
    return contextRef.current
  }, [])

  const stopAmbience = useCallback(() => {
    ambienceRef.current.forEach(({ node, gain }) => {
      try { gain.gain.exponentialRampToValueAtTime(0.0001, contextRef.current.currentTime + 0.2); node.stop(contextRef.current.currentTime + 0.22) } catch { /* already stopped */ }
    })
    ambienceRef.current = []
  }, [])

  const startAmbience = useCallback(async () => {
    const context = await ensureContext()
    if (ambienceRef.current.length || !ambientOn) return
    ;[130.81, 196, 261.63].forEach((frequency, index) => {
      const node = context.createOscillator()
      const gain = context.createGain()
      node.type = index === 0 ? 'sine' : 'triangle'
      node.frequency.value = frequency
      gain.gain.value = 0.0001
      node.connect(gain).connect(context.destination)
      node.start()
      gain.gain.exponentialRampToValueAtTime(0.014 / (index + 1), context.currentTime + 1.6)
      ambienceRef.current.push({ node, gain })
    })
  }, [ambientOn, ensureContext])

  const creak = useCallback(async () => {
    const context = await ensureContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(190, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(52, context.currentTime + 0.7)
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.7)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(); oscillator.stop(context.currentTime + 0.72)
  }, [ensureContext])

  const play = useCallback(async () => {
    await ensureContext()
    const audio = audioRef.current
    try {
      await audio.play()
    } catch {
      await startAmbience()
    }
    if (ambientOn) await startAmbience()
    setIsPlaying(true)
  }, [ambientOn, ensureContext, startAmbience])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    stopAmbience()
    setIsPlaying(false)
  }, [stopAmbience])

  const toggle = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, pause, play])

  const setVolume = useCallback((next) => {
    const safe = Number(next)
    setVolumeState(safe)
    if (audioRef.current) audioRef.current.volume = safe
    ambienceRef.current.forEach(({ gain }) => { gain.gain.value = Math.max(0.0001, safe * 0.025) })
  }, [])

  const toggleAmbient = useCallback(async () => {
    const next = !ambientOn
    setAmbientOn(next)
    if (!next) stopAmbience()
    else if (isPlaying) await startAmbience()
  }, [ambientOn, isPlaying, startAmbience, stopAmbience])

  const chooseTrack = useCallback((file) => {
    if (!file) return
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = URL.createObjectURL(file)
    audioRef.current.src = objectUrlRef.current
    audioRef.current.loop = true
    audioRef.current.load()
    setTrackName(file.name.replace(/\.[^.]+$/, ''))
  }, [])

  useEffect(() => {
    const audio = new Audio('/audio/background.mp3')
    audio.loop = true; audio.volume = 0.62; audio.preload = 'auto'
    audioRef.current = audio
    const restartAtEnd = () => {
      if (!audio.loop) {
        setIsPlaying(false)
        return
      }
      audio.currentTime = 0
      audio.play().catch(() => setIsPlaying(false))
    }
    audio.addEventListener('ended', restartAtEnd)
    return () => {
      audio.removeEventListener('ended', restartAtEnd)
      audio.pause(); stopAmbience()
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
      contextRef.current?.close()
    }
  }, [stopAmbience])

  return { isPlaying, volume, ambientOn, trackName, play, pause, toggle, setVolume, toggleAmbient, chooseTrack, creak }
}
