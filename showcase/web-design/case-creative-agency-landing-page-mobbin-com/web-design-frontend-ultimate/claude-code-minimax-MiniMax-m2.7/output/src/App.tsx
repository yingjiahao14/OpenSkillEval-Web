import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, Grid3X3, Play, MessageSquare, Copy, Bookmark, ChevronRight, Award, LogIn, Menu, X } from 'lucide-react'

const categories = ["Profile", "Wallet", "Welcome", "Account Setup", "Home", "Subscription & Paywall", "Login", "Settings", "Checkout", "Collections"]

const tabs = [
  { id: 'screens', label: 'Screens', icon: Grid3X3 },
  { id: 'ui-elements', label: 'UI Elements', icon: Grid3X3 },
  { id: 'flows', label: 'Flows', icon: Play },
  { id: 'text', label: 'Text in Screenshot', icon: Search },
]

const tools = [
  { icon: Copy, title: 'Copy to Figma', desc: 'Download designs you like or copy them straight into Figma with our new Figma plugin.' },
  { icon: Bookmark, title: 'Save to collections', desc: 'Collect your favorite designs and upload your own screenshots into one place.' },
  { icon: MessageSquare, title: 'Leave comments', desc: 'Take notes upon saving so you\'ll never forget the context in the future.' },
]

const testimonials = [
  { name: 'Sebastian Speier', company: 'Shop', text: 'ScreenVault is a great resource and it always comes in handy to see what the best practices or standards are for mobile patterns in our current landscape.' },
  { name: 'Meng To', company: 'DesignCode', text: 'ScreenVault is a game-changer for designers looking to step up their understanding of UX and UI design patterns. It\'s so massive, meticulously organized, has deep user flows and even a Figma plugin!' },
  { name: 'Marco Cornacchia', company: 'Figma', text: 'ScreenVault is one of my favorite resources for product design and UI inspo. I love having access to a ton of \'real world examples\'.' },
  { name: 'Daryl Ginn', company: 'Endless', text: 'ScreenVault has quickly become our favourite inspiration resource for designing mobile apps at endless.design, their advanced filtering is unmatched.' },
  { name: 'Rachel How', company: '', text: 'ScreenVault is my go-to reference for app & web design. Apart from saving countless hours, it gives me insights on design patterns, copywriting, and user flows.' },
  { name: 'Haerin Song', company: 'Visa', text: 'By using the ScreenVault app, I save both my research time and space in my photo galleries. I love how easy it is to search for different patterns.' },
]

