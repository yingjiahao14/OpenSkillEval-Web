const SUGGESTIONS = [
  { type: 'Specialty', title: 'Dentist', meta: 'Cleanings, fillings, oral health exams' },
  { type: 'Specialty', title: 'Primary Care', meta: 'Annual checkups and preventive care' },
  { type: 'Specialty', title: 'Dermatologist', meta: 'Skin conditions, acne, consults' },
  { type: 'Specialty', title: 'Psychiatrist', meta: 'Mental health evaluations' },
  { type: 'Specialty', title: 'Eye Doctor', meta: 'Vision exams and eye health' },
  { type: 'Specialty', title: 'Orthopedic Surgeon', meta: 'Joint pain and sports injuries' },
  { type: 'Condition', title: 'Back pain', meta: 'Orthopedics, PT, pain management' },
  { type: 'Condition', title: 'Acne', meta: 'Dermatology' },
  { type: 'Condition', title: 'Anxiety', meta: 'Psychiatry and therapy' },
  { type: 'Doctor', title: 'Dr. Sarah Chen', meta: 'Dermatology • Midtown' },
  { type: 'Doctor', title: 'Dr. Miguel Rivera', meta: 'Primary Care • Downtown' },
]

function qs(sel, root = document) {
  return root.querySelector(sel)
}

function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)]
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function iconForType(type) {
  if (type === 'Doctor') return '🩺'
  if (type === 'Condition') return '✨'
  return '🔎'
}

function initMobileMenu() {
  const drawer = qs('[data-drawer]')
  const openBtn = qs('[data-menu-btn]')
  const closeBtns = qsa('[data-menu-close]')
  const links = qsa('[data-drawer-link]')
  if (!drawer || !openBtn) return

  const setOpen = (open) => {
    drawer.classList.toggle('is-open', open)
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true')
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
    if (open) {
      const firstLink = qs('.drawer__link', drawer)
      firstLink?.focus()
    } else {
      openBtn.focus()
    }
  }

  openBtn.addEventListener('click', () => setOpen(true))
  closeBtns.forEach((btn) => btn.addEventListener('click', () => setOpen(false)))
  links.forEach((a) => a.addEventListener('click', () => setOpen(false)))

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false)
  })
}

function initGeolocation() {
  const btn = qs('[data-use-location]')
  const input = qs('[data-location]')
  if (!btn || !input) return

  const setState = (state) => {
    btn.disabled = state === 'loading'
    if (state === 'loading') btn.textContent = 'Detecting…'
    if (state === 'idle') btn.textContent = 'Use my location'
    if (state === 'error') btn.textContent = 'Location unavailable'
    if (state === 'done') btn.textContent = 'Location added'
  }

  const setTemp = (state) => {
    setState(state)
    window.setTimeout(() => setState('idle'), 1400)
  }

  btn.addEventListener('click', () => {
    if (!('geolocation' in navigator)) {
      setTemp('error')
      return
    }
    setState('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(3)
        const lng = pos.coords.longitude.toFixed(3)
        input.value = `Near me (${lat}, ${lng})`
        input.dispatchEvent(new Event('input', { bubbles: true }))
        setTemp('done')
      },
      () => {
        setTemp('error')
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 },
    )
  })
}

function initAutocomplete() {
  const input = qs('[data-q]')
  const list = qs('[data-suggestions]')
  if (!input || !list) return

  let activeIndex = -1
  let current = []

  const close = () => {
    activeIndex = -1
    current = []
    input.setAttribute('aria-expanded', 'false')
    list.hidden = true
    list.innerHTML = ''
  }

  const open = () => {
    input.setAttribute('aria-expanded', 'true')
    list.hidden = false
  }

  const render = (items) => {
    current = items
    if (items.length === 0) {
      close()
      return
    }

    list.innerHTML = items
      .map((item, idx) => {
        const selected = idx === activeIndex
        return `
          <div
            class="suggestions__item"
            role="option"
            tabindex="-1"
            aria-selected="${selected ? 'true' : 'false'}"
            data-idx="${idx}"
          >
            <div class="suggestions__icon" aria-hidden="true">${iconForType(item.type)}</div>
            <div>
              <div class="suggestions__title">${escapeHtml(item.title)} <span style="color: rgba(82,97,121,.85); font-weight: 800; font-size: 12px;">· ${escapeHtml(item.type)}</span></div>
              <div class="suggestions__meta">${escapeHtml(item.meta || '')}</div>
            </div>
          </div>
        `.trim()
      })
      .join('')

    open()
  }

  const filter = (q) => {
    const query = q.trim().toLowerCase()
    if (query.length === 0) return []
    const starts = []
    const contains = []

    for (const item of SUGGESTIONS) {
      const hay = `${item.title} ${item.meta || ''} ${item.type}`.toLowerCase()
      if (hay.startsWith(query) || item.title.toLowerCase().startsWith(query)) starts.push(item)
      else if (hay.includes(query)) contains.push(item)
    }

    return [...starts, ...contains].slice(0, 7)
  }

  const commit = (idx) => {
    const item = current[idx]
    if (!item) return
    input.value = item.title
    close()
    input.focus()
  }

  input.addEventListener('input', () => {
    activeIndex = -1
    render(filter(input.value))
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close()
      return
    }

    if (list.hidden) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeIndex = clamp(activeIndex + 1, 0, current.length - 1)
      render(current)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeIndex = clamp(activeIndex - 1, 0, current.length - 1)
      render(current)
      return
    }
    if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault()
        commit(activeIndex)
      }
    }
  })

  list.addEventListener('mousedown', (e) => {
    const item = e.target.closest('[data-idx]')
    if (!item) return
    e.preventDefault()
    commit(Number(item.getAttribute('data-idx')))
  })

  document.addEventListener('click', (e) => {
    if (e.target === input || list.contains(e.target)) return
    close()
  })

  input.addEventListener('focus', () => {
    const items = filter(input.value)
    if (items.length) render(items)
  })
}

function initSearchForm() {
  const form = qs('[data-search-form]')
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const q = qs('[data-q]')?.value?.trim() || ''
    const location = qs('[data-location]')?.value?.trim() || ''
    const insurance = qs('[data-insurance]')?.value?.trim() || ''

    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (location) params.set('location', location)
    if (insurance) params.set('insurance', insurance)

    const target = `./search.html?${params.toString()}`
    window.location.href = target
  })
}

function initSpecialtyCards() {
  // The anchors already have hrefs, but we also keep this in case
  // future changes switch them to buttons.
  qsa('[data-specialty]').forEach((el) => {
    el.addEventListener('click', () => {
      // allow default navigation
    })
  })
}

initMobileMenu()
initGeolocation()
initAutocomplete()
initSearchForm()
initSpecialtyCards()

