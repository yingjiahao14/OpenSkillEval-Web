import { Star, Users, TrendingUp, Award } from 'lucide-react'
import Carousel, { ScrollCarousel } from '../components/Carousel'

interface HomePageProps {
  navigate: (page: 'home' | 'courses' | 'projects' | 'plus' | 'login') => void
}

export default function HomePage({ navigate }: HomePageProps) {
  const specializations = [
    {
      title: 'Graphic Design and Visual Communication',
      description: 'Master color, composition, and visual perception to create impactful and coherent visual identities.',
      students: '26,264',
      rating: '100%',
      reviews: 337,
      originalPrice: '$94.99',
      salePrice: '$0.50',
      badge: 'FREE WITH PLUS'
    },
    {
      title: 'Sewing and Design Specialization',
      description: 'Master sewing techniques: from using a sewing machine to creating garments like dresses, trousers, and backpacks.',
      students: '16,058',
      rating: '100%',
      reviews: 69,
      originalPrice: '$94.99',
      salePrice: '$0.50',
      badge: 'FREE WITH PLUS'
    },
    {
      title: 'Social Media Marketing Specialization',
      description: 'Learn to design, manage, and execute effective social media campaigns with targeted objectives and performance analytics.',
      students: '12,900',
      rating: '99%',
      reviews: 73,
      originalPrice: '$94.99',
      salePrice: '$0.50',
      badge: 'FREE WITH PLUS'
    },
    {
      title: 'Sketching Techniques Specialization',
      description: 'Explore the power of sketching alongside top-notch drawing masters.',
      students: '12,796',
      rating: '99%',
      reviews: 129,
      originalPrice: '$94.99',
      salePrice: '$0.50',
      badge: 'FREE WITH PLUS'
    },
    {
      title: 'UX/UI Design Specialization',
      description: 'Create engaging digital experiences with UX design through research, methodology, and strategy for your portfolio.',
      students: '8,880',
      rating: '100%',
      reviews: 81,
      originalPrice: '$94.99',
      salePrice: '$0.50',
      badge: 'FREE WITH PLUS'
    }
  ]

  const bestSellers = [
    { title: 'Drawing for Beginners Level -1', instructor: 'Puño', students: '274,195', rating: '99%', reviews: '10.47K', price: '$0.50', wasPrice: '$29.99', badge: 'Best seller' },
    { title: 'Modern Watercolor Techniques', instructor: 'Ana Victoria Calderon', students: '228,801', rating: '99%', reviews: '10.21K', price: '$0.50', wasPrice: '$29.99', badge: 'Best seller' },
    { title: 'Professional Photography for Instagram', instructor: 'Mina Barrio', students: '282,895', rating: '99%', reviews: '10.89K', price: '$0.50', wasPrice: '$29.99', badge: 'Best seller' },
    { title: 'Creative Drawing Techniques for Beginners', instructor: 'Puño', students: '177,842', rating: '99%', reviews: '4.52K', price: '$0.50', wasPrice: '$29.99', badge: 'Best seller' },
    { title: 'Introduction to After Effects', instructor: 'Carlos "Zenzuke" Albarrán', students: '296,236', rating: '97%', reviews: '4.93K', price: '$0.50', wasPrice: '$29.99', badge: 'Best seller' },
    { title: 'Introduction to Adobe Photoshop', instructor: 'Carles Marsal', students: '381,277', rating: '100%', reviews: '10.16K', price: '$0.50', wasPrice: '$29.99', badge: 'Best seller' }
  ]

  const valuePropositions = [
    { icon: <Users size={24} />, title: 'Learn at your own pace', description: 'Enjoy learning from home without a set schedule and with an easy-to-follow method.' },
    { icon: <TrendingUp size={24} />, title: 'Get front-row seats', description: 'Videos of the highest quality so you don\'t miss a single detail.' },
    { icon: <Award size={24} />, title: 'Learn from the best professionals', description: 'Learn valuable methods and techniques explained by top experts.' },
    { icon: <Star size={24} />, title: 'Share knowledge and ideas', description: 'Ask questions, request feedback, or offer solutions to the community.' }
  ]

  return (
    <main>
      {/* Hero Specialization Carousel */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="badge badge-primary mb-4">FEATURED</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#171717] mb-4">
              Master Your Creative Skills
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our featured specialization bundles and become a certified creative professional
            </p>
          </div>

          <Carousel autoPlay interval={6000} className="relative">
            {specializations.map((spec, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-gradient-to-br from-[#F02D00] to-[#FF6B35] p-8 text-white">
                      <span className="badge bg-white/20 text-white mb-4">{spec.badge}</span>
                      <h3 className="text-2xl font-bold mb-4">{spec.title}</h3>
                      <p className="text-white/90 mb-6">{spec.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users size={16} />
                          {spec.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={16} fill="currentColor" />
                          {spec.rating} ({spec.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-gray-400 line-through text-lg">{spec.originalPrice}</span>
                        <span className="text-4xl font-bold text-[#F02D00]">{spec.salePrice}</span>
                      </div>
                      <button
                        onClick={() => navigate('plus')}
                        className="btn-primary w-full"
                      >
                        Get Plus Membership
                      </button>
                      <p className="text-sm text-gray-500 mt-3 text-center">
                        Plus members pay only $0.50 per course (99% savings)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Best Seller Courses */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#F02D00] font-semibold text-sm">BESTSELLERS</span>
              <h2 className="text-3xl font-bold text-[#171717]">Most popular courses</h2>
            </div>
            <button
              onClick={() => navigate('courses')}
              className="btn-outline hidden sm:flex"
            >
              View all courses
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((course, index) => (
              <div key={index} className="card group cursor-pointer">
                {/* Course Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300/50 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  {course.badge && (
                    <span className="absolute top-3 left-3 badge badge-primary text-xs">
                      {course.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#171717] group-hover:text-[#F02D00] transition-colors mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      {course.rating} ({course.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-[#171717]">{course.price}</span>
                    <span className="text-sm text-gray-400 line-through">{course.wasPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('courses')}
            className="btn-outline w-full mt-6 sm:hidden"
          >
            View all courses
          </button>
        </div>
      </section>

      {/* New Courses Carousel */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#00A399] font-semibold text-sm">JUST ADDED</span>
              <h2 className="text-3xl font-bold text-[#171717]">Learn by doing</h2>
              <p className="text-gray-600 mt-1">Hands-on courses to build real-world skills</p>
            </div>
          </div>

          <ScrollCarousel className="relative">
            {bestSellers.slice(0, 4).map((course, index) => (
              <div key={index} className="min-w-[300px] card group cursor-pointer flex-shrink-0">
                <div className="relative h-36 bg-gradient-to-br from-[#00A399]/10 to-[#00A399]/20 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/80 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">✨</span>
                  </div>
                  <span className="absolute top-3 right-3 badge badge-teal text-xs">New</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#171717] group-hover:text-[#00A399] transition-colors mb-1 text-sm">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#171717]">{course.price}</span>
                    <span className="text-xs text-gray-400 line-through">{course.wasPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 lg:py-24 bg-[#171717] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What to expect from a CreativeHub course
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join millions of creative professionals learning new skills every day
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map((prop, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-[#F02D00] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {prop.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{prop.title}</h3>
                <p className="text-gray-400 text-sm">{prop.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#F02D00] mb-2">274K+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#00A399] mb-2">99%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">1K+</div>
              <div className="text-gray-400">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#F02D00] mb-2">98%</div>
              <div className="text-gray-400">Avg. Discount</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('plus')}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Learning Today
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}