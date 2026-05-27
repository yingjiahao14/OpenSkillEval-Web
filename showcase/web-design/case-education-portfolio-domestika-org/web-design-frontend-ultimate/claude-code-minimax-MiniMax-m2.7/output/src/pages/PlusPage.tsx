import { useState } from 'react'
import { Check, ChevronDown, ChevronUp, Award, CreditCard, Gift, BookOpen } from 'lucide-react'
import Carousel from '../components/Carousel'

interface PlusPageProps {
  navigate: (page: 'home' | 'courses' | 'projects' | 'plus' | 'login') => void
}

export default function PlusPage({ navigate }: PlusPageProps) {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const benefits = [
    { icon: <BookOpen size={24} />, title: '+1,000 courses FREE', description: 'Watch thousands of courses for free across Illustration, Photography, Crafts, Marketing, Design, Architecture, Web & App Design, and more.' },
    { icon: <Gift size={24} />, title: '100+ new courses added every week', description: 'Choose from a catalog of courses that Plus subscribers can watch for free for at least 30 days.' },
    { icon: <CreditCard size={24} />, title: '12 annual credits', description: 'Receive credits to redeem for any course on the platform. Use them immediately or save them for later.' },
    { icon: <Award size={24} />, title: 'Certificate per course', description: 'When you complete a purchased course, instantly get your personalized certificate signed by the teacher.' },
  ]

  const courses = [
    { title: 'Mastering Color Theory', instructor: 'Sarah Design', badge: 'New' },
    { title: 'Advanced Portrait Photography', instructor: 'Mike Photo', badge: '' },
    { title: 'Digital Illustration Fundamentals', instructor: 'Alex Art', badge: 'Popular' },
    { title: 'Motion Graphics Masterclass', instructor: 'Zenzuke', badge: '' },
    { title: 'Brand Identity Design', instructor: 'Creative Pro', badge: 'New' },
  ]

  const faqs = [
    {
      question: 'What courses can Plus members watch for free?',
      answer: 'Plus members can watch thousands of courses for free, with 100+ new courses added to the Plus catalog every week. Courses are free to watch for a limited time period. You can always buy a course to keep it forever.'
    },
    {
      question: 'How do Plus credits work?',
      answer: 'You\'ll get one credit each month (monthly) or 12 credits per year (annual), starting the day you subscribe. Credits accumulate and can be exchanged for any course regardless of price. Credits expire one year after receipt or when membership ends. Once redeemed, the course is yours forever.'
    },
    {
      question: 'When will I get my certificate?',
      answer: 'When you complete a purchased course, you\'ll instantly get your personalized certificate. Download as PDF or share online. Includes your name, course title, QR code linking to your project, and teacher\'s signature.'
    },
    {
      question: "What's the difference between the yearly and monthly subscription?",
      answer: 'Benefits are exactly the same, but the yearly payment offers a 14% discount. Yearly subscribers pay $174.50/year ($14.59/month) while monthly subscribers pay $33.90/month.'
    }
  ]

  return (
    <main>
      {/* Hero CTA */}
      <section className="bg-gradient-to-br from-[#171717] via-gray-900 to-[#171717] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge bg-[#F02D00] text-white mb-6">PLUS MEMBERSHIP</span>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Unlock Your Creative Potential
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Get unlimited access to 1,000+ courses, earn certificates, and save up to 57% with annual membership
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="btn-primary text-lg px-8 py-4">
              Start Your Free Trial
            </button>
            <button className="btn-outline text-white border-white hover:bg-white hover:text-[#171717]">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#171717] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-[#171717] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Yearly
                <span className="badge bg-green-500 text-white text-xs">SAVE 57%</span>
              </button>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Yearly */}
              <div className={`p-6 rounded-xl border-2 transition-all ${billingCycle === 'yearly' ? 'border-[#F02D00] bg-red-50/30' : 'border-gray-200'}`}>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#171717] mb-2">Yearly Plan</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-[#F02D00]">
                      ${billingCycle === 'yearly' ? '14.59' : '174.50'}
                    </span>
                    <span className="text-gray-500">/{billingCycle === 'yearly' ? 'month' : 'year'}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {billingCycle === 'yearly' ? 'Billed as $174.50/year' : '$174.50 billed annually'}
                  </p>
                  <ul className="text-left space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      12 Plus credits every year
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      Access to 1,000+ free courses
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      Unlimited course access
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      Certificates for completed courses
                    </li>
                  </ul>
                  <button className={billingCycle === 'yearly' ? 'btn-primary w-full' : 'btn-outline w-full'}>
                    {billingCycle === 'yearly' ? 'Get Started' : 'Select Yearly'}
                  </button>
                </div>
              </div>

              {/* Monthly */}
              <div className={`p-6 rounded-xl border-2 transition-all ${billingCycle === 'monthly' ? 'border-[#F02D00] bg-red-50/30' : 'border-gray-200'}`}>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#171717] mb-2">Monthly Plan</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-[#171717]">
                      ${billingCycle === 'monthly' ? '33.90' : '33.90'}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Billed monthly
                  </p>
                  <ul className="text-left space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      1 Plus credit each month
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      Access to 1,000+ free courses
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      Unlimited course access
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check size={18} className="text-green-500" />
                      Certificates for completed courses
                    </li>
                  </ul>
                  <button className={billingCycle === 'monthly' ? 'btn-primary w-full' : 'btn-outline w-full'}>
                    {billingCycle === 'monthly' ? 'Get Started' : 'Select Monthly'}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Cancel subscription renewal whenever you want. After one year, renewal price will be the full amount of $349.
            </p>
          </div>
        </div>
      </section>

      {/* Course Catalog Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#171717] mb-2">Included with Plus</h2>
            <p className="text-gray-600">Explore popular courses available to Plus members</p>
          </div>

          <Carousel className="relative">
            {courses.map((course, index) => (
              <div key={index} className="px-4">
                <div className="card bg-white">
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <div className="w-14 h-14 bg-gray-300/50 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎓</span>
                    </div>
                    {course.badge && (
                      <span className="absolute top-3 right-3 badge badge-teal text-xs">
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#171717] mb-1 text-sm">{course.title}</h3>
                    <p className="text-xs text-gray-500">{course.instructor}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Credits & Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#171717] mb-2">Everything you get with Plus</h2>
            <p className="text-gray-600">Premium benefits designed for serious learners</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#F02D00] rounded-xl flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-[#171717] mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16 bg-[#171717] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge bg-white/20 text-white mb-4">CERTIFICATES</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Earn recognized certificates
              </h2>
              <p className="text-gray-400 mb-6">
                Complete any course and receive a personalized certificate signed by your teacher. Perfect for showcasing your skills to clients and employers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-[#00A399]" />
                  <span>Downloadable PDF format</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-[#00A399]" />
                  <span>Shareable on social media</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-[#00A399]" />
                  <span>QR code linking to your project</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-[#00A399]" />
                  <span>Teacher's signature verification</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 lg:p-12">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-20 h-20 bg-[#F02D00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={40} className="text-white" />
                </div>
                <h4 className="font-bold text-[#171717] text-lg mb-2">Course Completion</h4>
                <p className="text-sm text-gray-500 mb-4">This certifies that</p>
                <p className="text-xl font-bold text-[#171717] mb-2">Your Name</p>
                <p className="text-sm text-gray-600 mb-4">has successfully completed</p>
                <p className="text-lg font-semibold text-[#F02D00]">Course Title</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#171717] mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about Plus membership</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#171717] pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[#F02D00] to-[#FF6B35] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to become a Plus member?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your 7-day free trial today. Cancel anytime.
          </p>
          <button className="bg-white text-[#F02D00] font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
            Get Started for Free
          </button>
        </div>
      </section>
    </main>
  )
}