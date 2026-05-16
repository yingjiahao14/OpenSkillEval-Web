import { useEffect, useRef, useState } from 'react'

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.3, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, inView }
}

export function useCountUp(
  end: number,
  duration = 2000,
  prefix = '',
  suffix = ''
) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration])

  const formatted =
    prefix +
    (end >= 1000000
      ? (value / 1000000).toFixed(value >= 1000000 ? 0 : 1)
      : end >= 1000
      ? Math.floor(value / 1000).toLocaleString()
      : value.toLocaleString()) +
    suffix

  return { ref, formatted, inView }
}
