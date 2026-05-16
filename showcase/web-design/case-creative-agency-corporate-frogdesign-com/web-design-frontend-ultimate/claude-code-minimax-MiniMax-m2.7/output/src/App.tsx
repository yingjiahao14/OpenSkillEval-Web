import { useState, useEffect, useRef, useCallback } from 'react'
import { siteConfig, heroSlides, teamMembers, workProjects, insights, principles, navigationLinks, languages, footerLinks } from './config/site'

// Icons
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState(languages[0])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <span className="nav__logo-text">Leap Studio</span>
        </a>

        <div className="nav__links">
          {navigationLinks.map(link => (
            <a key={link.label} href={link.href} className="nav__link">{link.label}</a>
          ))}
        </div>

        <div className="nav__actions">
          <div className="lang-dropdown">
            <button
              className="lang-dropdown__trigger"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <GlobeIcon />
              <span>{activeLang.code}</span>
            </button>
            {isLangOpen && (
              <div className="lang-dropdown__menu">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`lang-dropdown__item ${activeLang.code === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setActiveLang(lang)
                      setIsLangOpen(false)
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="nav__mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__header">
          <span className="nav__logo-text">Leap Studio</span>
          <button className="mobile-menu__close" onClick={() => setIsMobileMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu__links">
          {navigationLinks.map(link => (
            <a key={link.label} href={link.href} className="mobile-menu__link" onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// Hero Carousel Component
function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const slide = heroSlides[currentSlide]

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div className="hero__noise"></div>
      </div>

      <div className="hero__content">
        <div className="hero__badge">{slide.badge}</div>
        <h1 className="hero__title">{slide.title}</h1>
        <p className="hero__description">{slide.description}</p>
        <button className="hero__cta">{slide.cta}</button>
      </div>

      <div className="hero__carousel">
        <button className="hero__nav hero__nav--prev" onClick={prevSlide}>
          <ChevronLeft />
        </button>

        <div className="hero__slides">
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}
            >
              <span className="hero__slide-badge">{s.badge}</span>
              <span className="hero__slide-title">{s.title}</span>
            </div>
          ))}
        </div>

        <button className="hero__nav hero__nav--next" onClick={nextSlide}>
          <ChevronRight />
        </button>

        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Team Carousel Component
function TeamCarousel() {
  const [activeRegion, setActiveRegion] = useState<keyof typeof teamMembers>("North America")
  const [currentMember, setCurrentMember] = useState(0)
  const members = teamMembers[activeRegion]

  const nextMember = () => setCurrentMember(prev => (prev + 1) % members.length)
  const prevMember = () => setCurrentMember(prev => (prev - 1 + members.length) % members.length)

  useEffect(() => {
    setCurrentMember(0)
  }, [activeRegion])

  return (
    <section className="team" id="team">
      <div className="team__header">
        <h2 className="team__title">Welcome to the studio</h2>
        <p className="team__subtitle">Meet the team making an impact for leading brands around the globe.</p>
      </div>

      <div className="team__tabs">
        {(Object.keys(teamMembers) as Array<keyof typeof teamMembers>).map(region => (
          <button
            key={region}
            className={`team__tab ${activeRegion === region ? 'team__tab--active' : ''}`}
            onClick={() => setActiveRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="team__carousel">
        <button className="team__nav team__nav--prev" onClick={prevMember}>
          <ChevronLeft />
        </button>

        <div className="team__cards">
          {members.map((member, i) => (
            <div
              key={member.name}
              className={`team__card ${i === currentMember ? 'team__card--active' : ''}`}
            >
              <div className="team__card-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team__card-content">
                <blockquote className="team__quote">"{member.quote}"</blockquote>
                <div className="team__info">
                  <h3 className="team__name">{member.name}</h3>
                  <p className="team__member-title">{member.title}</p>
                  <p className="team__office">{member.office}</p>
                </div>
                <button className="team__cta">Contact Leap Studio {member.office}</button>
              </div>
            </div>
          ))}
        </div>

        <button className="team__nav team__nav--next" onClick={nextMember}>
          <ChevronRight />
        </button>
      </div>

      <div className="team__dots">
        {members.map((_, i) => (
          <button
            key={i}
            className={`team__dot ${i === currentMember ? 'team__dot--active' : ''}`}
            onClick={() => setCurrentMember(i)}
          />
        ))}
      </div>
    </section>
  )
}

// Work Showcase Component
function WorkShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="work" id="work">
      <div className="work__header">
        <h2 className="work__title">Our work</h2>
        <p className="work__subtitle">Reinvent your business and realize exceptional experiences that win hearts and move markets.</p>
      </div>

      <div className="work__carousel">
        <button className="work__nav work__nav--left" onClick={() => scroll('left')}>
          <ChevronLeft />
        </button>

        <div className="work__scroll" ref={scrollRef}>
          {workProjects.map(project => (
            <div key={project.id} className="work__card">
              <div className="work__card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="work__card-content">
                <span className="work__client">{project.client}</span>
                <h3 className="work__card-title">{project.title}</h3>
                <p className="work__card-desc">{project.description}</p>
                {project.testimonial && (
                  <blockquote className="work__testimonial">
                    "{project.testimonial}"
                    <cite>— {project.author}</cite>
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="work__nav work__nav--right" onClick={() => scroll('right')}>
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}

// CTA Banner Component
function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__content">
        <h2 className="cta-banner__title">Let's work together</h2>
        <p className="cta-banner__text">
          Reach out to our global team to imagine, make and scale new products, services, experiences, business models, ventures and ways of working.
        </p>
        <button className="cta-banner__cta">Get in touch</button>
      </div>
    </section>
  )
}

// How We Work Section
function HowWeWork() {
  return (
    <section className="how-we-work" id="services">
      <div className="how-we-work__content">
        <h2 className="how-we-work__title">Advancing people and planet</h2>
        <p className="how-we-work__text">
          The disruptive forces of emerging technologies and sustainable objectives present a reinvention imperative for businesses—and the potential to create entirely new dimensions of value. Navigate the dual transition of the eco-digital era with innovative solutions to today's biggest challenges.
        </p>
        <button className="how-we-work__cta">Explore our services</button>
      </div>
    </section>
  )
}

// Latest Insights Component
function LatestInsights() {
  return (
    <section className="insights" id="insights">
      <div className="insights__header">
        <h2 className="insights__title">Latest insights</h2>
        <p className="insights__subtitle">
          Explore research, provocations and perspectives on trends across technology, creativity, business and culture.
        </p>
      </div>

      <div className="insights__grid">
        {insights.map((insight, i) => (
          <div key={i} className="insights__card">
            <span className="insights__type">{insight.type}</span>
            <h3 className="insights__card-title">{insight.title}</h3>
            <button className="insights__cta">
              {insight.type === 'Podcast' && <PlayIcon />}
              {insight.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

// Principles Component
function Principles() {
  return (
    <section className="principles">
      <div className="principles__grid">
        {principles.map((principle, i) => (
          <div key={i} className="principles__card">
            <span className="principles__number">0{i + 1}</span>
            <h3 className="principles__title">{principle.title}</h3>
            <p className="principles__desc">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta">
        <div className="footer__cta-item">
          <p>Ready to make your mark? As your reinvention and experience partner, our global team is here to help.</p>
          <button>Get in touch</button>
        </div>
        <div className="footer__cta-item">
          <p>Do your best work among a caring community of diverse talents.</p>
          <button>Join our team</button>
        </div>
      </div>

      <div className="footer__links">
        <div className="footer__col">
          <h4>Studios</h4>
          <ul>
            {footerLinks.studios.map(studio => <li key={studio}><a href="#">{studio}</a></li>)}
          </ul>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            {footerLinks.company.map(link => <li key={link}><a href="#">{link}</a></li>)}
          </ul>
        </div>
      </div>

      <div className="footer__legal">
        <p>© 2026 Leap Studio, part of Meridian Consulting Group</p>
        <div className="footer__legal-links">
          {footerLinks.legal.map(link => <a key={link} href="#">{link}</a>)}
        </div>
      </div>
    </footer>
  )
}

// Cookie Consent Component
function CookieConsent() {
  const [isVisible, setIsVisible] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  if (!isVisible) return null

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__content">
        <p>We use cookies to enhance your experience. By continuing, you agree to our cookie policy.</p>
        <div className="cookie-consent__actions">
          <button className="cookie-consent__accept" onClick={() => setIsVisible(false)}>Accept all</button>
          <button className="cookie-consent__settings" onClick={() => setShowSettings(!showSettings)}>Manage settings</button>
          <button className="cookie-consent__decline" onClick={() => setIsVisible(false)}>Decline all</button>
        </div>
        {showSettings && (
          <div className="cookie-consent__options">
            <label><input type="checkbox" defaultChecked /> Essential cookies</label>
            <label><input type="checkbox" defaultChecked /> Analytics</label>
            <label><input type="checkbox" /> Marketing</label>
          </div>
        )}
      </div>
    </div>
  )
}

// Main App Component
export default function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <HeroCarousel />
        <TeamCarousel />
        <WorkShowcase />
        <CTABanner />
        <HowWeWork />
        <LatestInsights />
        <Principles />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
