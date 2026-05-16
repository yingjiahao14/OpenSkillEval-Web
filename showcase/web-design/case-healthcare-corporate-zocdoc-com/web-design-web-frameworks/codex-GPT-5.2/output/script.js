const AUTOCOMPLETE = [
  { type: "Specialty", value: "Primary Care", icon: "ri-stethoscope-line" },
  { type: "Specialty", value: "Dentist", icon: "ri-tooth-line" },
  { type: "Specialty", value: "Dermatologist", icon: "ri-sun-line" },
  { type: "Specialty", value: "Psychiatrist", icon: "ri-mind-map" },
  { type: "Specialty", value: "Eye Doctor", icon: "ri-eye-line" },
  { type: "Specialty", value: "Orthopedic Surgeon", icon: "ri-run-line" },
  { type: "Condition", value: "Back pain", icon: "ri-bandage-line" },
  { type: "Condition", value: "Seasonal allergies", icon: "ri-leaf-line" },
  { type: "Condition", value: "Anxiety", icon: "ri-mental-health-line" },
  { type: "Condition", value: "Acne", icon: "ri-sparkling-2-line" },
  { type: "Doctor", value: "Dr. Sarah Chen", icon: "ri-user-3-line" },
  { type: "Doctor", value: "Dr. Miguel Alvarez", icon: "ri-user-3-line" },
  { type: "Doctor", value: "Dr. Amina Patel", icon: "ri-user-3-line" },
]

function $(sel, parent = document) {
  return parent.querySelector(sel)
}

function $all(sel, parent = document) {
  return [...parent.querySelectorAll(sel)]
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

function debounce(fn, ms) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}

function toast(message) {
  const el = document.querySelector("[data-toast]")
  const text = document.querySelector("[data-toast-text]")
  if (!el || !text) return

  text.textContent = message
  el.hidden = false
  el.animate(
    [
      { transform: "translateX(-50%) translateY(10px)", opacity: 0 },
      { transform: "translateX(-50%) translateY(0)", opacity: 1 },
    ],
    { duration: 180, easing: "ease-out" },
  )

  window.clearTimeout(toast._t)
  toast._t = window.setTimeout(() => {
    el.hidden = true
  }, 2600)
}

function setupMobileMenu() {
  const button = document.querySelector("[data-menu-button]")
  const drawer = document.querySelector("[data-drawer]")
  const close = document.querySelector("[data-drawer-close]")
  if (!button || !drawer || !close) return

  const setOpen = (open) => {
    drawer.dataset.open = open ? "true" : "false"
    drawer.setAttribute("aria-hidden", open ? "false" : "true")
    button.setAttribute("aria-expanded", open ? "true" : "false")
    document.body.style.overflow = open ? "hidden" : ""
    if (open) close.focus()
    else button.focus()
  }

  button.addEventListener("click", () => {
    const open = drawer.dataset.open === "true"
    setOpen(!open)
  })

  close.addEventListener("click", () => setOpen(false))
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) setOpen(false)
  })
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.dataset.open === "true") setOpen(false)
  })

  $all("[data-drawer-link]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false))
  })
}

function setupHeroCtaFocus() {
  const focusBtn = document.querySelector("[data-focus-search]")
  const input = document.querySelector("[data-autocomplete-input]")
  if (!focusBtn || !input) return

  focusBtn.addEventListener("click", () => {
    window.setTimeout(() => input.focus(), 150)
  })
}

function buildSuggestionItem(item, query, index) {
  const safeVal = escapeHtml(item.value)
  const safeType = escapeHtml(item.type)
  const q = query.trim().toLowerCase()
  const i = item.value.toLowerCase().indexOf(q)

  let title = safeVal
  if (q && i >= 0) {
    const before = escapeHtml(item.value.slice(0, i))
    const match = escapeHtml(item.value.slice(i, i + q.length))
    const after = escapeHtml(item.value.slice(i + q.length))
    title = `${before}<mark>${match}</mark>${after}`
  }

  return `
    <div class="ac-item" role="option" id="ac-${index}" aria-selected="false" data-ac-item data-ac-value="${safeVal}">
      <div class="ac-item__icon" aria-hidden="true"><i class="${item.icon}"></i></div>
      <div>
        <div class="ac-item__title">${title}</div>
        <div class="ac-item__sub">${safeType}</div>
      </div>
      <div class="ac-item__tag">Select</div>
    </div>
  `.trim()
}

