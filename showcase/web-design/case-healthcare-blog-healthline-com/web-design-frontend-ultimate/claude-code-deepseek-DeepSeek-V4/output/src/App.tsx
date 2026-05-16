import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, ChevronDown, ChevronRight, ChevronLeft,
  ArrowRight, Play, Heart, Activity, Brain,
  Apple, Dumbbell, Moon, Pill, Stethoscope, Users, Shield,
  Clock, Award, BookOpen, Globe, Sparkles, Check,
} from 'lucide-react';

/* Inline SVG social icons */
function FacebookIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function XIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function InstagramIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function YoutubeIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}
function PinterestIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>;
}

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */

const NAV_ITEMS = [
  {
    label: 'Health Conditions',
    sections: [
      { title: 'Conditions A–K', links: ['Breast Cancer', 'Chronic Kidney Disease', 'COPD', 'Digestive Health', 'Eye Health', 'Heart Health'] },
      { title: 'Conditions L–Z', links: ['Menopause', 'Mental Health', 'Migraine', 'Multiple Sclerosis', "Parkinson's Disease", 'Psoriasis', 'Rheumatoid Arthritis', 'Sleep Health', 'Type 2 Diabetes', 'Weight Management'] },
      { title: 'Featured', links: ['Health News', 'Top Reads', 'Video Series'], featured: true },
    ],
  },
  {
    label: 'Wellness',
    sections: [
      { title: 'Lifestyle', links: ['CBD', 'Fitness', 'Healthy Aging', 'Hearing', 'Mental Well-Being', 'Nutrition', 'Parenthood'] },
      { title: 'Self-Care', links: ['Recipes', 'Sexual Health', 'Skin Care', 'Sleep Health', 'Vitamins and Supplements', "Women's Wellness"] },
      { title: 'More', links: ['Product Reviews', 'Featured Programs'], featured: true },
    ],
  },
  {
    label: 'Tools',
    sections: [
      { title: 'Drug & Care', links: ['Pill Identifier', 'FindCare', 'Drugs A–Z', 'Medicare Plans by State'] },
      { title: 'Resources', links: ['Lessons', 'Newsletters', 'Lifestyle Quizzes'] },
    ],
  },
  { label: 'Featured' },
  { label: 'Connect' },
];

const CREDIBILITY_STATS = [
  { icon: Shield, text: 'Medically reviewed content' },
  { icon: Users, text: '145 medical reviewers in network' },
  { icon: Clock, text: '21 years of experience' },
  { icon: Award, text: '55 million monthly readers' },
];

