import { siteContent } from './content'
import type { AppState } from './state'
import { defaultState, persistCookieConsent, persistLanguage } from './state'
import { clamp, mod, prefersReducedMotion, qs, qsa, trapFocus } from './dom'

const setMeta = () => {
  document.title = siteContent.meta.title

  const ensureMeta = (name: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.name = name
      document.head.appendChild(el)
    }
    el.content = content
  }

  ensureMeta('description', siteContent.meta.description)
  ensureMeta('theme-color', '#0A0A0A')
}

const html = String.raw

const iconChevron = () => html`
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M8.5 10l3.5 3.8L15.5 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`

const iconArrow = () => html`
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M5 12h13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`

const iconX = () => html`
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
`

const iconMenu = () => html`
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
`

const buildAppShell = (state: AppState) => {
  const navLinks = siteContent.navigation.primary
    .map(
      (item) =>
        html`<a class="nav-link" href="${item.href}"><span>${item.label}</span></a>`,
    )
    .join('')

  const langLabel =
    siteContent.navigation.languages.find((l) => l.value === state.languageValue)
      ?.label ?? 'Global EN'

  const heroSlides = siteContent.hero.slides
    .map((s, i) => {
      const active = i === state.heroIndex
      const bg = siteContent.hero.slideVisuals[i]
      return html`
        <article class="hero-card ${active ? 'is-active' : ''}" data-hero-index="${i}" aria-hidden="${
          active ? 'false' : 'true'
        }">
          <div class="hero-card__media" aria-hidden="true">
            <img src="${bg}" alt="" loading="eager" />
            <div class="hero-card__film"></div>
          </div>
          <div class="hero-card__body">
            <div class="hero-card__top">
              <div class="pill">${s.toneTag ?? 'Featured'}</div>
              <div class="kicker">${s.kicker}</div>
            </div>
            <h3 class="hero-card__title">${s.title}</h3>
            <p class="hero-card__desc">${s.description}</p>
            <div class="hero-card__actions">
              <a class="btn btn-primary" href="${s.ctaHref}">
                <span>${s.ctaLabel}</span>
                ${iconArrow()}
              </a>
            </div>
          </div>
        </article>
      `
    })
    .join('')

  const heroDots = siteContent.hero.slides
    .map((_, i) => {
      const active = i === state.heroIndex
      return html`<button class="dot ${active ? 'is-active' : ''}" aria-label="Hero slide ${
        i + 1
      }" data-hero-dot="${i}" aria-pressed="${active ? 'true' : 'false'}"></button>`
    })
    .join('')

  const teamTabs = siteContent.team.regions
    .map((r) => {
      const active = r.key === state.teamRegion
      return html`<button class="tab ${active ? 'is-active' : ''}" data-team-region="${
        r.key
      }" aria-pressed="${active ? 'true' : 'false'}">
        <span>${r.label}</span>
      </button>`
    })
    .join('')

  const workCards = siteContent.work.projects
    .map((p) => {
      return html`
        <article class="work-card">
          <div class="work-card__media" aria-hidden="true">
            <img src="${p.imageDataUri}" alt="" loading="lazy" />
            <div class="work-card__overlay"></div>
          </div>
          <div class="work-card__body">
            <div class="work-card__meta">
              <span class="pill pill--soft">${p.tag}</span>
              <span class="work-card__client">${p.client}</span>
            </div>
            <h3 class="work-card__title">${p.title}</h3>
            ${p.testimonial
              ? html`<p class="work-card__quote">“${p.testimonial.quote}”</p>
                  <p class="work-card__attr">${p.testimonial.attribution}</p>`
              : html`<p class="work-card__desc">${p.description ?? ''}</p>`}
            <div class="work-card__actions">
              <a class="text-link" href="#contact">Discuss a similar engagement ${iconArrow()}</a>
            </div>
          </div>
        </article>
      `
    })
    .join('')

  const insightCards = siteContent.insights.items
    .map((it) => {
      return html`
        <article class="insight-card">
          <div class="insight-card__media" aria-hidden="true">
            <img src="${it.imageDataUri}" alt="" loading="lazy" />
          </div>
          <div class="insight-card__body">
            <div class="insight-card__meta">
              <span class="pill">${it.type}</span>
            </div>
            <h3 class="insight-card__title">${it.title}</h3>
            <a class="btn btn-ghost" href="${it.href}">
              <span>${it.cta}</span>
              ${iconArrow()}
            </a>
          </div>
        </article>
      `
    })
    .join('')

  const principleCards = siteContent.principles.items
    .map(
      (p, idx) => html`
        <article class="principle">
          <div class="principle__index">0${idx + 1}</div>
          <h3 class="principle__title">${p.title}</h3>
          <p class="principle__desc">${p.description}</p>
        </article>
      `,
    )
    .join('')

  const footerCtas = siteContent.footer.ctas
    .map(
      (c) => html`
        <div class="footer-cta">
          <p class="footer-cta__copy">${c.title}</p>
          <a class="btn btn-primary" href="${c.ctaHref}">
            <span>${c.ctaLabel}</span>
            ${iconArrow()}
          </a>
        </div>
      `,
    )
    .join('')

  const footerLinks = siteContent.footer.links
    .map((l) => html`<a class="footer-link" href="#">${l}</a>`)
    .join('')

  const cookieHidden = state.cookieConsent !== 'unset'

  return html`
    <div class="grain"></div>

    <header class="header" id="top">
      <div class="header__inner">
        <a class="brand" href="#top" aria-label="Leap Studio home">
          <span class="brand__mark" aria-hidden="true">LS</span>
          <span class="brand__text">Leap Studio</span>
        </a>

        <nav class="nav" aria-label="Primary">
          ${navLinks}
        </nav>

        <div class="header__actions">
          <div class="lang" data-lang>
            <button class="lang__button" data-lang-button aria-haspopup="listbox" aria-expanded="${
              state.languageOpen ? 'true' : 'false'
            }">
              <span>${langLabel}</span>
              ${iconChevron()}
            </button>
            <div class="lang__panel ${state.languageOpen ? 'is-open' : ''}" data-lang-panel>
              ${siteContent.navigation.languages
                .map(
                  (o) =>
                    html`<button class="lang__option ${
                      o.value === state.languageValue ? 'is-active' : ''
                    }" role="option" data-lang-option="${o.value}" aria-selected="${
                      o.value === state.languageValue ? 'true' : 'false'
                    }">${o.label}</button>`,
                )
                .join('')}
            </div>
          </div>

          <a class="btn btn-primary btn--small" href="#contact">
            <span>Get in touch</span>
          </a>

          <button class="icon-btn" data-mobile-open aria-label="Open navigation">
            ${iconMenu()}
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-nav" data-mobile-nav aria-hidden="true">
      <div class="mobile-nav__backdrop" data-mobile-close></div>
      <div class="mobile-nav__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div class="mobile-nav__top">
          <div class="brand brand--compact">
            <span class="brand__mark" aria-hidden="true">LS</span>
            <span class="brand__text">Leap Studio</span>
          </div>
          <button class="icon-btn" data-mobile-close aria-label="Close navigation">
            ${iconX()}
          </button>
        </div>
        <div class="mobile-nav__links">
          ${siteContent.navigation.primary
            .map(
              (item) =>
                html`<a class="mobile-link" href="${item.href}" data-mobile-link>${item.label}</a>`,
            )
            .join('')}
        </div>
        <div class="mobile-nav__meta">
          <a class="btn btn-primary" href="#contact" data-mobile-link>
            <span>Contact us</span>
            ${iconArrow()}
          </a>
          <p class="muted">30+ studios · global delivery · eco‑digital era</p>
        </div>
      </div>
    </div>

    <main>
      <section class="hero" aria-label="Hero">
        <div class="container hero__grid">
          <div class="hero__copy">
            <div class="eyebrow">${siteContent.hero.eyebrow}</div>
            <h1 class="hero__title">${siteContent.hero.headline.replaceAll('\n', '<br/>')}</h1>
            <p class="hero__subhead">${siteContent.hero.subhead}</p>
            <div class="hero__ctas">
              <a class="btn btn-primary" href="#work">
                <span>Explore our work</span>
                ${iconArrow()}
              </a>
              <a class="btn btn-ghost" href="#insights">
                <span>Read the latest</span>
                ${iconArrow()}
              </a>
            </div>
            <div class="hero__stats" aria-label="Highlights">
              <div class="stat">
                <div class="stat__num">30+</div>
                <div class="stat__label">Studios worldwide</div>
              </div>
              <div class="stat">
                <div class="stat__num">Enterprise</div>
                <div class="stat__label">Brand + innovation teams</div>
              </div>
              <div class="stat">
                <div class="stat__num">Eco‑digital</div>
                <div class="stat__label">People + planet outcomes</div>
              </div>
            </div>
          </div>

          <div class="hero__carousel" aria-label="Featured content" data-hero>
            <div class="hero-carousel" data-hero-track>
              ${heroSlides}
            </div>
            <div class="hero-carousel__controls">
              <button class="icon-btn" data-hero-prev aria-label="Previous hero slide">
                <span aria-hidden="true">←</span>
              </button>
              <div class="dots" role="tablist" aria-label="Hero slides">
                ${heroDots}
              </div>
              <button class="icon-btn" data-hero-next aria-label="Next hero slide">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="team" aria-label="Global studios">
        <div class="container">
          <div class="section__head">
            <h2 class="section__title">${siteContent.team.title}</h2>
            <p class="section__subtitle">${siteContent.team.subtitle}</p>
          </div>

          <div class="tabs" role="tablist" aria-label="Regions" data-team-tabs>
            ${teamTabs}
          </div>

          <div class="team" data-team>
            <div class="team__rail" data-team-rail>
              <!-- cards injected by JS -->
            </div>
            <div class="team__controls">
              <button class="icon-btn" data-team-prev aria-label="Previous team member">←</button>
              <div class="team__progress" data-team-progress aria-label="Team member position"></div>
              <button class="icon-btn" data-team-next aria-label="Next team member">→</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="work" aria-label="Client work">
        <div class="container">
          <div class="section__head section__head--split">
            <div>
              <h2 class="section__title">${siteContent.work.title}</h2>
              <p class="section__subtitle">${siteContent.work.subtitle}</p>
            </div>
            <div class="h-scroll__controls" aria-hidden="false">
              <button class="icon-btn" data-scroll-left="#work-rail" aria-label="Scroll work left">←</button>
              <button class="icon-btn" data-scroll-right="#work-rail" aria-label="Scroll work right">→</button>
            </div>
          </div>
        </div>

        <div class="h-scroll">
          <div class="h-scroll__rail" id="work-rail" data-hscroll>
            ${workCards}
          </div>
        </div>
      </section>

      <section class="cta" aria-label="Call to action">
        <div class="container">
          <div class="cta__card">
            <div>
              <h2 class="cta__title">${siteContent.ctaBanner.title}</h2>
              <p class="cta__body">${siteContent.ctaBanner.body}</p>
            </div>
            <a class="btn btn-primary" href="${siteContent.ctaBanner.ctaHref}">
              <span>${siteContent.ctaBanner.ctaLabel}</span>
              ${iconArrow()}
            </a>
          </div>
        </div>
      </section>

      <section class="section" id="services" aria-label="How we work">
        <div class="container">
          <div class="how">
            <div class="how__panel">
              <h2 class="section__title">${siteContent.howWeWork.title}</h2>
              <p class="how__body">${siteContent.howWeWork.body}</p>
              <a class="btn btn-ghost" href="${siteContent.howWeWork.ctaHref}">
                <span>${siteContent.howWeWork.ctaLabel}</span>
                ${iconArrow()}
              </a>
            </div>
            <div class="how__grid" aria-label="Capabilities">
              <div class="cap">
                <div class="cap__k">Strategy</div>
                <div class="cap__v">Reinvention roadmaps · ecosystem analysis · portfolio signals</div>
              </div>
              <div class="cap">
                <div class="cap__k">Design</div>
                <div class="cap__v">Experience systems · service design · brand + product craft</div>
              </div>
              <div class="cap">
                <div class="cap__k">Technology</div>
                <div class="cap__v">AI-enabled experiences · data products · platforms + tooling</div>
              </div>
              <div class="cap">
                <div class="cap__k">Impact</div>
                <div class="cap__v">Sustainable service journeys · operational enablement · scale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="insights" aria-label="Latest insights">
        <div class="container">
          <div class="section__head section__head--split">
            <div>
              <h2 class="section__title">${siteContent.insights.title}</h2>
              <p class="section__subtitle">${siteContent.insights.subtitle}</p>
            </div>
            <div class="h-scroll__controls" aria-hidden="false">
              <button class="icon-btn" data-scroll-left="#insights-rail" aria-label="Scroll insights left">←</button>
              <button class="icon-btn" data-scroll-right="#insights-rail" aria-label="Scroll insights right">→</button>
            </div>
          </div>
        </div>
        <div class="h-scroll">
          <div class="h-scroll__rail" id="insights-rail" data-hscroll>
            ${insightCards}
          </div>
        </div>
      </section>

      <section class="section" id="culture" aria-label="Our principles">
        <div class="container">
          <div class="section__head">
            <h2 class="section__title">${siteContent.principles.title}</h2>
          </div>
          <div class="principles">
            ${principleCards}
          </div>
        </div>
      </section>

      <section class="section" id="make-your-mark" aria-label="Make your mark">
        <div class="container">
          <div class="mark">
            <div class="mark__card">
              <h2 class="section__title">Make your mark</h2>
              <p class="section__subtitle">Bold work, caring community, global scale. Build the next era with us.</p>
              <div class="mark__grid">
                <div class="mark__item">
                  <div class="pill">Open roles</div>
                  <p class="muted">Design · Strategy · Engineering · Research</p>
                </div>
                <div class="mark__item">
                  <div class="pill">Studios</div>
                  <p class="muted">North America · Europe · Asia · Oceania</p>
                </div>
                <div class="mark__item">
                  <div class="pill">Culture</div>
                  <p class="muted">DE&I · learning · mentorship · craft</p>
                </div>
              </div>
              <a class="btn btn-primary" href="#contact">
                <span>Join our team</span>
                ${iconArrow()}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="contact" aria-label="Contact">
        <div class="container">
          <div class="contact">
            <div class="contact__copy">
              <h2 class="section__title">Contact Leap Studio</h2>
              <p class="section__subtitle">Tell us what you’re building. We’ll bring the global team.</p>
              <div class="contact__mini">
                <div class="mini">
                  <div class="mini__k">Enterprise inquiries</div>
                  <div class="mini__v">hello@leapstudio.example</div>
                </div>
                <div class="mini">
                  <div class="mini__k">Press</div>
                  <div class="mini__v">press@leapstudio.example</div>
                </div>
              </div>
            </div>
            <form class="form" aria-label="Contact form">
              <label class="field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Full name" autocomplete="name" required />
              </label>
              <label class="field">
                <span>Email</span>
                <input type="email" name="email" placeholder="Work email" autocomplete="email" required />
              </label>
              <label class="field">
                <span>Company</span>
                <input type="text" name="company" placeholder="Organization" autocomplete="organization" />
              </label>
              <label class="field field--full">
                <span>What are you reinventing?</span>
                <textarea name="message" rows="4" placeholder="A product, service, or system…" required></textarea>
              </label>
              <button class="btn btn-primary" type="submit">
                <span>Send</span>
                ${iconArrow()}
              </button>
              <p class="muted small">This demo form does not submit data.</p>
            </form>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer" aria-label="Footer">
      <div class="container">
        <div class="footer__ctas">
          ${footerCtas}
        </div>
        <div class="footer__bottom">
          <div class="footer__links">${footerLinks}</div>
          <div class="footer__legal">${siteContent.footer.legal}</div>
        </div>
      </div>
    </footer>

    <div class="cookie ${cookieHidden ? 'is-hidden' : ''}" data-cookie>
      <div class="cookie__card" role="region" aria-label="Cookie consent">
        <div class="cookie__copy">
          <div class="pill">Cookies</div>
          <p>
            We use cookies to improve performance and analyze site usage. You can accept all, decline, or manage settings.
          </p>
        </div>
        <div class="cookie__actions">
          <button class="btn btn-ghost btn--small" type="button" data-cookie-settings>Manage</button>
          <button class="btn btn-ghost btn--small" type="button" data-cookie-decline>Decline</button>
          <button class="btn btn-primary btn--small" type="button" data-cookie-accept>Accept all</button>
        </div>
      </div>
    </div>

    <div class="modal ${state.cookieSettingsOpen ? 'is-open' : ''}" data-cookie-modal aria-hidden="${
      state.cookieSettingsOpen ? 'false' : 'true'
    }">
      <div class="modal__backdrop" data-cookie-modal-close></div>
      <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Cookie settings">
        <div class="modal__top">
          <div>
            <div class="pill">Cookie settings</div>
            <h3 class="modal__title">Choose your privacy level</h3>
          </div>
          <button class="icon-btn" data-cookie-modal-close aria-label="Close cookie settings">
            ${iconX()}
          </button>
        </div>
        <div class="modal__body">
          <label class="toggle">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Essential</strong>
              <em>Required for core functionality.</em>
            </span>
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            <span>
              <strong>Analytics</strong>
              <em>Helps us understand usage patterns.</em>
            </span>
          </label>
          <label class="toggle">
            <input type="checkbox" />
            <span>
              <strong>Personalization</strong>
              <em>Remembers preferences and regions.</em>
            </span>
          </label>
        </div>
        <div class="modal__actions">
          <button class="btn btn-ghost" type="button" data-cookie-modal-close>Cancel</button>
          <button class="btn btn-primary" type="button" data-cookie-save>Save</button>
        </div>
      </div>
    </div>
  `
}

const renderTeamCards = (root: HTMLElement, state: AppState) => {
  const rail = qs<HTMLElement>(root, '[data-team-rail]')
  const members = siteContent.team.members.filter((m) => m.region === state.teamRegion)
  const cards = members
    .map(
      (m, idx) => html`
        <article class="team-card" data-team-index="${idx}">
          <div class="team-card__media" aria-hidden="true">
            <img src="${m.imageDataUri}" alt="" loading="lazy" />
            <div class="team-card__badge">${m.office}</div>
          </div>
          <div class="team-card__body">
            <h3 class="team-card__name">${m.name}</h3>
            <p class="team-card__title">${m.title}</p>
            <p class="team-card__quote">“${m.quote}”</p>
            <a class="btn btn-ghost btn--small" href="#contact" data-contact-city="${m.office}">
              <span>Contact Leap Studio ${m.office}</span>
              ${iconArrow()}
            </a>
          </div>
        </article>
      `,
    )
    .join('')
  rail.innerHTML = cards

  const targetIndex = clamp(state.teamIndex, 0, Math.max(0, members.length - 1))
  state.teamIndex = targetIndex
  queueMicrotask(() => scrollTeamToIndex(root, state, { animated: false }))
}

const scrollTeamToIndex = (
  root: HTMLElement,
  state: AppState,
  opts: { animated: boolean } = { animated: true },
) => {
  const rail = qs<HTMLElement>(root, '[data-team-rail]')
  const cards = qsa<HTMLElement>(rail, '.team-card')
  const card = cards[state.teamIndex]
  if (!card) return
  card.scrollIntoView({
    behavior: opts.animated ? 'smooth' : 'auto',
    inline: 'center',
    block: 'nearest',
  })
}

const updateTeamProgress = (root: HTMLElement, state: AppState) => {
  const el = qs<HTMLElement>(root, '[data-team-progress]')
  const count = siteContent.team.members.filter((m) => m.region === state.teamRegion).length
  const current = Math.min(count, state.teamIndex + 1)
  el.textContent = `${current} / ${count}`
}

const setHeroIndex = (root: HTMLElement, state: AppState, index: number) => {
  const max = siteContent.hero.slides.length
  state.heroIndex = mod(index, max)
  const cards = qsa<HTMLElement>(root, '.hero-card')
  const dots = qsa<HTMLButtonElement>(root, '[data-hero-dot]')
  cards.forEach((c) => {
    const i = Number(c.getAttribute('data-hero-index') ?? '0')
    const active = i === state.heroIndex
    c.classList.toggle('is-active', active)
    c.setAttribute('aria-hidden', active ? 'false' : 'true')
  })
  dots.forEach((d) => {
    const i = Number(d.getAttribute('data-hero-dot') ?? '0')
    const active = i === state.heroIndex
    d.classList.toggle('is-active', active)
    d.setAttribute('aria-pressed', active ? 'true' : 'false')
  })
}

const setTeamRegion = (root: HTMLElement, state: AppState, region: any) => {
  state.teamRegion = region
  state.teamIndex = 0
  qsa<HTMLButtonElement>(root, '[data-team-region]').forEach((b) => {
    const r = b.getAttribute('data-team-region')
    const active = r === state.teamRegion
    b.classList.toggle('is-active', active)
    b.setAttribute('aria-pressed', active ? 'true' : 'false')
  })
  renderTeamCards(root, state)
  updateTeamProgress(root, state)
}

const closeLanguage = (root: HTMLElement, state: AppState) => {
  state.languageOpen = false
  const button = qs<HTMLButtonElement>(root, '[data-lang-button]')
  const panel = qs<HTMLElement>(root, '[data-lang-panel]')
  panel.classList.remove('is-open')
  button.setAttribute('aria-expanded', 'false')
}

const openLanguage = (root: HTMLElement, state: AppState) => {
  state.languageOpen = true
  const button = qs<HTMLButtonElement>(root, '[data-lang-button]')
  const panel = qs<HTMLElement>(root, '[data-lang-panel]')
  panel.classList.add('is-open')
  button.setAttribute('aria-expanded', 'true')
}

const setLanguage = (root: HTMLElement, state: AppState, value: string) => {
  state.languageValue = value
  persistLanguage(value)
  qsa<HTMLButtonElement>(root, '[data-lang-option]').forEach((o) => {
    const v = o.getAttribute('data-lang-option')
    const active = v === state.languageValue
    o.classList.toggle('is-active', active)
    o.setAttribute('aria-selected', active ? 'true' : 'false')
  })
  const label =
    siteContent.navigation.languages.find((l) => l.value === state.languageValue)
      ?.label ?? 'Global EN'
  const button = qs<HTMLButtonElement>(root, '[data-lang-button]')
  const span = qs<HTMLSpanElement>(button, 'span')
  span.textContent = label
  closeLanguage(root, state)
}

const cookieHide = (root: HTMLElement) => {
  const cookie = qs<HTMLElement>(root, '[data-cookie]')
  cookie.classList.add('is-hidden')
}

const cookieShow = (root: HTMLElement) => {
  const cookie = qs<HTMLElement>(root, '[data-cookie]')
  cookie.classList.remove('is-hidden')
}

const openCookieModal = (root: HTMLElement, state: AppState) => {
  state.cookieSettingsOpen = true
  const modal = qs<HTMLElement>(root, '[data-cookie-modal]')
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')

  const panel = qs<HTMLElement>(modal, '.modal__panel')
  const release = trapFocus(panel)
  ;(modal as any)._releaseFocus = release

  queueMicrotask(() => {
    const first = panel.querySelector<HTMLElement>('button, [href], input, select, textarea')
    first?.focus()
  })
}

const closeCookieModal = (root: HTMLElement, state: AppState) => {
  state.cookieSettingsOpen = false
  const modal = qs<HTMLElement>(root, '[data-cookie-modal]')
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  const release = (modal as any)._releaseFocus as undefined | (() => void)
  release?.()
}

const wireHorizontalScrollButtons = (root: HTMLElement) => {
  const scrollBy = (targetSel: string, dir: -1 | 1) => {
    const target = document.querySelector<HTMLElement>(targetSel)
    if (!target) return
    const amount = Math.max(320, Math.round(target.clientWidth * 0.75))
    target.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  qsa<HTMLButtonElement>(root, '[data-scroll-left]').forEach((b) => {
    const sel = b.getAttribute('data-scroll-left')
    if (!sel) return
    b.addEventListener('click', () => scrollBy(sel, -1))
  })
  qsa<HTMLButtonElement>(root, '[data-scroll-right]').forEach((b) => {
    const sel = b.getAttribute('data-scroll-right')
    if (!sel) return
    b.addEventListener('click', () => scrollBy(sel, 1))
  })
}

const enhanceSwipe = (rail: HTMLElement, onSwipe: (dir: -1 | 1) => void) => {
  let startX = 0
  let startY = 0
  let active = false

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    active = true
    startX = e.clientX
    startY = e.clientY
  }

  const onPointerUp = (e: PointerEvent) => {
    if (!active) return
    active = false
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy)) return
    onSwipe(dx > 0 ? -1 : 1)
  }

  rail.addEventListener('pointerdown', onPointerDown)
  rail.addEventListener('pointerup', onPointerUp)
  rail.addEventListener('pointercancel', () => {
    active = false
  })
}

const wireMobileNav = (root: HTMLElement) => {
  const modal = qs<HTMLElement>(root, '[data-mobile-nav]')
  const panel = qs<HTMLElement>(modal, '.mobile-nav__panel')

  const open = () => {
    modal.classList.add('is-open')
    modal.setAttribute('aria-hidden', 'false')
    const release = trapFocus(panel)
    ;(modal as any)._releaseFocus = release
    queueMicrotask(() => {
      const first = panel.querySelector<HTMLElement>('a[href], button')
      first?.focus()
    })
  }

  const close = () => {
    modal.classList.remove('is-open')
    modal.setAttribute('aria-hidden', 'true')
    const release = (modal as any)._releaseFocus as undefined | (() => void)
    release?.()
  }

  qs<HTMLButtonElement>(root, '[data-mobile-open]').addEventListener('click', open)
  qsa<HTMLElement>(root, '[data-mobile-close]').forEach((el) =>
    el.addEventListener('click', close),
  )
  qsa<HTMLAnchorElement>(root, '[data-mobile-link]').forEach((a) =>
    a.addEventListener('click', close),
  )
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

export const createApp = (root: HTMLElement) => {
  setMeta()

  const state = defaultState()
  root.innerHTML = buildAppShell(state)

  const reduce = prefersReducedMotion()

  // Hero carousel
  qs<HTMLButtonElement>(root, '[data-hero-prev]').addEventListener('click', () => {
    state.heroAutoPlay = false
    setHeroIndex(root, state, state.heroIndex - 1)
  })
  qs<HTMLButtonElement>(root, '[data-hero-next]').addEventListener('click', () => {
    state.heroAutoPlay = false
    setHeroIndex(root, state, state.heroIndex + 1)
  })
  qsa<HTMLButtonElement>(root, '[data-hero-dot]').forEach((d) => {
    d.addEventListener('click', () => {
      state.heroAutoPlay = false
      const i = Number(d.getAttribute('data-hero-dot') ?? '0')
      setHeroIndex(root, state, i)
    })
  })
  const heroTrack = qs<HTMLElement>(root, '[data-hero-track]')
  enhanceSwipe(heroTrack, (dir) => {
    state.heroAutoPlay = false
    setHeroIndex(root, state, state.heroIndex + dir)
  })

  if (!reduce) {
    window.setInterval(() => {
      if (!state.heroAutoPlay) return
      if (document.hidden) return
      setHeroIndex(root, state, state.heroIndex + 1)
    }, 6400)
  }

  // Team carousel
  renderTeamCards(root, state)
  updateTeamProgress(root, state)
  qsa<HTMLButtonElement>(root, '[data-team-region]').forEach((b) => {
    b.addEventListener('click', () => {
      const region = b.getAttribute('data-team-region')
      if (!region) return
      setTeamRegion(root, state, region)
    })
  })
  qs<HTMLButtonElement>(root, '[data-team-prev]').addEventListener('click', () => {
    const members = siteContent.team.members.filter((m) => m.region === state.teamRegion)
    state.teamIndex = mod(state.teamIndex - 1, members.length)
    scrollTeamToIndex(root, state)
    updateTeamProgress(root, state)
  })
  qs<HTMLButtonElement>(root, '[data-team-next]').addEventListener('click', () => {
    const members = siteContent.team.members.filter((m) => m.region === state.teamRegion)
    state.teamIndex = mod(state.teamIndex + 1, members.length)
    scrollTeamToIndex(root, state)
    updateTeamProgress(root, state)
  })
  const teamRail = qs<HTMLElement>(root, '[data-team-rail]')
  enhanceSwipe(teamRail, (dir) => {
    const members = siteContent.team.members.filter((m) => m.region === state.teamRegion)
    state.teamIndex = mod(state.teamIndex + dir, members.length)
    scrollTeamToIndex(root, state)
    updateTeamProgress(root, state)
  })
  teamRail.addEventListener('scroll', () => {
    // best-effort index sync
    const cards = qsa<HTMLElement>(teamRail, '.team-card')
    const railRect = teamRail.getBoundingClientRect()
    let closestIdx = 0
    let closestDist = Number.POSITIVE_INFINITY
    cards.forEach((c, idx) => {
      const r = c.getBoundingClientRect()
      const center = r.left + r.width / 2
      const target = railRect.left + railRect.width / 2
      const dist = Math.abs(center - target)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = idx
      }
    })
    state.teamIndex = closestIdx
    updateTeamProgress(root, state)
  })

  // Language toggle
  const langButton = qs<HTMLButtonElement>(root, '[data-lang-button]')
  langButton.addEventListener('click', (e) => {
    e.stopPropagation()
    state.languageOpen ? closeLanguage(root, state) : openLanguage(root, state)
  })
  qsa<HTMLButtonElement>(root, '[data-lang-option]').forEach((o) => {
    o.addEventListener('click', (e) => {
      e.stopPropagation()
      const v = o.getAttribute('data-lang-option')
      if (!v) return
      setLanguage(root, state, v)
    })
  })
  window.addEventListener('click', () => {
    if (state.languageOpen) closeLanguage(root, state)
  })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.languageOpen) closeLanguage(root, state)
  })

  // Cookie consent
  const cookieAccept = qs<HTMLButtonElement>(root, '[data-cookie-accept]')
  const cookieDecline = qs<HTMLButtonElement>(root, '[data-cookie-decline]')
  const cookieSettings = qs<HTMLButtonElement>(root, '[data-cookie-settings]')
  cookieAccept.addEventListener('click', () => {
    state.cookieConsent = 'accepted'
    persistCookieConsent(state.cookieConsent)
    cookieHide(root)
  })
  cookieDecline.addEventListener('click', () => {
    state.cookieConsent = 'declined'
    persistCookieConsent(state.cookieConsent)
    cookieHide(root)
  })
  cookieSettings.addEventListener('click', () => {
    openCookieModal(root, state)
  })

  qsa<HTMLElement>(root, '[data-cookie-modal-close]').forEach((el) =>
    el.addEventListener('click', () => closeCookieModal(root, state)),
  )
  qs<HTMLButtonElement>(root, '[data-cookie-save]').addEventListener('click', () => {
    // In a real site we'd store granular preferences.
    state.cookieConsent = 'accepted'
    persistCookieConsent(state.cookieConsent)
    closeCookieModal(root, state)
    cookieHide(root)
  })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.cookieSettingsOpen) closeCookieModal(root, state)
  })

  if (state.cookieConsent === 'unset') cookieShow(root)
  else cookieHide(root)

  // Contact city affordance
  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement | null
    const a = t?.closest?.('[data-contact-city]') as HTMLElement | null
    if (!a) return
    const city = a.getAttribute('data-contact-city')
    if (!city) return
    const message = root.querySelector<HTMLTextAreaElement>('textarea[name="message"]')
    if (!message) return
    if (!message.value.trim()) {
      message.value = `Hi Leap Studio ${city} — we’d like to explore a reinvention engagement.`
    }
  })

  // Demo form
  const form = root.querySelector<HTMLFormElement>('form.form')
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
    if (btn) {
      btn.disabled = true
      const prev = btn.innerHTML
      btn.innerHTML = '<span>Sent</span>'
      window.setTimeout(() => {
        btn.disabled = false
        btn.innerHTML = prev
      }, 1400)
    }
  })

  // Horizontal scroll controls
  wireHorizontalScrollButtons(root)
  wireMobileNav(root)
}

