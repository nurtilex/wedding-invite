import { useCallback, useEffect, useRef, useState } from 'react'
import { config } from '../config'

const TARGET_VOLUME = 0.45
const FADE_MS = 1200
const FADE_STEP_MS = 40

/**
 * Фоновая музыка. Аудио живёт в хуке, а не внутри кнопки: так состоянием
 * может пользоваться и кнопка в углу, и любой другой триггер запуска.
 *
 * @param enableFirstTap запускать музыку по первому касанию страницы.
 *        Автоплей со звуком браузеры блокируют, поэтому нужен жест пользователя.
 */
export function useBackgroundMusic(enableFirstTap: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)
  // Файла нет или он не проигрывается — кнопку музыки показывать не надо.
  const [available, setAvailable] = useState(Boolean(config.music.src))

  const stopFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current)
      fadeRef.current = null
    }
  }

  useEffect(() => {
    if (!config.music.src) return

    const audio = new Audio(config.music.src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => setAvailable(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    return () => {
      stopFade()
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [])

  /** Плавно поднимаем громкость, чтобы музыка не «била» по ушам. */
  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    stopFade()
    audio.volume = 0
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + TARGET_VOLUME / (FADE_MS / FADE_STEP_MS)
      if (next >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME
        stopFade()
      } else {
        audio.volume = next
      }
    }, FADE_STEP_MS)
  }, [])

  /**
   * Вызывать строго синхронно внутри обработчика клика:
   * iOS разрешает старт звука только в рамках жеста пользователя.
   */
  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    fadeIn(audio)
    void audio.play().catch(() => {
      stopFade()
      setPlaying(false)
    })
  }, [fadeIn])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      play()
    } else {
      stopFade()
      audio.pause()
    }
  }, [play])

  // Ловим первое касание страницы, чтобы не заставлять гостя искать кнопку.
  useEffect(() => {
    if (!enableFirstTap || !available) return

    const onFirstInteraction = (event: Event) => {
      // Клик по самой кнопке обрабатывает toggle(), иначе выйдет «вкл + выкл».
      if (event.target instanceof Element && event.target.closest('.music')) return
      play()
      detach()
    }

    const events: (keyof DocumentEventMap)[] = ['pointerdown', 'keydown', 'touchstart']
    const detach = () => events.forEach((e) => document.removeEventListener(e, onFirstInteraction))
    events.forEach((e) => document.addEventListener(e, onFirstInteraction, { passive: true }))

    return detach
  }, [enableFirstTap, available, play])

  useEffect(() => stopFade, [])

  return { available, playing, play, toggle }
}
