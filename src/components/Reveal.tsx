import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Задержка появления, мс — для «лесенки» из нескольких блоков. */
  delay?: number
  className?: string
}

/** Плавно проявляет содержимое, когда оно попадает в кадр. */
export function Reveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect() // проявляем один раз, обратно не прячем
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
