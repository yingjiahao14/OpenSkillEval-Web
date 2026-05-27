import React, { useState, useEffect } from 'react'
import { siteConfig } from './config/site'
import { cn } from './lib/utils'

// Icons
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
const RecordingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>

// Cookie Consent Banner
const CookieConsent: React.FC<{ onAccept: () => void, onReject: () => void, onManage: () => void }> = ({ onAccept, onReject, onManage }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-600 text-center md:text-left flex-1">
        We use cookies to improve your experience and analyze site traffic. By clicking "Accept All", you consent to our use of cookies.
      </p>
      <div className="flex flex-wrap gap-2">
        <button onClick={onManage} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Manage preferences</button>
        <button onClick={onReject} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">Reject all</button>
        <button onClick={onAccept} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Accept all</button>
      </div>
    </div>
  </div>
)

// Cookie Preferences Modal
const CookiePreferencesModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState({
    necessary: true,
    functional: false,
    performance: false,
    targeting: false
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Cookie Preferences</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon /></button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Necessary</p>
              <p className="text-sm text-gray-500">Essential for the website to function properly</p>
            </div>
            <input type="checkbox" checked={categories.necessary} disabled className="w-5 h-5 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Functional</p>
              <p className="text-sm text-gray-500">Enable enhanced functionality and personalization</p>
            </div>
            <input type="checkbox" checked={categories.functional} onChange={(e) => setCategories({ ...categories, functional: e.target.checked })} className="w-5 h-5 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Performance</p>
              <p className="text-sm text-gray-500">Help us understand how visitors interact with our website</p>
            </div>
            <input type="checkbox" checked={categories.performance} onChange={(e) => setCategories({ ...categories, performance: e.target.checked })} className="w-5 h-5 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Targeting</p>
              <p className="text-sm text-gray-500">Used to deliver relevant ads and marketing</p>
            </div>
            <input type="checkbox" checked={categories.targeting} onChange={(e) => setCategories({ ...categories, targeting: e.target.checked })} className="w-5 h-5 text-blue-600 rounded" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Save preferences</button>
        </div>
      </div>
    </div>
  )
}

// Navigation
const Navigation: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/index.html" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ClipCast</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/enterprise.html" className={cn("text-sm font-medium transition-colors", currentPage === 'enterprise' ? "text-blue-600" : "text-gray-600 hover:text-gray-900")}>Enterprise</a>
              <a href="/pricing.html" className={cn("text-sm font-medium transition-colors", currentPage === 'pricing' ? "text-blue-600" : "text-gray-600 hover:text-gray-900")}>Pricing</a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="/login.html" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</a>
            <a href="/signup.html" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Get Started for free</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600">
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <a href="/enterprise.html" className="text-sm font-medium text-gray-600 hover:text-gray-900">Enterprise</a>
              <a href="/pricing.html" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/login.html" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</a>
              <a href="/signup.html" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center">Get Started for free</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Footer
