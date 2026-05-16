/* Leap Studio landing page interactions (no build step). */

const qs = (sel, root = document) => root.querySelector(sel)
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel))

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function setExpanded(el, expanded) {
  el.setAttribute('aria-expanded', expanded ? 'true' : 'false')
}

function storageAvailable() {
  try {
    const key = '__leap_test__'
    localStorage.setItem(key, '1')
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

// -----------------
// Language dropdown
// -----------------

function initLanguageDropdown() {
  const btn = qs('[data-lang-button]')
  const menu = qs('[data-lang-menu]')
  const label = qs('[data-lang-label]')
  if (!btn || !menu || !label) return

  const open = () => {
    menu.classList.add('open')
    setExpanded(btn, true)
  }
  const close = () => {
    menu.classList.remove('open')
    setExpanded(btn, false)
  }
  const toggle = () => (menu.classList.contains('open') ? close() : open())

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    toggle()
  })

  qsa('a[data-lang-option]', menu).forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      const val = a.getAttribute('data-lang-option') || a.textContent.trim()
      label.textContent = val
      close()
    })
  })

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return
    if (btn.contains(e.target) || menu.contains(e.target)) return
    close()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

// -----------------
// Generic carousel
// -----------------

function initHeroCarousel() {
  const root = qs('[data-hero-carousel]')
  if (!root) return

  const track = qs('[data-carousel-track]', root)
  const slides = qsa('[data-slide]', root)
  const prevBtn = qs('[data-carousel-prev]', root)
  const nextBtn = qs('[data-carousel-next]', root)
  const dots = qsa('[data-carousel-dot]', root)
  const live = qs('[data-carousel-live]', root)

  let index = 0
  let timer = null
  let pointerActive = false
  let startX = 0
  let deltaX = 0

  const apply = () => {
    if (!track) return
    track.style.transform = `translateX(${-index * 100}%)`
    dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'))
    if (prevBtn) prevBtn.disabled = index === 0
    if (nextBtn) nextBtn.disabled = index === slides.length - 1
    if (live) {
      const title = slides[index]?.getAttribute('data-title') || `Slide ${index + 1}`
      live.textContent = title
    }
  }

  const go = (next) => {
    index = clamp(next, 0, slides.length - 1)
    apply()
  }

  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  const stopAuto = () => {
    if (timer) window.clearInterval(timer)
    timer = null
  }
  const startAuto = () => {
    if (prefersReducedMotion()) return
    stopAuto()
    timer = window.setInterval(() => {
      index = (index + 1) % slides.length
      apply()
    }, 6500)
  }

  prevBtn?.addEventListener('click', () => {
    stopAuto()
    prev()
    startAuto()
  })
  nextBtn?.addEventListener('click', () => {
    stopAuto()
    next()
    startAuto()
  })
  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      stopAuto()
      go(i)
      startAuto()
    })
  })

  // Swipe
  const viewport = qs('[data-carousel-viewport]', root)
  if (viewport) {
    viewport.addEventListener('pointerdown', (e) => {
      pointerActive = true
      startX = e.clientX
      deltaX = 0
      viewport.setPointerCapture?.(e.pointerId)
      stopAuto()
    })
    viewport.addEventListener('pointermove', (e) => {
      if (!pointerActive) return
      deltaX = e.clientX - startX
    })
    const end = () => {
      if (!pointerActive) return
      pointerActive = false
      const threshold = 40
      if (deltaX > threshold) prev()
      else if (deltaX < -threshold) next()
      startAuto()
    }
    viewport.addEventListener('pointerup', end)
    viewport.addEventListener('pointercancel', end)
    viewport.addEventListener('pointerleave', end)
  }

  // Keyboard
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      stopAuto(); prev(); startAuto()
    }
    if (e.key === 'ArrowRight') {
      stopAuto(); next(); startAuto()
    }
  })

  root.addEventListener('mouseenter', stopAuto)
  root.addEventListener('mouseleave', startAuto)

  apply()
  startAuto()
}

// -----------------
// Horizontal scroller
// -----------------

