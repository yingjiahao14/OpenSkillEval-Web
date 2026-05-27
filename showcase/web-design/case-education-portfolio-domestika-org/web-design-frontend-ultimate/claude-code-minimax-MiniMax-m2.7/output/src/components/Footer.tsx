import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FooterProps {
  navigate: (page: 'home' | 'courses' | 'projects' | 'plus' | 'login') => void
}

export default function Footer({ navigate }: FooterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const categories = [
    'Illustration', 'Craft', 'Marketing & Business', 'Photography & Video',
    'Design', '3D & Animation', 'Architecture & Spaces', 'Writing',
    'Fashion', 'Web & App Design', 'Calligraphy & Typography', 'Music & Audio', 'Culinary', 'AI', 'Wellness'
  ]

  const areas = [
    'Traditional Illustration', 'Digital Illustration', 'Drawing', 'Arts & Crafts', 'Graphic Design',
    'DIY', 'Fine Arts', 'Textile Design', 'Photography', 'Marketing', 'Painting',
    'Branding & Identity', 'Character Design', '3D', 'Storytelling', 'Narrative', 'Communication'
  ]

  const software = [
    'Adobe Photoshop', 'Adobe Illustrator', 'Procreate', 'Adobe After Effects',
    'Adobe Lightroom', 'Cinema 4D', 'Adobe InDesign', 'ChatGPT', 'Adobe Premiere'
  ]

  const lists = ['New courses', 'Top rated', 'Popular courses', 'Courses on sale']
  const sections = ['Courses', 'Projects', 'Creatives', 'Schools', 'Podcasts', 'Blog']
  const information = ['CreativeHub', 'Affiliates', 'Businesses', 'Teachers']
  const support = ['Support', 'Contact']
  const languages = ['Español', 'English', 'Português', 'Deutsch', 'Français', 'Italiano', 'Polski', 'Nederlands', 'Türkçe', 'Română', 'Bahasa Indonesia']

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const FooterSection = ({ title, items, sectionKey }: { title: string; items: string[]; sectionKey: string }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-[#171717]">{title}</span>
        {expandedSection === sectionKey ? (
          <ChevronUp size={20} className="md:hidden text-gray-400" />
        ) : (
          <ChevronDown size={20} className="md:hidden text-gray-400" />
        )}
      </button>
      <div className={`md:block ${expandedSection === sectionKey ? 'block' : 'hidden'} pb-4`}>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i}>
              <button className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <footer className="bg-[#171717] text-white mt-auto">
      {/* Desktop Footer Grid */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-6 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Areas</h4>
            <ul className="space-y-2">
              {areas.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Software</h4>
            <ul className="space-y-2">
              {software.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Lists</h4>
            <ul className="space-y-2">
              {lists.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sections</h4>
            <ul className="space-y-2">
              {sections.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              {information.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Support</h4>
            <ul className="space-y-2">
              {support.map((item, i) => (
                <li key={i}>
                  <button className="text-gray-400 hover:text-white text-sm transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F02D00] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold">CreativeHub</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Language:</span>
              <select className="bg-transparent text-sm text-gray-400 border border-gray-700 rounded px-2 py-1">
                {languages.map((lang, i) => (
                  <option key={i} value={lang} className="text-gray-900">{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors">Terms of use</button>
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Cookies Policy</button>
            <button className="hover:text-white transition-colors">Accessibility Statement</button>
          </div>
          <span>© 2024 CreativeHub</span>
        </div>

        {/* App Downloads */}
        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-gray-400">Download the CreativeHub app:</span>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">
            Google Play
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">
            App Store
          </button>
        </div>
      </div>

      {/* Mobile Footer Accordion */}
      <div className="md:hidden max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#F02D00] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold">CreativeHub</span>
        </div>

        <FooterSection title="Categories" items={categories} sectionKey="categories" />
        <FooterSection title="Areas" items={areas} sectionKey="areas" />
        <FooterSection title="Software" items={software} sectionKey="software" />
        <FooterSection title="Lists" items={lists} sectionKey="lists" />
        <FooterSection title="Sections" items={sections} sectionKey="sections" />
        <FooterSection title="Information" items={information} sectionKey="information" />
        <FooterSection title="Support" items={support} sectionKey="support" />

        {/* Language */}
        <div className="py-4 border-b border-gray-200">
          <label className="text-sm text-gray-400 mb-2 block">Language:</label>
          <select className="w-full bg-gray-800 text-gray-400 border border-gray-700 rounded px-3 py-2">
            {languages.map((lang, i) => (
              <option key={i} value={lang} className="text-gray-900">{lang}</option>
            ))}
          </select>
        </div>

        {/* Legal Links */}
        <div className="py-4 space-y-2">
          <div className="flex flex-wrap gap-2 text-sm">
            <button className="text-gray-400 hover:text-white transition-colors">Terms of use</button>
            <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-gray-400 hover:text-white transition-colors">Cookies Policy</button>
            <button className="text-gray-400 hover:text-white transition-colors">Accessibility</button>
          </div>
          <p className="text-sm text-gray-400">© 2024 CreativeHub</p>
        </div>

        {/* App Downloads */}
        <div className="pt-4 space-y-3">
          <span className="text-sm text-gray-400">Download the app:</span>
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">
              Google Play
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">
              App Store
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}