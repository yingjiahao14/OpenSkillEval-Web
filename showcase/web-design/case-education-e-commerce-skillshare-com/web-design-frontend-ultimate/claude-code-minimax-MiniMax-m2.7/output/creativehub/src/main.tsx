import './style.css'
import { useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

// ─── DATA ───────────────────────────────────────────────────────────────────

const categories = [
  'Featured', 'Music', 'Drawing & Painting', 'Marketing', 'Animation',
  'Social Media', 'UI/UX Design', 'Creative Writing', 'Digital Illustration',
  'Film & Video', 'Crafts', 'Freelance & Entrepreneurship', 'Graphic Design',
  'Photography', 'Productivity'
]

const courses = [
  { title: 'Kickstart your Creativity with Procreate: 20 Fun Drawings for Beginners and Beyond', instructor: 'Lisa Bardot', students: '24,872', duration: '6h 24m', category: 'Featured', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=250&fit=crop' },
  { title: 'Social Media Content Creation in Canva: From Beginner to Advanced', instructor: 'Maggie Stara', students: '44,495', duration: '13h 19m', category: 'Social Media', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop' },
  { title: 'Landscapes: A Free-Flow Watercolour Masterclass', instructor: 'Jane Davies', students: '2,579', duration: '1h 42m', category: 'Drawing & Painting', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=250&fit=crop' },
  { title: 'Figma UI UX Design Advanced: Become a Pro', instructor: 'Daniel Scott', students: '6,692', duration: '8h 48m', category: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop' },
  { title: 'ChatGPT for Creatives: AI-Powered SEO, Marketing, & Productivity', instructor: 'Peggy Dean', students: '18,842', duration: '1h 18m', category: 'Marketing', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop' },
  { title: 'How to Draw: A Beginner\'s Guide', instructor: 'Brent Eviston', students: '26,243', duration: '5h 57m', category: 'Drawing & Painting', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&h=250&fit=crop' },
  { title: 'Learn Video Editing With Premiere Pro For Beginners', instructor: 'Jordy Vandeput', students: '17,887', duration: '3h 44m', category: 'Film & Video', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop' },
  { title: 'iPhone Photography Essentials: Take Pro Photos With Your iPhone', instructor: 'Sean Dalton', students: '13,423', duration: '1h 34m', category: 'Photography', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop' },
]

const categoryPills = [
  'Graphic Design', 'Illustration', 'Animation', 'Film & Video',
  'Freelance', 'UI/UX Design', 'Productivity', 'Photography', 'Fine Art', 'Marketing'
]

const teachers = [
  { name: 'Lisa Bardot', specialty: 'Illustrator', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { name: 'Daniel Scott', specialty: 'Digital Designer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Derek Elliot', specialty: 'Animator, Product Designer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Aaron Draplin', specialty: 'Graphic Designer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Zaneena Nabeel', specialty: 'Watercolor Artist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  { name: 'Emonee LaRussa', specialty: 'Motion Graphics Artist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face' },
  { name: 'Brent Eviston', specialty: 'Master Artist', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Jordy Vandeput', specialty: 'Filmmaker and Youtuber', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face' },
]

const faqs = [
  { q: 'What is CreativeHub?', a: 'CreativeHub is an online learning community with thousands of classes for creative and curious people, on topics including illustration, design, photography, video, freelancing, and more. On CreativeHub, you\'ll find inspiration from hands-on classes and teachers at the top of their creative fields, so you can take the next step in your creative journey.' },
  { q: 'What is included in my membership?', a: 'As a CreativeHub member, you\'ll have unlimited access to all classes to watch when and where you want, plus additional features such as offline viewing, access to a vibrant community of lifelong learners, and so much more.' },
  { q: 'What can I learn?', a: 'CreativeHub has thousands of classes in everything from graphic design to cooking, productivity, filmmaking, content creation, UI/UX design, marketing, crafts, music, social media, and entrepreneurship. If it\'s something creative, you can learn it on CreativeHub.' },
  { q: 'What happens after my trial is over?', a: 'After your trial ends, your annual CreativeHub membership begins. You\'ll be billed for the year in full, so you can enjoy continuous access to creative classes year-round.' },
  { q: 'Can I teach on the platform?', a: 'Yes! CreativeHub teachers are everyday creatives and professionals who want to share their passion and the skills they\'ve gained with a community of eager learners. Visit our Help Center to learn more.' },
]

const footerLinks = {
  'Art & Illustration': ['Illustration', 'Digital Art', 'Drawing', 'Painting', 'Watercolor'],
  'Graphic Design': ['Graphic Design', 'UI/UX Design', 'Type Design', 'Surface Pattern Design', 'Motion Design'],
  'Creative Career': ['Marketing', 'Freelance', 'AI', 'Productivity', 'Social Media'],
  'Film, Video & Photography': ['Film Career', 'Video Production', 'Photography Technique', 'Photography Editing', 'Content Creation'],
  'Software': ['Procreate', 'Adobe Illustrator', 'ChatGPT', 'Blender', 'Canva'],
  'Company': ['About', 'Careers', 'Press', 'Blog'],
  'Work With Us': ['Affiliate Program', 'Partnerships'],
  'Teach With Us': ['Become a Teacher', 'Teacher Help Center'],
  'Shop': ['Gift Memberships', 'Digital Products', '1-on-1 Sessions', 'Live Sessions'],
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#55DA9B"/>
            <path d="M8 16C8 11.582 11.582 8 16 8V24C11.582 24 8 20.418 8 16Z" fill="#0D1117"/>
            <circle cx="20" cy="12" r="3" fill="#0D1117"/>
            <path d="M20 17V24" stroke="#0D1117" strokeWidth="2"/>
          </svg>
          <span>CreativeHub</span>
        </div>
        <div className="nav-links">
          <a href="#courses">Browse</a>
          <a href="#teachers">Teachers</a>
          <a href="#teams">Teams</a>
        </div>
        <div className="nav-auth">
          <a href="#" className="btn-ghost">Sign In</a>
          <a href="#hero" className="btn-primary">Start Free Trial</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const [email, setEmail] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const handleGoogleSignUp = () => {
    alert('Continue with Google — OAuth flow would initiate here')
  }

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`Sign up initiated for: ${email}`)
      setEmail('')
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-pattern"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          New classes added weekly
        </div>
        <h1 className="hero-title">Creative Classes Taught by the Best Creative Pros</h1>
        <p className="hero-subtitle">Get 7 free days of CreativeHub</p>

        <div className="hero-ctas">
          <button className="btn-google" onClick={handleGoogleSignUp}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <form className="hero-email-form" onSubmit={handleEmailSignUp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-email"
            />
            <button type="submit" className="btn-email">Continue with email</button>
          </form>
        </div>
        <p className="hero-legal">By signing up you agree to CreativeHub's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>

        <div className="category-pills">
          {categoryPills.map((cat) => (
            <button
              key={cat}
              className={`pill ${activeCategory === cat ? 'pill-active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: '📚', title: 'Thousands of creative classes.', desc: 'Beginner to pro.' },
    { icon: '🎓', title: 'Taught by creative pros and industry icons.', desc: '' },
    { icon: '🛤️', title: 'Learning Paths', desc: 'to help you achieve your goals.' },
    { icon: '🏆', title: 'Certificates', desc: 'to celebrate your accomplishments.' },
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Creative Learning Made Easy</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <p className="feature-text">
                <strong>{f.title}</strong> {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: '425k+', label: 'Members' },
    { value: '30k+', label: 'Classes' },
    { value: '9k+', label: 'Teachers' },
    { value: '4.8', label: 'App Store Rating', suffix: ' ★' },
  ]

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-value">{s.value}{s.suffix || ''}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Courses() {
  const [activeTab, setActiveTab] = useState('Featured')

  const filtered = activeTab === 'Featured'
    ? courses
    : courses.filter(c => c.category === activeTab)

  return (
    <section className="courses" id="courses">
      <div className="container">
        <h2 className="section-title">Explore Inspiring Online Courses</h2>

        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab ${activeTab === cat ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filtered.map((course, i) => (
            <div className="course-card" key={i}>
              <div className="course-thumb">
                <img src={course.image} alt={course.title} loading="lazy" />
                <div className="course-duration">{course.duration}</div>
              </div>
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">{course.instructor}</p>
                <div className="course-meta">
                  <span className="students">👥 {course.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CreativeFeed() {
  const feeds = [
    { icon: '💡', title: 'Stay Inspired', desc: 'Discover trending topics, get quick answers, and find your people.' },
    { icon: '🤝', title: 'Stay Connected', desc: 'Follow your peers and teachers, exchange perspectives, and share some love.' },
    { icon: '🎨', title: 'Keep Creating', desc: 'Explore new ideas for your next project, post your work, and get feedback.' },
  ]

  return (
    <section className="creative-feed">
      <div className="container">
        <h2 className="section-title">Explore Your Creative Feed</h2>
        <div className="feed-grid">
          {feeds.map((f, i) => (
            <div className="feed-card" key={i}>
              <div className="feed-icon">{f.icon}</div>
              <h3 className="feed-title">{f.title}</h3>
              <p className="feed-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Teachers() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    el?.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      el?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="teachers" id="teachers">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Learn from Creative Experts</h2>
            <p className="section-subtitle">CreativeHub teachers are industry leaders excited to share their tools, techniques, and professional journeys with you.</p>
          </div>
          <div className="carousel-controls">
            <button
              className={`carousel-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              className={`carousel-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="teachers-scroll" ref={scrollRef}>
          {teachers.map((t, i) => (
            <div className="teacher-card" key={i}>
              <div className="teacher-avatar">
                <img src={t.avatar} alt={t.name} />
              </div>
              <h3 className="teacher-name">{t.name}</h3>
              <p className="teacher-specialty">{t.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    { quote: 'CreativeHub was the best learning decision I\'ve ever made… Real-world skills without the financial burden of traditional school.', name: 'Rachel R.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
    { quote: 'I love that CreativeHub is a platform where I can find other creatives and we can support each other on our learning journey.', name: 'Elli V.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    { quote: 'It\'s rare that I subscribe for anything, but this is one subscription I can\'t imagine not having.', name: 'Katrina', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
    { quote: 'CreativeHub helps me level up my skills, while also letting me explore… teachers bring vibrant personalities and valuable insights.', name: 'Savonne M.', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face' },
  ]

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Why Students Love CreativeHub</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="quote-mark">"</div>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="author-avatar" />
                <span className="author-name">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Teams() {
  return (
    <section className="teams" id="teams">
      <div className="container">
        <div className="teams-card">
          <div className="teams-content">
            <h2 className="teams-title">CreativeHub for Teams</h2>
            <p className="teams-desc">Set your team up for success with reimagined learning to empower their personal and professional growth. With inspiring classes on soft skills, business essentials, well-being and more, your whole team will have deep knowledge and expertise at their fingertips.</p>
            <a href="#" className="btn-teams">Learn More</a>
          </div>
          <div className="teams-visual">
            <div className="teams-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'faq-open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#55DA9B"/>
                <path d="M8 16C8 11.582 11.582 8 16 8V24C11.582 24 8 20.418 8 16Z" fill="#0D1117"/>
                <circle cx="20" cy="12" r="3" fill="#0D1117"/>
                <path d="M20 17V24" stroke="#0D1117" strokeWidth="2"/>
              </svg>
              <span>CreativeHub</span>
            </div>
          </div>
          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="footer-link-group">
                <h4 className="footer-group-title">{group}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">All memberships billed automatically on a recurring basis until canceled. Cancel before trial ends to avoid being charged. Offer valid for new paid subscribers only.</p>
          <p className="footer-copy">© 2026 CreativeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Courses />
        <CreativeFeed />
        <Teachers />
        <Testimonials />
        <Teams />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ''
const root = document.createElement('div')
document.querySelector<HTMLDivElement>('#app')!.appendChild(root)

createRoot(root).render(<App />)