function initHScroller(rootSel) {
  const root = qs(rootSel)
  if (!root) return

  const viewport = qs('[data-hviewport]', root)
  const track = qs('[data-htrack]', root)
  const prevBtn = qs('[data-hprev]', root)
  const nextBtn = qs('[data-hnext]', root)

  let index = 0
  let itemWidth = 340
  let gap = 14
  let items = []

  const measure = () => {
    items = qsa('[data-hitem]', root)
    const first = items[0]
    if (first) {
      const rect = first.getBoundingClientRect()
      itemWidth = rect.width
      const cs = window.getComputedStyle(track)
      gap = parseFloat(cs.columnGap || cs.gap || '14') || 14
    }
    const maxIndex = Math.max(0, items.length - visibleCount())
    index = clamp(index, 0, maxIndex)
  }

  const visibleCount = () => {
    if (!viewport) return 1
    const w = viewport.getBoundingClientRect().width
    return Math.max(1, Math.floor((w + gap) / (itemWidth + gap)))
  }

  const maxIndex = () => Math.max(0, items.length - visibleCount())

  const apply = () => {
    const x = -index * (itemWidth + gap)
    track.style.transform = `translateX(${x}px)`
    if (prevBtn) prevBtn.disabled = index <= 0
    if (nextBtn) nextBtn.disabled = index >= maxIndex()
  }

  const go = (next) => {
    index = clamp(next, 0, maxIndex())
    apply()
  }

  const prev = () => go(index - 1)
  const next = () => go(index + 1)

  prevBtn?.addEventListener('click', prev)
  nextBtn?.addEventListener('click', next)

  // Swipe
  if (viewport) {
    let down = false
    let startX = 0
    let dx = 0

    viewport.addEventListener('pointerdown', (e) => {
      down = true
      startX = e.clientX
      dx = 0
      viewport.setPointerCapture?.(e.pointerId)
    })
    viewport.addEventListener('pointermove', (e) => {
      if (!down) return
      dx = e.clientX - startX
    })
    const end = () => {
      if (!down) return
      down = false
      const threshold = 36
      if (dx > threshold) prev()
      else if (dx < -threshold) next()
    }
    viewport.addEventListener('pointerup', end)
    viewport.addEventListener('pointercancel', end)
    viewport.addEventListener('pointerleave', end)
  }

  window.addEventListener('resize', () => {
    measure(); apply()
  })

  measure(); apply()
}

// -----------------
// Team region filter
// -----------------

function initTeamRegionCarousel() {
  const root = qs('[data-team]')
  if (!root) return

  const tabs = qsa('[data-region-tab]', root)
  const track = qs('[data-htrack]', root)
  const viewport = qs('[data-hviewport]', root)
  const prevBtn = qs('[data-hprev]', root)
  const nextBtn = qs('[data-hnext]', root)

  const allItems = qsa('[data-team-card]', root)
  let activeRegion = 'north-america'
  let index = 0
  let itemWidth = 340
  let gap = 14
  let items = []

  const measure = () => {
    const first = items[0]
    if (first) {
      const rect = first.getBoundingClientRect()
      itemWidth = rect.width
      const cs = window.getComputedStyle(track)
      gap = parseFloat(cs.columnGap || cs.gap || '14') || 14
    }
  }

  const visibleCount = () => {
    if (!viewport) return 1
    const w = viewport.getBoundingClientRect().width
    return Math.max(1, Math.floor((w + gap) / (itemWidth + gap)))
  }

  const maxIndex = () => Math.max(0, items.length - visibleCount())

  const apply = () => {
    const x = -index * (itemWidth + gap)
    track.style.transform = `translateX(${x}px)`
    prevBtn.disabled = index <= 0
    nextBtn.disabled = index >= maxIndex()
  }

  const setRegion = (region) => {
    activeRegion = region
    tabs.forEach((t) => t.setAttribute('aria-selected', t.getAttribute('data-region-tab') === region ? 'true' : 'false'))
    allItems.forEach((el) => {
      el.style.display = el.getAttribute('data-region') === region ? '' : 'none'
    })
    items = allItems.filter((el) => el.getAttribute('data-region') === region)
    index = 0
    measure()
    apply()
  }

  const prev = () => {
    index = clamp(index - 1, 0, maxIndex())
    apply()
  }
  const next = () => {
    index = clamp(index + 1, 0, maxIndex())
    apply()
  }

  prevBtn?.addEventListener('click', prev)
  nextBtn?.addEventListener('click', next)

  tabs.forEach((t) => {
    t.addEventListener('click', () => {
      const region = t.getAttribute('data-region-tab')
      if (!region) return
      setRegion(region)
    })
  })

  // Swipe
  if (viewport) {
    let down = false
    let startX = 0
    let dx = 0
    viewport.addEventListener('pointerdown', (e) => {
      down = true
      startX = e.clientX
      dx = 0
      viewport.setPointerCapture?.(e.pointerId)
    })
    viewport.addEventListener('pointermove', (e) => {
      if (!down) return
      dx = e.clientX - startX
    })
    const end = () => {
      if (!down) return
      down = false
      const threshold = 36
      if (dx > threshold) prev()
      else if (dx < -threshold) next()
    }
    viewport.addEventListener('pointerup', end)
    viewport.addEventListener('pointercancel', end)
    viewport.addEventListener('pointerleave', end)
  }

  window.addEventListener('resize', () => {
    measure(); apply()
  })

  setRegion(activeRegion)
}

