import { Users, PartyPopper, Droplets, ArrowRight } from 'lucide-react'

const opportunities = [
  {
    icon: Users,
    title: 'Volunteer With Us',
    description:
      'Join over 50,000 volunteers who give their time and skills to help people in need. Whether you can commit a few hours a month or deploy to a disaster zone, there\'s a role for you.',
    cta: 'Find Volunteer Opportunities',
    href: '#',
    color: 'primary',
  },
  {
    icon: PartyPopper,
    title: 'Start a Fundraiser',
    description:
      'Rally your community, workplace, or school to raise funds for disaster relief. We provide toolkits and support to help you make the biggest impact.',
    cta: 'Start Your Fundraiser',
    href: '#',
    color: 'navy',
  },
  {
    icon: Droplets,
    title: 'Give Blood',
    description:
      'Every two seconds, someone in the country needs blood. Schedule an appointment at a blood drive near you and help save lives.',
    cta: 'Find a Blood Drive',
    href: '#',
    color: 'primary',
  },
]

export default function GetInvolved() {
  return (
    <section id="get-involved" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-900 tracking-tight mb-4">
            Get Involved
          </h2>
          <p className="text-warm-600">
            There are many ways to make a difference. Choose the path that works
            best for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((item) => {
            const Icon = item.icon
            const isPrimary = item.color === 'primary'
            return (
              <div
                key={item.title}
                className="group flex flex-col p-6 sm:p-8 rounded-2xl border border-warm-200 bg-white hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isPrimary ? 'bg-primary/10' : 'bg-navy/10'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isPrimary ? 'text-primary' : 'text-navy'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-warm-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-warm-600 leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm transition-colors ${
                    isPrimary
                      ? 'text-primary hover:text-primary-dark'
                      : 'text-navy hover:text-navy-dark'
                  }`}
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