function setupAutocomplete() {
  const wrap = document.querySelector("[data-autocomplete]")
  const input = document.querySelector("[data-autocomplete-input]")
  const list = document.querySelector("[data-autocomplete-list]")
  const clear = document.querySelector("[data-clear]")
  if (!wrap || !input || !list || !clear) return

  let activeIndex = -1
  let current = []

  const open = () => {
    list.dataset.open = "true"
    input.setAttribute("aria-expanded", "true")
  }

  const close = () => {
    list.dataset.open = "false"
    input.setAttribute("aria-expanded", "false")
    input.setAttribute("aria-activedescendant", "")
    activeIndex = -1
    current = []
    list.innerHTML = ""
  }

  const setActive = (idx) => {
    activeIndex = idx
    const items = $all("[data-ac-item]", list)
    items.forEach((el, i) => {
      const selected = i === idx
      el.setAttribute("aria-selected", selected ? "true" : "false")
      if (selected) input.setAttribute("aria-activedescendant", el.id)
    })
  }

  const pick = (value) => {
    input.value = value
    close()
    toast(`Selected: ${value}`)
  }

  const refresh = (query) => {
    const q = query.trim().toLowerCase()
    clear.style.display = query.length ? "inline-grid" : "none"

    if (!q) {
      close()
      return
    }

    const matches = AUTOCOMPLETE.filter((item) => item.value.toLowerCase().includes(q)).slice(0, 7)
    current = matches
    list.innerHTML = matches.map((m, i) => buildSuggestionItem(m, query, i)).join("")

    if (matches.length) {
      open()
      setActive(0)
    } else {
      close()
    }
  }

  const debounced = debounce((v) => refresh(v), 60)

  input.addEventListener("input", (e) => {
    debounced(e.target.value)
  })

  input.addEventListener("keydown", (e) => {
    const isOpen = list.dataset.open === "true"
    const items = $all("[data-ac-item]", list)
    if (!isOpen || !items.length) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive(Math.min(activeIndex + 1, items.length - 1))
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive(Math.max(activeIndex - 1, 0))
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0 && current[activeIndex]) {
        e.preventDefault()
        pick(current[activeIndex].value)
      }
    }

    if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  })

  list.addEventListener("mousemove", (e) => {
    const item = e.target.closest("[data-ac-item]")
    if (!item) return
    const items = $all("[data-ac-item]", list)
    const idx = items.indexOf(item)
    if (idx >= 0 && idx !== activeIndex) setActive(idx)
  })

  list.addEventListener("click", (e) => {
    const item = e.target.closest("[data-ac-item]")
    if (!item) return
    pick(item.dataset.acValue)
  })

  clear.addEventListener("click", () => {
    input.value = ""
    clear.style.display = "none"
    close()
    input.focus()
  })

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) close()
  })
}

function setupSpecialtyCards() {
  const cards = $all("[data-specialty]")
  const input = document.querySelector("[data-autocomplete-input]")
  if (!cards.length || !input) return

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const spec = card.dataset.specialty
      input.value = spec
      input.focus()
      toast(`Browsing: ${spec}`)
      document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" })
      // Trigger input event so autocomplete updates state
      input.dispatchEvent(new Event("input", { bubbles: true }))
    })
  })
}

function setupGeolocation() {
  const btn = document.querySelector("[data-geo]")
  const input = document.getElementById("loc")
  const status = document.querySelector("[data-geo-status]")
  if (!btn || !input || !status) return

  const setStatus = (msg) => {
    status.textContent = msg
  }

  btn.addEventListener("click", async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported in this browser.")
      return
    }

    setStatus("Detecting your location…")

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        // Friendly demo value: show coords; real app would reverse-geocode.
        input.value = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
        setStatus("Location detected.")
        toast("Location added")
      },
      () => {
        setStatus("Couldn’t access location. You can type it instead.")
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    )
  })
}

function renderResults({ q, loc, ins }) {
  const empty = document.querySelector("[data-results-empty]")
  const list = document.querySelector("[data-results-list]")
  if (!empty || !list) return

  const parts = [q && `“${q}”`, loc && loc, ins && ins].filter(Boolean)
  const title = parts.length ? parts.join(" · ") : "Your results"

  const mocked = [
    { name: "Dr. Sarah Chen", meta: "Dermatology • 0.7 mi • Next: Today", cta: "View times" },
    { name: "Downtown Primary Care", meta: "Primary Care • 1.2 mi • Next: 9:30am", cta: "Book" },
    { name: "BrightSmile Dental", meta: "Dentistry • 2.1 mi • Next: Tomorrow", cta: "See availability" },
  ]

  empty.hidden = true
  list.hidden = false
  list.innerHTML = `
    <div class="results__empty" style="border-bottom: 1px solid rgba(16,24,40,0.06)">
      Showing demo results for <strong>${escapeHtml(title)}</strong>
    </div>
    ${mocked
      .map(
        (r) => `
      <div class="result">
        <div class="result__avatar" aria-hidden="true"></div>
        <div>
          <div class="result__title">${escapeHtml(r.name)}</div>
          <div class="result__meta">${escapeHtml(r.meta)}</div>
        </div>
        <a class="result__cta" href="#">${escapeHtml(r.cta)}</a>
      </div>
    `.trim(),
      )
      .join("")}
  `.trim()
}

function setupSearchForm() {
  const form = document.querySelector("[data-search-form]")
  if (!form) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const fd = new FormData(form)
    const q = (fd.get("q") || "").toString().trim()
    const loc = (fd.get("loc") || "").toString().trim()
    const ins = (fd.get("ins") || "").toString().trim()

    renderResults({ q, loc, ins })
    toast("Search submitted")
  })
}

function setupSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']")
    if (!a) return
    const href = a.getAttribute("href")
    if (!href || href === "#") return
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

setupMobileMenu()
setupHeroCtaFocus()
setupAutocomplete()
setupSpecialtyCards()
setupGeolocation()
setupSearchForm()
setupSmoothAnchors()