// -----------------
// Cookie consent
// -----------------

function initCookieConsent() {
  const banner = qs('[data-cookie-banner]')
  const modal = qs('[data-cookie-modal]')
  if (!banner || !modal) return

  const accept = qs('[data-cookie-accept]', banner)
  const decline = qs('[data-cookie-decline]', banner)
  const manage = qs('[data-cookie-manage]', banner)
  const closeModal = qsa('[data-cookie-close]', modal)
  const save = qs('[data-cookie-save]', modal)
  const toggles = qsa('[data-cookie-toggle]', modal)

  const canStore = storageAvailable()
  const read = () => {
    if (!canStore) return null
    try {
      return JSON.parse(localStorage.getItem('leap_cookie_prefs') || 'null')
    } catch {
      return null
    }
  }
  const write = (prefs) => {
    if (!canStore) return
    localStorage.setItem('leap_cookie_prefs', JSON.stringify(prefs))
    localStorage.setItem('leap_cookie_ack', '1')
  }

  const openBanner = () => banner.classList.add('open')
  const closeBanner = () => banner.classList.remove('open')
  const openModal = () => modal.classList.add('open')
  const closeModalFn = () => modal.classList.remove('open')

  const ensureDefaults = () => {
    const current = read()
    if (current) return
    write({ necessary: true, analytics: false, marketing: false })
  }

  // If already acknowledged, hide.
  if (canStore && localStorage.getItem('leap_cookie_ack') === '1') {
    closeBanner()
  } else {
    openBanner()
  }

  accept?.addEventListener('click', () => {
    write({ necessary: true, analytics: true, marketing: true })
    closeBanner()
  })
  decline?.addEventListener('click', () => {
    write({ necessary: true, analytics: false, marketing: false })
    closeBanner()
  })
  manage?.addEventListener('click', () => {
    ensureDefaults()
    const prefs = read() || { necessary: true, analytics: false, marketing: false }
    toggles.forEach((t) => {
      const key = t.getAttribute('data-cookie-toggle')
      const val = !!prefs[key]
      t.setAttribute('aria-checked', val ? 'true' : 'false')
    })
    openModal()
  })

  toggles.forEach((t) => {
    t.addEventListener('click', () => {
      const key = t.getAttribute('data-cookie-toggle')
      if (key === 'necessary') return
      const isOn = t.getAttribute('aria-checked') === 'true'
      t.setAttribute('aria-checked', isOn ? 'false' : 'true')
    })
  })

  save?.addEventListener('click', () => {
    const prefs = { necessary: true }
    toggles.forEach((t) => {
      const key = t.getAttribute('data-cookie-toggle')
      prefs[key] = t.getAttribute('aria-checked') === 'true'
    })
    prefs.necessary = true
    write(prefs)
    closeModalFn()
    closeBanner()
  })

  closeModal.forEach((b) => b.addEventListener('click', closeModalFn))
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFn()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFn()
  })
}

// -----------------
// Mobile nav
// -----------------

function initMobileNav() {
  const btn = qs('[data-burger]')
  const panel = qs('[data-mobile-panel]')
  if (!btn || !panel) return

  const open = () => {
    panel.classList.add('open')
    setExpanded(btn, true)
  }
  const close = () => {
    panel.classList.remove('open')
    setExpanded(btn, false)
  }
  btn.addEventListener('click', () => {
    panel.classList.contains('open') ? close() : open()
  })
  qsa('a', panel).forEach((a) => a.addEventListener('click', close))
  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('open')) return
    if (panel.contains(e.target) || btn.contains(e.target)) return
    close()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

// -----------------
// Boot
// -----------------

document.addEventListener('DOMContentLoaded', () => {
  initLanguageDropdown()
  initMobileNav()
  initHeroCarousel()
  initTeamRegionCarousel()
  initHScroller('[data-work]')
  initCookieConsent()
})