const TRENDING_ARTICLES = [
  { category: 'Heart Health', title: 'How to Make a Heart-Healthy Grocery List' },
  { category: 'Wellness', title: 'The Worst U.S. Cities for Spring Allergies in 2026, Ranked' },
  { category: 'Lifestyle', title: 'Can You Run a Marathon … with POTS?' },
  { category: 'Products', title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us' },
];

const HEALTH_TOPICS = [
  { label: 'Anxiety & Depression', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { label: 'Digestive Health', icon: Activity, color: 'bg-green-100 text-green-600' },
  { label: 'Heart Health', icon: Heart, color: 'bg-red-100 text-red-500' },
  { label: 'Menopause', icon: Moon, color: 'bg-indigo-100 text-indigo-500' },
  { label: 'Type 2 Diabetes', icon: Apple, color: 'bg-amber-100 text-amber-600' },
  { label: 'Weight Management', icon: Dumbbell, color: 'bg-teal-100 text-teal-600' },
  { label: 'Skin Care', icon: Sparkles, color: 'bg-pink-100 text-pink-500' },
  { label: 'Sleep Health', icon: Moon, color: 'bg-blue-100 text-blue-600' },
];

const RECOMMENDED_TABS = ['Top Reads', 'Fitness', 'Mental Well-Being', 'Product Reviews', 'Recipes', 'Skin Care'];

const RECOMMENDED_ARTICLES: Record<string, { title: string; category: string; image: string }[]> = {
  'Top Reads': [
    { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', image: '' },
    { title: 'Does Ozempic Cause Hair Loss?', category: 'Medication', image: '' },
    { title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds', category: 'News', image: '' },
    { title: 'Can Music Therapy Help with Depression?', category: 'Mental Health', image: '' },
    { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', image: '' },
    { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Review', image: '' },
  ],
  'Fitness': [
    { title: 'Day 12: Resistance Band Moves You Can Do in 10 Minutes', category: 'Fitness', image: '' },
    { title: 'How to Start Running: A Beginners Guide', category: 'Fitness', image: '' },
    { title: '7 Types of Exercises to Relieve Constipation', category: 'Fitness', image: '' },
    { title: 'The Best Yoga Poses for Lower Back Pain', category: 'Fitness', image: '' },
    { title: 'Can You Run a Marathon with POTS?', category: 'Fitness', image: '' },
    { title: 'Strength Training Over 50: Where to Begin', category: 'Fitness', image: '' },
  ],
  'Mental Well-Being': [
    { title: 'Can Music Therapy Help with Depression?', category: 'Mental Health', image: '' },
    { title: 'Understanding Anxiety: Signs and Solutions', category: 'Mental Health', image: '' },
    { title: 'Meditation for Beginners: A 5-Minute Guide', category: 'Mental Health', image: '' },
    { title: 'The Link Between Exercise and Mental Health', category: 'Mental Health', image: '' },
    { title: 'How Sleep Affects Your Mood', category: 'Mental Health', image: '' },
    { title: 'Setting Boundaries for Better Mental Health', category: 'Mental Health', image: '' },
  ],
  'Product Reviews': [
    { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Review', image: '' },
    { title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', category: 'Product Review', image: '' },
    { title: 'Best Fitness Trackers of 2026', category: 'Product Review', image: '' },
    { title: 'Top-Rated Blood Pressure Monitors for Home Use', category: 'Product Review', image: '' },
    { title: 'The Best Meal Delivery Services for Healthy Eating', category: 'Product Review', image: '' },
    { title: 'Sleep Gadgets Worth Your Money', category: 'Product Review', image: '' },
  ],
  'Recipes': [
    { title: '16 Superfoods That Are Worthy of the Title', category: 'Recipes', image: '' },
    { title: 'Heart-Healthy Meals in Under 30 Minutes', category: 'Recipes', image: '' },
    { title: 'Anti-Inflammatory Recipes for Beginners', category: 'Recipes', image: '' },
    { title: 'Meal Prep Ideas for Busy Weeknights', category: 'Recipes', image: '' },
    { title: 'Plant-Based Protein Sources You Need to Try', category: 'Recipes', image: '' },
    { title: 'Healthy Smoothie Recipes for Every Season', category: 'Recipes', image: '' },
  ],
  'Skin Care': [
    { title: "Beginner's Guide to Sensitive Skin", category: 'Skin Care', image: '' },
    { title: 'The Best Sunscreens for Every Skin Type', category: 'Skin Care', image: '' },
    { title: 'How to Build a Simple Skincare Routine', category: 'Skin Care', image: '' },
    { title: 'Understanding Eczema Triggers', category: 'Skin Care', image: '' },
    { title: 'Anti-Aging Ingredients That Actually Work', category: 'Skin Care', image: '' },
    { title: 'Why You Need Vitamin C in Your Routine', category: 'Skin Care', image: '' },
  ],
};

const TRUST_PILLARS = [
  { icon: Users, title: 'For you, by experts', desc: 'Experienced health writers break down complex topics so your choices feel clearer.' },
  { icon: Sparkles, title: 'Built to move you forward', desc: 'We pair trusted information with tools and resources to guide your real health decisions.' },
  { icon: Shield, title: 'Reviewed by professionals', desc: 'Content accuracy checked by our medical experts so information is always dependable.' },
  { icon: Clock, title: 'Always up to date', desc: 'We regularly update our content as medical guidance evolves, so your next steps reflect what\'s current.' },
];

const FEATURED_PROGRAMS = [
  { title: "Beginner's Guide to Sensitive Skin", desc: 'A step-by-step program to understand and care for sensitive skin.', color: '#FDF2F0' },
  { title: 'Living with Multiple Sclerosis', desc: 'Expert guidance and community support for navigating life with MS.', color: '#EEF4F4' },
  { title: 'Eczema Solutions: Knowledge for Self-Care', desc: 'Practical strategies for managing eczema day to day.', color: '#FFF8F0' },
  { title: "Men's Wellness", desc: 'Evidence-based advice for every stage of a man\'s health journey.', color: '#F0F4F8' },
];

const LATEST_VIDEOS = [
  { title: '7 Types of Exercises to Relieve Constipation', duration: '4:12' },
  { title: 'What Every Psoriasis Patient Needs to Know About Flares and Stress', duration: '5:38' },
  { title: "Parkinson's Disease: 5 Progression Stages", duration: '3:55' },
  { title: 'Chronic Spontaneous Urticaria Facts and Resources', duration: '6:10' },
];

const FOOTER_LINKS = [
  'About Us', 'Contact Us', 'Privacy Policy', 'Privacy Settings', 'Advertising Policy',
  'Health Topics', 'Sitemap', 'Medical Affairs', 'Content Integrity', 'Newsletters',
];

const SOCIAL_LINKS = [
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: XIcon, label: 'X' },
  { icon: PinterestIcon, label: 'Pinterest' },
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: YoutubeIcon, label: 'YouTube' },
];

/* ───────────────────────────────────────────
   Sub-components
   ─────────────────────────────────────────── */

function MegaMenu({ items, open, onClose }: { items: typeof NAV_ITEMS; open: string | null; onClose: () => void }) {
  const item = items.find(i => i.label === open);
  if (!open || !item || !item.sections) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 right-0 top-full bg-white border-t border-border-light shadow-elevated z-50"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto px-8 py-10 flex gap-16">
          {item.sections.map((section, i) => (
            <div key={i} className={section.featured ? 'ml-auto pl-8 border-l border-border-light' : ''}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary hover:text-primary transition-colors duration-150 block py-0.5"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ArticleCard({ title, category }: { title: string; category: string }) {
  const gradients = [
    'from-teal-400 to-primary',
    'from-amber-300 to-accent',
    'from-purple-400 to-indigo-500',
    'from-green-400 to-teal-500',
    'from-pink-400 to-rose-500',
    'from-blue-400 to-cyan-500',
  ];
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
    >
      <div className={`h-44 rounded-xl bg-gradient-to-br ${gradient} mb-4 overflow-hidden relative`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">{category}</span>
      <h3 className="text-base font-semibold text-text leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
        {title}
      </h3>
    </motion.article>
  );
}

/* ───────────────────────────────────────────
   Main App
   ─────────────────────────────────────────── */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Top Reads');
  const [topicScroll, setTopicScroll] = useState(0);
  const [email, setEmail] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [footerNewsletterSubmitted, setFooterNewsletterSubmitted] = useState(false);
  const topicScrollRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleMegaMenuEnter = useCallback((label: string) => {
    clearTimeout(megaMenuTimeout.current);
    setActiveMegaMenu(label);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => setActiveMegaMenu(null), 200);
  }, []);

  const scrollTopics = (dir: 'left' | 'right') => {
    const container = topicScrollRef.current;
    if (!container) return;
    const scrollAmount = 280;
    const newScroll = dir === 'left'
      ? Math.max(0, topicScroll - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, topicScroll + scrollAmount);
    setTopicScroll(newScroll);
    container.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent, isFooter = false) => {
    e.preventDefault();
    if (isFooter) {
      setFooterNewsletterSubmitted(true);
    } else {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <div className="grain-overlay min-h-screen bg-bg">
      {/* ── Credibility Ticker ── */}
      <div className="bg-primary text-white overflow-hidden py-2.5">
        <div className="flex animate-ticker whitespace-nowrap gap-16" style={{ width: 'max-content' }}>
          {[...CREDIBILITY_STATS, ...CREDIBILITY_STATS].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-medium shrink-0">
              <stat.icon size={16} className="shrink-0 opacity-80" />
              <span>{stat.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-[var(--font-display)]">W</span>
              </div>
              <span className="text-xl font-bold text-text font-[var(--font-display)] tracking-tight">WellSource</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-10">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.sections && handleMegaMenuEnter(item.label)}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 flex items-center gap-1
                      ${activeMegaMenu === item.label ? 'text-primary bg-primary-light/60' : 'text-text-secondary hover:text-text hover:bg-bg-secondary'}`}
                    onClick={() => item.sections && setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    {item.sections && <ChevronDown size={14} className={`transition-transform duration-200 ${activeMegaMenu === item.label ? 'rotate-180' : ''}`} />}
                  </button>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text transition-colors">
                <Search size={18} />
              </button>
              <button className="hidden sm:block text-sm font-medium text-text-secondary hover:text-text transition-colors">Subscribe</button>
              <button className="hidden sm:block text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-lg">Sign In</button>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu items={NAV_ITEMS} open={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border-light bg-white overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className="w-full text-left px-2 py-3 text-sm font-medium text-text-secondary hover:text-text hover:bg-bg-secondary rounded-md transition-colors flex items-center justify-between"
                      onClick={() => item.sections && setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      {item.sections && <ChevronDown size={16} className={`transition-transform ${activeMegaMenu === item.label ? 'rotate-180' : ''}`} />}
                    </button>
                    {item.sections && activeMegaMenu === item.label && (
                      <div className="ml-4 mb-2 space-y-2">
                        {item.sections.map((s, i) => (
                          <div key={i}>
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted px-2 pt-1">{s.title}</p>
                            {s.links.map((l, j) => (
                              <a key={j} href="#" className="block px-2 py-1.5 text-sm text-text-secondary hover:text-primary">{l}</a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-border-light space-y-2">
                  <button className="w-full text-left px-2 py-2.5 text-sm font-medium text-text-secondary">Subscribe</button>
                  <button className="w-full text-center py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors">Sign In</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent bg-accent-light px-3 py-1.5 rounded-full mb-5">
                Fitness
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight mb-4 text-balance">
                Day 12: Resistance Band Moves You Can Do in 10 Minutes
              </h1>
              <p className="text-lg text-text-secondary mb-7 max-w-xl leading-relaxed">
                Simple, beginner-friendly resistance band exercises to build strength and improve flexibility at home.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-card hover:shadow-card-hover">
                  Read More <ArrowRight size={18} />
                </a>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-amber" />
                  </div>
                  <span className="font-medium text-text-secondary">30-Day Fitness Challenge</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-teal-100 via-primary-light to-accent-light rounded-2xl overflow-hidden shadow-card">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Dumbbell size={64} className="text-primary/30 mx-auto mb-2" />
                      <span className="text-sm font-medium text-primary/60">Resistance Band Training</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                    Day 12 of 30
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trending + Newsletter ── */}
        <section className="bg-bg-secondary border-y border-border-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Trending */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Activity size={20} className="text-accent" />
                  <h2 className="text-lg font-bold text-text font-[var(--font-display)]">Trending Now</h2>
                </div>
                <div className="space-y-4">
                  {TRENDING_ARTICLES.map((article, i) => (
                    <a key={i} href="#" className="flex items-start gap-3 group p-2 -mx-2 rounded-lg hover:bg-white/60 transition-colors">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary mt-0.5 shrink-0 w-20">{article.category}</span>
                      <span className="text-sm font-medium text-text-secondary group-hover:text-text transition-colors leading-snug">{article.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-border-light relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary-light/50 rounded-full -translate-y-1/2 translate-x-1/4" />
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-text font-[var(--font-display)] mb-3">The best of health and wellness</h2>
                    <p className="text-text-secondary mb-6 max-w-lg leading-relaxed">
                      We do the research so you don't have to. Stay in the know with the latest in health and wellness.
                    </p>
                    {newsletterSubmitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 text-success font-medium">
                        <Check size={20} /> Thanks for subscribing!
                      </motion.div>
                    ) : (
                      <form onSubmit={(e) => handleNewsletterSubmit(e)} className="flex flex-col sm:flex-row gap-3 max-w-md">
                        <input
                          type="email"
                          required
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-xl border border-border bg-bg text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                        <button type="submit" className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm">
                          Join Now
                        </button>
                      </form>
                    )}
                    <p className="text-xs text-text-muted mt-3">Your privacy is important to us.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Health Topics Carousel ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text font-[var(--font-display)]">Explore Health Topics</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTopics('left')}
                className="p-2 rounded-full border border-border hover:bg-bg-secondary transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollTopics('right')}
                className="p-2 rounded-full border border-border hover:bg-bg-secondary transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
              <a href="#" className="ml-3 text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                View all <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div
            ref={topicScrollRef}
            className="flex gap-5 overflow-x-auto hide-scrollbar pb-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {HEALTH_TOPICS.map((topic, i) => (
              <a key={i} href="#" className="flex flex-col items-center gap-3 group shrink-0 w-36">
                <div className={`w-24 h-24 rounded-full ${topic.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm`}>
                  <topic.icon size={32} />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text text-center leading-snug transition-colors">{topic.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Tools Section ── */}
        <section className="bg-surface border-y border-border-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
            {/* Nutrition Hub */}
            <div className="mb-14">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-border-light">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-success bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">Nutrition Hub</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-text font-[var(--font-display)] mb-3">Healthy eating, simplified</h2>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      Take charge of your nutrition with guidance on meal planning, diets, supplements, and more from our dietitians and nutritionists.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 shadow-sm text-sm">
                      Visit Nutrition Hub <ArrowRight size={16} />
                    </a>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: BookOpen, title: 'Recipe Hub', desc: 'Try 400+ recipes for different dietary preferences' },
                      { icon: Activity, title: 'Macronutrient Calculator', desc: 'Calculate your daily carb, protein, and fat goals' },
                      { icon: Apple, title: 'Calorie Calculator', desc: 'Learn how many calories you need for your weight goals' },
                    ].map((tool, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-bg-secondary transition-colors">
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                          <tool.icon size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text text-sm">{tool.title}</h4>
                          <p className="text-xs text-text-muted mt-0.5">{tool.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drug & Care Tools */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Pill, title: 'Drug Directory: A to Z', desc: 'Learn everything about specific prescriptions and over-the-counter medications.', cta: 'Search drugs' },
                { icon: Search, title: 'Pill Identifier', desc: 'Identify an unknown tablet or capsule by shape, color, and imprint.', cta: 'Identify pill' },
                { icon: Stethoscope, title: 'GLP-1 Resource', desc: 'Compare places to buy weight-loss medications online.', cta: 'Explore options' },
                { icon: Users, title: 'FindCare', desc: 'Find local doctors who accept your insurance.', cta: 'Find doctors' },
              ].map((tool, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-card border border-border-light hover:shadow-card-hover transition-shadow duration-200 flex flex-col">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                    <tool.icon size={20} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-text mb-2 text-sm">{tool.title}</h4>
                  <p className="text-xs text-text-muted mb-4 leading-relaxed flex-1">{tool.desc}</p>
                  <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                    {tool.cta} <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Recommended Reads ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-text font-[var(--font-display)] mb-8">Recommended Reads</h2>

          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar pb-1 mb-8 border-b border-border-light">
            {RECOMMENDED_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors relative
                  ${activeTab === tab ? 'text-primary' : 'text-text-muted hover:text-text-secondary'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="wait">
              {RECOMMENDED_ARTICLES[activeTab]?.map((article, i) => (
                <ArticleCard key={`${activeTab}-${i}`} title={article.title} category={article.category} />
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-10">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              View all articles <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* ── Trust Section ── */}
        <section className="bg-white border-y border-border-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-text font-[var(--font-display)] text-balance max-w-2xl mx-auto leading-tight">
                Why you can trust us on your health journey
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {TRUST_PILLARS.map((pillar, i) => (
                <div key={i} className="text-center group">
                  <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200">
                    <pillar.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-text mb-2 text-sm">{pillar.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Programs ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text font-[var(--font-display)]">Featured Programs</h2>
            <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
              View all <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_PROGRAMS.map((program, i) => (
              <a key={i} href="#" className="rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 group block" style={{ backgroundColor: program.color }}>
                <h3 className="font-semibold text-text mb-2 text-sm group-hover:text-primary transition-colors leading-snug">{program.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-3">{program.desc}</p>
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
                  Learn more <ArrowRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Latest Videos ── */}
        <section className="bg-bg-secondary border-y border-border-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text font-[var(--font-display)]">Latest Videos</h2>
              <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                View all videos <ArrowRight size={16} />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LATEST_VIDEOS.map((video, i) => (
                <a key={i} href="#" className="group block">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-3 overflow-hidden relative shadow-card group-hover:shadow-card-hover transition-shadow">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                        <Play size={20} className="text-gray-900 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors leading-snug line-clamp-2">{video.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-text text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Newsletter */}
          <div className="max-w-2xl mb-14">
            <h3 className="text-xl md:text-2xl font-bold font-[var(--font-display)] mb-3">Filter out the noise</h3>
            <p className="text-sm text-white/60 mb-5 leading-relaxed">
              Nurture your inbox with health and wellness advice that's inclusive and rooted in medical expertise.
            </p>
            {footerNewsletterSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400 text-sm">
                <Check size={16} /> You're signed up!
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleNewsletterSubmit(e, true)} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                />
                <button type="submit" className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-sm">
                  Sign Up
                </button>
              </form>
            )}
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
            {FOOTER_LINKS.map((link, i) => (
              <a key={i} href="#" className="text-sm text-white/60 hover:text-white transition-colors">{link}</a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4 mb-8">
            {SOCIAL_LINKS.map((social, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label={social.label}>
                <social.icon size={16} />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-white/40 leading-relaxed max-w-4xl">
              &copy; 2026 WellSource Media LLC. All rights reserved. Our website services, content, and products are for informational purposes only. WellSource does not provide medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