const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">App</h4>
          <ul className="space-y-2">
            {siteConfig.footerNav.app.map((item, i) => (
              <li key={i}><a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Solutions</h4>
          <ul className="space-y-2">
            {siteConfig.footerNav.solutions.map((item, i) => (
              <li key={i}><a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">For Business</h4>
          <ul className="space-y-2">
            {siteConfig.footerNav.forBusiness.map((item, i) => (
              <li key={i}><a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Downloads</h4>
          <ul className="space-y-2">
            {siteConfig.footerNav.downloads.map((item, i) => (
              <li key={i}><a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
          <ul className="space-y-2">
            {siteConfig.footerNav.resources.map((item, i) => (
              <li key={i}><a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-2">
            {siteConfig.footerNav.company.map((item, i) => (
              <li key={i}><a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <span className="text-lg font-bold text-gray-900">ClipCast</span>
        </div>
        <p className="text-sm text-gray-500">© 2026 ClipCast. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

// Logo Bar
const LogoBar: React.FC = () => (
  <section className="py-8 bg-gray-50 border-y border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-gray-500 mb-6">{siteConfig.socialProof.text}</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {siteConfig.socialProof.logos.map((logo, i) => (
          <span key={i} className="text-gray-400 font-semibold text-lg">{logo}</span>
        ))}
      </div>
    </div>
  </section>
)

// Hero Section
const Hero: React.FC = () => (
  <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        {siteConfig.hero.title}
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        {siteConfig.hero.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={siteConfig.hero.cta.href} className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/25">
          {siteConfig.hero.cta.text}
        </a>
        <a href={siteConfig.hero.secondaryCta.href} className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-colors flex items-center justify-center gap-2">
          <span className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/></svg>
          </span>
          {siteConfig.hero.secondaryCta.text}
        </a>
      </div>
    </div>
  </section>
)

// Feature Highlight (AI Bug Reports)
const FeatureHighlight: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full mb-4">{siteConfig.features.aiBugReports.label}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{siteConfig.features.aiBugReports.title}</h2>
        <p className="text-lg text-gray-600">{siteConfig.features.aiBugReports.description}</p>
        <a href={siteConfig.features.aiBugReports.cta.href} className="inline-block mt-6 text-blue-600 hover:text-blue-700 font-medium">
          {siteConfig.features.aiBugReports.cta.text} →
        </a>
      </div>
      <div className="bg-gray-900 rounded-2xl p-8 md:p-12 flex items-center justify-center">
        <div className="bg-gray-800 rounded-xl w-full max-w-2xl aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600/20 flex items-center justify-center">
              <PlayIcon />
              <span className="text-blue-400 ml-1">Play</span>
            </div>
            <p className="text-gray-400">Video preview would play here</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// Screen Recorder Feature
const ScreenRecorder: React.FC = () => (
  <section className="py-16 md:py-24 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{siteConfig.features.screenRecorder.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{siteConfig.features.screenRecorder.subtitle}</p>
          <p className="text-gray-600 mb-6">{siteConfig.features.screenRecorder.description}</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <span>↓</span> {siteConfig.features.screenRecorder.cta.text}
          </a>
        </div>
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <RecordingIcon />
                  <span className="sr-only">Record</span>
                </div>
                <p className="text-gray-500">Screen Recording Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// Video Editor Feature
const VideoEditor: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{siteConfig.features.videoEditor.title}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {siteConfig.features.videoEditor.points.map((point, i) => (
          <div key={i} className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
              {i === 0 ? <VideoIcon /> : i === 1 ? <GlobeIcon /> : <ChartIcon />}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{point.title}</h3>
            <p className="text-gray-600">{point.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// Integrations Section
const Integrations: React.FC = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Integrates with your workflow</h2>
      <p className="text-lg text-gray-600 mb-12">From Google Workspace to Slack, ClipCast videos seamlessly integrate with hundreds of tools you use every day.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        {['Google Workspace', 'Slack', 'Jira', 'Notion', 'HubSpot', 'Salesforce', 'Asana', 'Trello'].map((tool, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="font-medium text-gray-900">{tool}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// Engagement Section
const Engagement: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">AK</div>
                <div><p className="font-medium text-gray-900">Alex K.</p><p className="text-sm text-gray-500">2 hours ago</p></div>
              </div>
              <p className="text-gray-700 mb-4">This is exactly what I needed! Great explanation 🔥</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">👍 12</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">💬 3 replies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Engage and connect with video</h2>
          <p className="text-lg text-gray-600 mb-6">Easily collaborate by adding emojis, comments, tasks and CTAs to your video message. Empower remote teams to communicate better across timezones.</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3"><span className="text-green-500">✓</span> <span className="text-gray-700">Transcripts and captions in 50+ languages</span></li>
            <li className="flex items-center gap-3"><span className="text-green-500">✓</span> <span className="text-gray-700">Emoji reactions and comments</span></li>
            <li className="flex items-center gap-3"><span className="text-green-500">✓</span> <span className="text-gray-700">Task assignments and CTAs</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
)

// Security Section
const Security: React.FC = () => (
  <section className="py-16 md:py-24 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{siteConfig.security.title}</h2>
          <p className="text-lg text-gray-300 mb-6">{siteConfig.security.description}</p>
          <a href={siteConfig.security.cta.href} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
            {siteConfig.security.cta.text} →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {siteConfig.security.features.map((feature, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-4">
              <div className="w-10 h-10 mb-3 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <ShieldIcon />
              </div>
              <p className="text-sm text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

// Use Cases Section
const UseCases: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video messaging for all use cases</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {siteConfig.useCases.map((useCase, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
              {i === 0 ? <UsersIcon /> : i === 1 ? <PuzzleIcon /> : i === 2 ? <ChartIcon /> : <SparklesIcon />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
            <p className="text-gray-600 text-sm">{useCase.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
          See all use cases <span>→</span>
        </a>
      </div>
    </div>
  </section>
)

// Features Grid
const FeaturesGrid: React.FC = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful features for easy, custom recordings</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {siteConfig.featuresGrid.map((feature, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
              {i % 3 === 0 ? <RecordingIcon /> : i % 3 === 1 ? <VideoIcon /> : <ChartIcon />}
            </div>
            <p className="font-medium text-gray-900">{feature.title}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">See all features →</a>
      </div>
    </div>
  </section>
)

// Blog Section
const Blog: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">From the blog</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {siteConfig.blogPosts.map((post, i) => (
          <article key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.desc}</p>
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Read more →</a>
          </article>
        ))}
      </div>
    </div>
  </section>
)

// Enterprise CTA Block
const EnterpriseCTA: React.FC = () => (
  <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">ClipCast for Enterprise</h2>
      <p className="text-xl text-blue-100 mb-6">ClipCast for Enterprise helps teams securely manage and organize async video communication at scale</p>
      <a href="/enterprise.html" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-blue-600 bg-white hover:bg-blue-50 rounded-xl transition-colors">
        Learn more →
      </a>
    </div>
  </section>
)

// Testimonials
const Testimonials: React.FC = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by teams worldwide</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {siteConfig.testimonials.slice(0, 3).map((testimonial, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-blue-500 mb-4"><QuoteIcon /></div>
            <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// CTA Banner
const CTABanner: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ClipCast powers great campaigns.</h2>
      <p className="text-lg text-gray-600 mb-6">For Mac, Windows, iOS, and Android</p>
      <a href="/signup.html" className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/25">
        Get ClipCast for free
      </a>
    </div>
  </section>
)

// Home Page
const HomePage: React.FC = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true)
  const [showCookieModal, setShowCookieModal] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (consent) setShowCookieBanner(false)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowCookieBanner(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="home" />
      <main className="flex-1">
        <Hero />
        <LogoBar />
        <FeatureHighlight />
        <ScreenRecorder />
        <VideoEditor />
        <Integrations />
        <Engagement />
        <Security />
        <UseCases />
        <FeaturesGrid />
        <Blog />
        <EnterpriseCTA />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      {showCookieBanner && (
        <CookieConsent
          onAccept={handleAccept}
          onReject={handleReject}
          onManage={() => setShowCookieModal(true)}
        />
      )}
      <CookiePreferencesModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />
    </div>
  )
}

// Enterprise Page
const EnterprisePage: React.FC = () => {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="enterprise" />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">ClipCast for Enterprise</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Scale async video communication across your organization with enterprise-grade security, compliance, and analytics.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup.html" className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">Get started for free</a>
              <a href="#contact" className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-colors">Contact Sales</a>
            </div>
          </div>
        </section>

        <LogoBar />

        {/* Async Video Benefits */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Communicate faster with async video</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl">⏰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Save time</h3>
                <p className="text-gray-600">Teams can communicate more efficiently without typing long emails, scheduling meetings, or trying to work across time zones.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Communicate clearly</h3>
                <p className="text-gray-600">Async video captures context, tone, and personality in detail. Distributed teams can preserve the true meaning of their message.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Deepen culture</h3>
                <p className="text-gray-600">Make it effortless for anyone in your organization to share ideas, introduce themselves, and build community with fellow teammates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Visibility */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Drive community and visibility at scale</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center"><ChartIcon /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scale knowledge with video</h3>
                <p className="text-gray-600">Connect pockets of institutional knowledge by making video messages searchable and discoverable.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center"><UsersIcon /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create a culture of sharing</h3>
                <p className="text-gray-600">Video messaging encourages your team to share early and often so projects are visible and driven to completion quicker.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-lg bg-blue-100 flex items-center justify-center"><GlobeIcon /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Build community at scale</h3>
                <p className="text-gray-600">Magnify people's voices so the whole company can feel connected and heard beyond the boundaries of their team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-blue-500 mb-6"><QuoteIcon /></div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
              "ClipCast allows me to connect more personally with people without having to do 75 different one-on-one calls, which is just impossible at scale."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">KB</div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Katie Burke</p>
                <p className="text-gray-500">Chief People Officer, HubSpot</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-grade security</h2>
              <p className="text-lg text-gray-300">Keep your data and your customer's data private and secure.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {siteConfig.security.features.map((feature, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6">
                  <div className="w-10 h-10 mb-4 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <p className="text-sm text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {siteConfig.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Works with your tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {['Google Workspace', 'Slack', 'Jira', 'Salesforce', 'Notion', 'HubSpot', 'Asana', 'Microsoft'].map((tool, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="font-medium text-gray-900">{tool}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24 bg-white" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Enterprise pricing</h2>
              <p className="text-lg text-gray-600">Custom pricing for teams of 50+</p>
            </div>
            <div className="max-w-xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckIcon /> <span>Everything in Business + AI</span></li>
                  <li className="flex items-center gap-2"><CheckIcon /> <span>Advanced security (SSO, SCIM)</span></li>
                  <li className="flex items-center gap-2"><CheckIcon /> <span>Salesforce integration</span></li>
                  <li className="flex items-center gap-2"><CheckIcon /> <span>99.95% uptime SLA</span></li>
                  <li className="flex items-center gap-2"><CheckIcon /> <span>Admin insights</span></li>
                  <li className="flex items-center gap-2"><CheckIcon /> <span>Dedicated account manager</span></li>
                </ul>
                <a href="/signup.html" className="block w-full py-3 text-center font-semibold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to improve how your team communicates?</h2>
            <a href="/signup.html" className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
              Contact Sales
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// Pricing Page
const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true)
  const [teamSize, setTeamSize] = useState(10)
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const getPrice = (monthlyPrice: number | null) => {
    if (monthlyPrice === null) return null
    return isAnnual ? Math.round(monthlyPrice * 0.83) : monthlyPrice
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage="pricing" />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{siteConfig.pricing.title}</h1>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={cn("text-sm font-medium", !isAnnual ? "text-gray-900" : "text-gray-500")}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors"
              >
                <span className={cn("absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform", isAnnual && "translate-x-7")} />
              </button>
              <span className={cn("text-sm font-medium", isAnnual ? "text-gray-900" : "text-gray-500")}>
                Annual <span className="text-orange-600 font-semibold">{siteConfig.pricing.billingNote}</span>
              </span>
            </div>

            {/* Team Size Slider */}
            <div className="max-w-md mx-auto mt-8">
              <label className="text-sm text-gray-600 mb-2 block">Team size: {teamSize} users</label>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>50</span>
                <span>100+</span>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6">
              {siteConfig.pricing.plans.map((plan, i) => {
                const price = getPrice(plan.price)
                return (
                  <div key={i} className={cn(
                    "rounded-2xl p-6 border-2",
                    plan.label === "MOST POPULAR" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                  )}>
                    {plan.label && (
                      <span className={cn(
                        "inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3",
                        plan.label === "MOST POPULAR" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                      )}>
                        {plan.label}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      {price !== null ? (
                        <>
                          <span className="text-4xl font-bold text-gray-900">${price}</span>
                          <span className="text-gray-500">/user/month</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900">Custom</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-6">{plan.highlight}</p>
                    <a
                      href={plan.href}
                      className={cn(
                        "block w-full py-3 text-center font-semibold rounded-xl transition-colors",
                        plan.label === "MOST POPULAR"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      )}
                    >
                      {plan.cta}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">{siteConfig.aiFeatures.title}</h2>
              <p className="text-xl text-blue-100 mb-8">{siteConfig.aiFeatures.subtitle}</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {siteConfig.aiFeatures.features.map((feature, i) => (
                  <span key={i} className="px-4 py-2 bg-white/20 rounded-full text-sm">{feature}</span>
                ))}
              </div>
              <a href={siteConfig.aiFeatures.cta.href} className="inline-flex items-center gap-2 px-8 py-4 font-semibold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                {siteConfig.aiFeatures.cta.text}
              </a>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Compare plans</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                    {siteConfig.comparisonTable.headers.slice(1).map((header, i) => (
                      <th key={i} className="text-center py-4 px-4 font-semibold text-gray-900">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteConfig.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                      {row.slice(1).map((cell, j) => (
                        <td key={j} className="py-3 px-4 text-center text-gray-600">
                          {cell === "Included" ? <span className="text-green-500">✓</span> : cell === "—" ? <span className="text-gray-400">—</span> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {siteConfig.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-gray-900">{item.q}</span>
                    {openFaq === i ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-gray-600">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <LogoBar />

        {/* CTA Banner */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start recording today</h2>
            <p className="text-lg text-gray-600 mb-6">14-day free trial. No credit card required.</p>
            <a href="/signup.html" className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
              Try for free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// Login Page
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/index.html" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ClipCast</span>
          </a>
        </div>
      </header>
      <main className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">Log in to ClipCast</h1>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              {[
                { name: "Google", icon: "G" },
                { name: "Slack", icon: "S" },
                { name: "Apple", icon: "A" },
                { name: "Outlook", icon: "O" },
              ].map((provider) => (
                <button key={provider.name} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">{provider.icon}</span>
                  <span className="font-medium text-gray-700">Continue with {provider.name}</span>
                </button>
              ))}
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">SSO</span>
                <span className="font-medium text-gray-700">Continue with SSO</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Email Login */}
            <form onSubmit={(e) => { e.preventDefault(); alert(`Login with ${email}`) }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Continue
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              By signing up, you acknowledge that you have read and understood, and agree to ClipCast's <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account? <a href="/signup.html" className="text-blue-600 hover:underline font-medium">Sign up for free</a>
          </p>
        </div>
      </main>
    </div>
  )
}

// Signup Page
const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/index.html" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ClipCast</span>
          </a>
          <a href="/login.html" className="text-sm font-medium text-gray-600 hover:text-gray-900">Log in</a>
        </div>
      </header>
      <main className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Record your first ClipCast video in seconds</h1>
            <p className="text-gray-600 mb-8">Start free. No credit card required.</p>

            {/* Social Signup */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">G</span>
                <span className="font-medium text-gray-700">Sign up with Google</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Email Signup */}
            <form onSubmit={(e) => { e.preventDefault(); alert(`Signup with ${email}`) }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Continue
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              By signing up, I accept the <a href="#" className="text-blue-600 hover:underline">ClipCast Cloud Terms of Service</a> and acknowledge the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>

          {/* Testimonial Sidebar */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Join 400,000+ companies</h3>
                <p className="text-gray-600">Millions of people use ClipCast to communicate faster</p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 italic mb-3">"ClipCast enables us to maximize our impact as a distributed company by helping us collaborate and share ideas more easily."</p>
                  <p className="text-sm font-medium text-gray-900">Andrew Reynolds, Design Lead at MetaLab</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 italic mb-3">"I think it's the plug-and-play, intuitive, frictionless nature of ClipCast that allows us to create personalized videos so quickly."</p>
                  <p className="text-sm font-medium text-gray-900">Bucky Henry, Sales Manager at Intercom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Router
const App: React.FC = () => {
  const path = window.location.pathname
  const filename = path.split('/').pop() || 'index.html'

  switch (filename) {
    case 'enterprise.html':
      return <EnterprisePage />
    case 'pricing.html':
      return <PricingPage />
    case 'login.html':
      return <LoginPage />
    case 'signup.html':
      return <SignupPage />
    default:
      return <HomePage />
  }
}

export default App