const brands = ['Coinbase', 'Wise', 'Headspace', 'Airbnb', 'Uber', 'Nike', 'Pinterest', 'ChatGPT', 'Shopify', 'Loom', 'Mailchimp', 'Twitch', 'Spotify', 'Apple TV', 'Notion', 'Dropbox']

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MarqueeRow({ children, direction = 'left', speed = 30 }: { children: React.ReactNode; direction?: 'left' | 'right'; speed?: number }) {
  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
        transition={{ x: { repeat: Infinity, duration: speed, ease: 'linear' } }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('screens')
  const [activeCategory, setActiveCategory] = useState('Profile')
  const [flowMode, setFlowMode] = useState<'videos' | 'prototype'>('videos')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      {/* Announcement Bar */}
      <div className="bg-[#141414] text-white py-2.5 px-4 text-center text-sm">
        <span className="inline-flex items-center gap-2">
          <Award className="w-4 h-4" />
          2025 ScreenVault Awards — Celebrating the best on the internet.
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="text-xl font-bold tracking-tight">ScreenVault</a>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <a href="#awards" className="text-gray-600 hover:text-gray-900 transition-colors">Awards</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="#login" className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <LogIn className="w-4 h-4" />
                Log in
              </a>
              <a href="#signup" className="bg-[#141414] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Join for free
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-4 space-y-3">
                <a href="#pricing" className="block py-2 text-gray-600">Pricing</a>
                <a href="#awards" className="block py-2 text-gray-600">Awards</a>
                <a href="#login" className="block py-2 text-gray-600">Log in</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Discover real-world<br className="hidden sm:block" /> design inspiration.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Featuring over 1,000 iOS & Web apps, and 200 sites — New content weekly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#signup" className="w-full sm:w-auto bg-[#141414] text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Join for free
            </a>
            <a href="#pricing" className="w-full sm:w-auto text-[#141414] px-8 py-3.5 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition-colors">
              See our plans
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by design teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {['Shopify', 'Figma', 'Airbnb', 'Spotify', 'Notion', 'Linear', 'Stripe', 'Vercel'].map((brand) => (
              <span key={brand} className="text-lg font-semibold text-gray-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">A growing library of:</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              { value: 1150, suffix: '', label: 'apps' },
              { value: 615900, suffix: '', label: 'screens' },
              { value: 329200, suffix: '', label: 'flows' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-bold tracking-tight mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Search */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find design patterns in seconds.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search across our library of 400,000+ screenshots with powerful filters and categories.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#141414] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="aspect-[9/16] sm:aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Grid3X3 className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Flows */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore entire user journeys with flows.</h2>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setFlowMode('videos')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  flowMode === 'videos' ? 'bg-white shadow-sm text-[#141414]' : 'text-gray-600'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setFlowMode('prototype')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  flowMode === 'prototype' ? 'bg-white shadow-sm text-[#141414]' : 'text-gray-600'
                }`}
              >
                Prototype mode
              </button>
            </div>
          </div>

          {/* Flow Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={flowMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              {flowMode === 'videos' ? (
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-[#141414] ml-1" />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-48 aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-gray-600 mt-6 max-w-xl mx-auto">
            {flowMode === 'videos'
              ? 'Experience flows the way they were meant to be experienced, complete with transitions, micro-interactions, and animations.'
              : 'Walk through flows, step by step, by using the interactive hotspots at your own preferred pace.'}
          </p>
        </div>
      </section>

      {/* Features - Tools */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">From inspiration to creation.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 overflow-hidden">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What our users are saying.</h2>
        </div>

        {/* Row 1 - Left to Right */}
        <div className="mb-4">
          <MarqueeRow direction="left" speed={40}>
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mx-4">
                <p className="text-gray-700 text-sm mb-4 line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </MarqueeRow>
        </div>

        {/* Row 2 - Right to Left */}
        <div>
          <MarqueeRow direction="right" speed={45}>
            {testimonials.slice(3, 6).map((t, i) => (
              <div key={i} className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mx-4">
                <p className="text-gray-700 text-sm mb-4 line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </MarqueeRow>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#141414] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Never run out of inspiration again.</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Use ScreenVault for free as long as you like or get full access with any of our paid plans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#signup" className="w-full sm:w-auto bg-white text-[#141414] px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Join for free
            </a>
            <a href="#pricing" className="w-full sm:w-auto text-white px-8 py-3.5 rounded-full font-medium border border-gray-700 hover:border-gray-600 transition-colors">
              See our plans
            </a>
          </div>

          {/* App Icon Marquee */}
          <div className="space-y-4">
            <MarqueeRow direction="left" speed={25}>
              {brands.slice(0, 8).map((brand) => (
                <div key={brand} className="flex-shrink-0 w-24 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-300">{brand}</span>
                </div>
              ))}
            </MarqueeRow>
            <MarqueeRow direction="right" speed={30}>
              {brands.slice(8, 16).map((brand) => (
                <div key={brand} className="flex-shrink-0 w-24 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-300">{brand}</span>
                </div>
              ))}
            </MarqueeRow>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="text-xl font-bold mb-4">ScreenVault</p>
              <p className="text-gray-500 text-sm">Design better digital experiences with ScreenVault.</p>
            </div>
            <div>
              <p className="font-semibold mb-4">Explore</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Glossary</a></li>
                <li><a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Colors</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Contact</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Merch</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Social</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">X (Twitter)</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© ScreenVault 2018–2026. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
