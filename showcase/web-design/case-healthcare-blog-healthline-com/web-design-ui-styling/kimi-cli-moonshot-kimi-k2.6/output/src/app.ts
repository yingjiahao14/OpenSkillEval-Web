import { renderHeader } from './sections/header'
import { renderTicker } from './sections/ticker'
import { renderHero } from './sections/hero'
import { renderTrending } from './sections/trending'
import { renderNewsletterCTA } from './sections/newsletter-cta'
import { renderHealthTopics } from './sections/health-topics'
import { renderTools } from './sections/tools'
import { renderRecommendedReads } from './sections/recommended-reads'
import { renderTrustSection } from './sections/trust-section'
import { renderFeaturedPrograms } from './sections/featured-programs'
import { renderLatestVideos } from './sections/latest-videos'
import { renderFooter } from './sections/footer'

export function renderApp(container: HTMLDivElement) {
  container.innerHTML = `
    ${renderHeader()}
    ${renderTicker()}
    <main>
      ${renderHero()}
      ${renderTrending()}
      ${renderNewsletterCTA()}
      ${renderHealthTopics()}
      ${renderTools()}
      ${renderRecommendedReads()}
      ${renderTrustSection()}
      ${renderFeaturedPrograms()}
      ${renderLatestVideos()}
    </main>
    ${renderFooter()}
  `

  // Initialize interactions after DOM is ready
  initDropdowns()
  initTabs()
  initCarousel()
  initTickerHover()
}

function initDropdowns() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-dropdown]')
  triggers.forEach(trigger => {
    const id = trigger.dataset.dropdown!
    const menu = document.getElementById(id)
    if (!menu) return

    let timeout: ReturnType<typeof setTimeout>

    const show = () => {
      clearTimeout(timeout)
      menu.classList.remove('hidden', 'opacity-0', 'pointer-events-none')
      menu.classList.add('opacity-100')
      trigger.setAttribute('aria-expanded', 'true')
    }
    const hide = () => {
      timeout = setTimeout(() => {
        menu.classList.add('hidden', 'opacity-0', 'pointer-events-none')
        menu.classList.remove('opacity-100')
        trigger.setAttribute('aria-expanded', 'false')
      }, 150)
    }

    trigger.addEventListener('mouseenter', show)
    trigger.addEventListener('mouseleave', hide)
    menu.addEventListener('mouseenter', () => clearTimeout(timeout))
    menu.addEventListener('mouseleave', hide)

    trigger.addEventListener('click', (e) => {
      e.preventDefault()
      const isOpen = !menu.classList.contains('hidden')
      if (isOpen) {
        menu.classList.add('hidden', 'opacity-0', 'pointer-events-none')
        menu.classList.remove('opacity-100')
        trigger.setAttribute('aria-expanded', 'false')
      } else {
        // Close others
        document.querySelectorAll<HTMLElement>('.mega-menu').forEach(m => {
          if (m.id !== id) {
            m.classList.add('hidden', 'opacity-0', 'pointer-events-none')
            m.classList.remove('opacity-100')
          }
        })
        menu.classList.remove('hidden', 'opacity-0', 'pointer-events-none')
        menu.classList.add('opacity-100')
        trigger.setAttribute('aria-expanded', 'true')
      }
    })
  })
}

function initTabs() {
  const tabLists = document.querySelectorAll<HTMLElement>('[data-tabs]')
  tabLists.forEach(tabList => {
    const buttons = tabList.querySelectorAll<HTMLButtonElement>('[data-tab]')
    const panels = tabList.querySelectorAll<HTMLElement>('[data-tab-panel]')

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab!

        buttons.forEach(b => {
          b.classList.remove('text-primary', 'border-primary')
          b.classList.add('text-text-muted', 'border-transparent')
          b.setAttribute('aria-selected', 'false')
        })
        btn.classList.remove('text-text-muted', 'border-transparent')
        btn.classList.add('text-primary', 'border-primary')
        btn.setAttribute('aria-selected', 'true')

        panels.forEach(p => {
          if (p.dataset.tabPanel === target) {
            p.classList.remove('hidden')
            p.classList.add('animate-fade-in')
          } else {
            p.classList.add('hidden')
            p.classList.remove('animate-fade-in')
          }
        })
      })
    })
  })
}

function initCarousel() {
  const carousels = document.querySelectorAll<HTMLElement>('[data-carousel]')
  carousels.forEach(carousel => {
    const track = carousel.querySelector<HTMLElement>('[data-carousel-track]')!
    const prevBtn = carousel.querySelector<HTMLButtonElement>('[data-carousel-prev]')!
    const nextBtn = carousel.querySelector<HTMLButtonElement>('[data-carousel-next]')!

    const scrollAmount = 280

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    })
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    })
  })
}

function initTickerHover() {
  const ticker = document.querySelector<HTMLElement>('.animate-ticker')
  if (!ticker) return
  const parent = ticker.parentElement
  if (!parent) return

  parent.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused'
  })
  parent.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running'
  })
}
