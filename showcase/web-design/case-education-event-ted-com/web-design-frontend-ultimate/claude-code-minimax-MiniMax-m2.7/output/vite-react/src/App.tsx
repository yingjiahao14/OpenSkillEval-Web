import { useState, useEffect } from 'react'
import { siteConfig } from './config/site'
import './style.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCookieModal, setShowCookieModal] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleCookiePreference = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowCookieModal(true)
  }

  useEffect(() => {
    const hasInteracted = localStorage.getItem('cookieConsentGiven')
    if (hasInteracted) setShowBanner(false)
  }, [])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsentGiven', 'true')
    setShowBanner(false)
  }

  return (
    <div className="app">
      <main className="container">
        {/* Hero Logo */}
        <div className="hero-logo">
          <a href="/" className="logo-link">
            <span className="logo-text">
              <span className="logo-ideaa">Idea</span>
              <span className="logo-missing">-</span>
              <span className="logo-forum">Forum</span>
            </span>
          </a>
        </div>

        {/* Error Message */}
        <div className="error-section">
          <h1 className="error-title">{siteConfig.messages.apology}</h1>
          <p className="error-suggestion">{siteConfig.messages.suggestion}</p>
        </div>

        {/* Search */}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={siteConfig.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </form>

        {/* Error Code Bar */}
        <div className="error-code-bar">
          <span className="error-code-text">{siteConfig.messages.errorCode}</span>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h2 className="next-steps-title">{siteConfig.messages.nextSteps}</h2>
          <nav className="next-steps-links">
            <a href={siteConfig.navigation.homepage.href} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              {siteConfig.navigation.homepage.text}
            </a>
            <a href={siteConfig.navigation.helpDesk.href} className="nav-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {siteConfig.navigation.helpDesk.text}
            </a>
          </nav>
        </div>
      </main>

      {/* Cookie Banner */}
      {showBanner && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <p className="cookie-message">
              {siteConfig.cookieBanner.message}
              <a href={siteConfig.cookieBanner.privacyLink.href} target="_blank" rel="noopener noreferrer" className="cookie-privacy-link">
                {siteConfig.cookieBanner.privacyLink.text}
              </a>
            </p>
            <div className="cookie-actions">
              <button className="cookie-preferences-btn" onClick={handleCookiePreference}>
                {siteConfig.cookieBanner.preferencesButton}
              </button>
              <button className="cookie-accept-btn" onClick={handleAcceptCookies}>
                Accept
              </button>
            </div>
          </div>
          <button className="cookie-close" onClick={() => setShowBanner(false)} aria-label="Close cookie banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showCookieModal && (
        <div className="modal-overlay" onClick={() => setShowCookieModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cookie Preferences</h2>
              <button className="modal-close" onClick={() => setShowCookieModal(false)} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="preference-section">
                <h3>Essential Cookies</h3>
                <p className="preference-description">Required for the website to function properly. These cannot be disabled.</p>
                <label className="preference-toggle">
                  <input type="checkbox" checked disabled />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Always Active</span>
                </label>
              </div>

              <div className="preference-section">
                <h3>Analytics Cookies</h3>
                <p className="preference-description">Help us understand how visitors interact with our website.</p>
                <label className="preference-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Enabled</span>
                </label>
              </div>

              <div className="preference-section">
                <h3>Personalization Cookies</h3>
                <p className="preference-description">Used to deliver personalized content and recommendations.</p>
                <label className="preference-toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Disabled</span>
                </label>
              </div>

              <div className="preference-section">
                <h3>Advertising Cookies</h3>
                <p className="preference-description">Used to deliver targeted advertisements.</p>
                <label className="preference-toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Disabled</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowCookieModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { handleAcceptCookies(); setShowCookieModal(false); }}>Save Preferences</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App