import { useState } from 'react'
import { Heart, Eye, ChevronDown } from 'lucide-react'

interface ProjectsPageProps {
  navigate: (page: 'home' | 'courses' | 'projects' | 'plus' | 'login') => void
}

export default function ProjectsPage({ navigate }: ProjectsPageProps) {
  const [sortBy, setSortBy] = useState('Featured')
  const [timeFilter, setTimeFilter] = useState('All time')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const projects = [
    { id: 1, title: 'The Heart of the Street', author: '@fcleroux', likes: 1, views: 11, image: 'bg-gradient-to-br from-rose-400 to-pink-500', aspect: 'tall' },
    { id: 2, title: 'Bird Among the Flowers', author: '@marina_papercuts', likes: 4, views: 70, image: 'bg-gradient-to-br from-emerald-400 to-teal-500', aspect: 'wide' },
    { id: 3, title: 'Wonder Woman', author: '@gatol26', likes: 11, views: 252, image: 'bg-gradient-to-br from-amber-400 to-orange-500', aspect: 'square' },
    { id: 4, title: 'Floral Shadow Box', author: '@marina_papercuts', likes: 44, views: 232, image: 'bg-gradient-to-br from-violet-400 to-purple-500', aspect: 'tall' },
    { id: 5, title: 'HER: The Presence of Absence', author: '@dansdervani_', likes: 7, views: 51108, image: 'bg-gradient-to-br from-slate-600 to-gray-800', aspect: 'wide', winner: true },
    { id: 6, title: 'Sunset Dreams', author: '@creativemind', likes: 28, views: 156, image: 'bg-gradient-to-br from-orange-400 to-red-500', aspect: 'square' },
    { id: 7, title: 'Abstract Emotions', author: '@artlover', likes: 15, views: 89, image: 'bg-gradient-to-br from-cyan-400 to-blue-500', aspect: 'tall' },
    { id: 8, title: 'Portrait Study', author: '@drawmaster', likes: 33, views: 278, image: 'bg-gradient-to-br from-yellow-400 to-amber-500', aspect: 'square' },
  ]

  const creativeFields = [
    '2D Animation', '3D', 'Illustration', 'Photography', 'Graphic Design',
    'Watercolor Painting', 'Embroidery', 'Digital Art', 'Character Design'
  ]

  const sortOptions = ['Featured', 'Most liked', 'Most comments', 'Most viewed', 'Most recent']
  const timeFilters = ['All time', 'This week', 'This month', 'This year']

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#171717] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Community Projects</h1>
          <p className="text-gray-400">Discover amazing work from our creative community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-lg p-4 mb-8 flex flex-wrap items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-gray-100 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F02D00] cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" size={16} />
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeFilter === filter
                    ? 'bg-[#F02D00] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Creative Field Filter - Mobile */}
          <button
            onClick={() => toggleSection('creativeFields')}
            className="lg:hidden ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
          >
            Creative fields
            <ChevronDown size={16} className={expandedSection === 'creativeFields' ? 'rotate-180' : ''} />
          </button>

          {/* Creative Field Filter - Desktop */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">Creative field:</span>
            <div className="flex flex-wrap gap-2">
              {creativeFields.slice(0, 5).map((field) => (
                <span key={field} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {field}
                </span>
              ))}
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">+200 more</span>
            </div>
          </div>
        </div>

        {/* Mobile Creative Fields Accordion */}
        {expandedSection === 'creativeFields' && (
          <div className="lg:hidden bg-white rounded-lg p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {creativeFields.map((field) => (
                <button
                  key={field}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {field}
                </button>
              ))}
              <button className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors">
                +200 more
              </button>
            </div>
          </div>
        )}

        {/* Masonry Gallery */}
        <div className="masonry-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`card overflow-hidden group cursor-pointer ${
                project.aspect === 'tall' ? 'row-span-2' : ''
              } ${project.winner ? 'ring-2 ring-[#F02D00]' : ''}`}
            >
              <div className={`h-${project.aspect === 'tall' ? '80' : project.aspect === 'wide' ? '48' : '64'} ${project.image} relative`}>
                {project.winner && (
                  <div className="absolute top-3 left-3 badge bg-gradient-to-r from-yellow-400 to-amber-500 text-black">
                    🏆 Winner
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-semibold transition-opacity">
                    View Project
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#171717] group-hover:text-[#F02D00] transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{project.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="text-rose-500" />
                    {project.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {project.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-outline">
            Load more projects
          </button>
        </div>
      </div>
    </main>
  )
}