import { useState } from 'react'
import { ChevronDown, Filter, Search } from 'lucide-react'

interface CoursesPageProps {
  navigate: (page: 'home' | 'courses' | 'projects' | 'plus' | 'login') => void
}

export default function CoursesPage({ navigate }: CoursesPageProps) {
  const [activeCategory, setActiveCategory] = useState('All courses')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const categories = [
    'All courses', 'Illustration', 'Craft', 'Marketing & Business',
    'Photography & Video', 'Design', '3D & Animation', 'Architecture & Spaces',
    'Writing', 'Fashion', 'Web & App Design', 'Calligraphy & Typography',
    'Music & Audio', 'Culinary', 'Artificial Intelligence', 'Wellness'
  ]

  const areas = [
    'Branding & Identity', 'Graphic Design', 'Social Media Design', 'Web Design',
    'Color Theory', 'Traditional Illustration', 'Digital Illustration', 'Drawing',
    'Arts & Crafts', 'Fine Arts', 'Photography', 'Marketing', 'Painting'
  ]

  const software = [
    'Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Procreate',
    'Adobe After Effects', 'SketchUp', 'Cinema 4D', 'Figma', 'Blender'
  ]

  const courseTypes = [
    'All courses', 'Guided courses', 'Deep Dive', 'Specializations',
    'Basics', 'New courses', 'Top rated', 'Popular courses'
  ]

  const courses = [
    { title: 'Drawing for Beginners Level -1', instructor: 'Puño', students: '274,195', rating: '99%', price: '$0.50', badge: 'Bestseller' },
    { title: 'Modern Watercolor Techniques', instructor: 'Ana Victoria Calderon', students: '228,801', rating: '99%', price: '$0.50', badge: 'Bestseller' },
    { title: 'Professional Photography for Instagram', instructor: 'Mina Barrio', students: '282,895', rating: '99%', price: '$0.50', badge: 'Bestseller' },
    { title: 'Creative Drawing Techniques for Beginners', instructor: 'Puño', students: '177,842', rating: '99%', price: '$0.50', badge: '' },
    { title: 'Introduction to After Effects', instructor: 'Carlos "Zenzuke" Albarrán', students: '296,236', rating: '97%', price: '$0.50', badge: '' },
    { title: 'Introduction to Adobe Photoshop', instructor: 'Carles Marsal', students: '381,277', rating: '100%', price: '$0.50', badge: 'Top rated' },
    { title: 'Graphic Design Fundamentals', instructor: 'David K.', students: '156,432', rating: '98%', price: '$0.50', badge: '' },
    { title: 'UI/UX Design Masterclass', instructor: 'Sarah M.', students: '198,765', rating: '99%', price: '$0.50', badge: 'Popular' },
  ]

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#171717] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Explore Courses</h1>
          <p className="text-gray-400">Learn from world-class instructors across 15 creative categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => toggleSection('filters')}
              className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 mb-4"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Filter size={18} />
                Filters
              </span>
              <ChevronDown size={18} className={expandedSection === 'filters' ? 'rotate-180' : ''} />
            </button>

            <div className={`lg:block ${expandedSection === 'filters' ? 'block' : 'hidden'}`}>
              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F02D00] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#171717]">Categories</h3>
                </div>
                <div className="p-2">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat
                          ? 'bg-[#F02D00] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <button
                  onClick={() => toggleSection('areas')}
                  className="w-full p-4 flex items-center justify-between border-b border-gray-200"
                >
                  <h3 className="font-semibold text-[#171717]">Areas</h3>
                  <ChevronDown size={18} className={expandedSection === 'areas' ? 'rotate-180' : ''} />
                </button>
                {expandedSection !== 'areas' && (
                  <div className="p-4 flex flex-wrap gap-2">
                    {areas.slice(0, 5).map((area, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {area}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">+{areas.length - 5} more</span>
                  </div>
                )}
                {expandedSection === 'areas' && (
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {areas.map((area, i) => (
                      <button key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600 hover:bg-gray-100 text-left">
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Software */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                <button
                  onClick={() => toggleSection('software')}
                  className="w-full p-4 flex items-center justify-between border-b border-gray-200"
                >
                  <h3 className="font-semibold text-[#171717]">Software</h3>
                  <ChevronDown size={18} className={expandedSection === 'software' ? 'rotate-180' : ''} />
                </button>
                {expandedSection !== 'software' && (
                  <div className="p-4 flex flex-wrap gap-2">
                    {software.slice(0, 5).map((sw, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {sw}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">+{software.length - 5} more</span>
                  </div>
                )}
                {expandedSection === 'software' && (
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {software.map((sw, i) => (
                      <button key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600 hover:bg-gray-100 text-left">
                        {sw}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Course Types */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#171717]">Course Type</h3>
                </div>
                <div className="p-2">
                  {courseTypes.map((type, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-[#171717]">{courses.length}</span> courses found
              </p>
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F02D00]">
                <option>Sort by: Featured</option>
                <option>Most popular</option>
                <option>Highest rated</option>
                <option>Newest</option>
                <option>Lowest price</option>
              </select>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div key={index} className="card group cursor-pointer bg-white">
                  <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-300/50 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    {course.badge && (
                      <span className={`absolute top-3 left-3 badge ${course.badge === 'Bestseller' ? 'badge-primary' : 'badge-teal'} text-xs`}>
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[#171717] group-hover:text-[#F02D00] transition-colors mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span>👥 {course.students}</span>
                      <span className="text-yellow-500">⭐ {course.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#171717]">{course.price}</span>
                      <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-outline">
                Load more courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}