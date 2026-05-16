export const qs = <T extends Element>(root: ParentNode, sel: string) => {
  const el = root.querySelector(sel)
  if (!el) throw new Error(`Missing element: ${sel}`)
  return el as T
}

export const qsa = <T extends Element>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll(sel)) as T[]

export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n))

export const mod = (n: number, m: number) => ((n % m) + m) % m

export const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

export const trapFocus = (container: HTMLElement) => {
  const focusables = () =>
    Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const list = focusables()
    if (list.length === 0) return
    const first = list[0]
    const last = list[list.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  container.addEventListener('keydown', onKeyDown)
  return () => container.removeEventListener('keydown', onKeyDown)
}

