import { useState } from 'react'
import { Search, User, Menu, X } from 'lucide-react'

interface HeaderProps {
  currentPage: string
  navigate: (page: 'home' | 'courses' | 'projects' | 'plus' | 'login') => void
}

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [showBanner, setShowBanner] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('courses')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Countdown Banner */}
      {showBanner && (
        <div className="bg-[#171717] text-white py-2 px-4 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">🔥</span>
            <span>This price won't last long...</span>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span>Ends in:</span>
            <CountdownTimer />
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white/60 hover:text-white ml-4"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-8 h-8 bg-[#F02D00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-[#171717]">CreativeHub</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate('courses')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'courses' ? 'text-[#F02D00]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => navigate('projects')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'projects' ? 'text-[#F02D00]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => navigate('plus')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'plus' ? 'text-[#F02D00]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Plus
              </button>
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F02D00] focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => navigate('login')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate('plus')}
                  className="btn-primary text-sm px-5 py-2"
                >
                  Join for Free
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="px-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F02D00]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </form>
              <nav className="space-y-2">
                <button
                  onClick={() => { navigate('courses'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
                >
                  Courses
                </button>
                <button
                  onClick={() => { navigate('projects'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
                >
                  Projects
                </button>
                <button
                  onClick={() => { navigate('plus'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
                >
                  Plus
                </button>
              </nav>
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <button
                  onClick={() => { navigate('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-gray-600 hover:text-gray-900 text-left"
                >
                  Log in
                </button>
                <button
                  onClick={() => { navigate('plus'); setMobileMenuOpen(false); }}
                  className="btn-primary w-full"
                >
                  Join for Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 })

  // Simple countdown effect
  useState(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 23
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div className="flex gap-1">
      <span className="bg-white/20 px-2 py-1 rounded">{String(time.hours).padStart(2, '0')}</span>
      <span>:</span>
      <span className="bg-white/20 px-2 py-1 rounded">{String(time.minutes).padStart(2, '0')}</span>
      <span>:</span>
      <span className="bg-white/20 px-2 py-1 rounded">{String(time.seconds).padStart(2, '0')}</span>
    </div>
  )
}