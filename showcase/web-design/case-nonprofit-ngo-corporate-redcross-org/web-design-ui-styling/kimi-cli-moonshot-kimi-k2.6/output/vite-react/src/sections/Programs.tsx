import { useState } from 'react'
import {
  ChevronDown,
  Home,
  Droplets,
  ShieldCheck,
  Globe2,
  HeartPulse,
} from 'lucide-react'

const programs = [
  {
    id: 'disaster-relief',
    title: 'Disaster Relief',
    icon: Home,
    description:
      'Rapid deployment of emergency shelter, food, water, and medical supplies to communities affected by natural disasters and conflict. Our response teams are on the ground within 24 hours.',
    details: [
      'Emergency shelter and housing assistance',
      'Food and water distribution',
      'Medical supply delivery',
      'Search and rescue coordination',
      'Long-term recovery planning',
    ],
  },
  {
    id: 'blood-donation',
    title: 'Blood Donation',
    icon: Droplets,
    description:
      'Operating one of the largest blood collection networks, we supply approximately 40% of the nation\'s blood and blood products to hospitals and medical facilities.',
    details: [
      'Mobile blood drives nationwide',
      'Plasma and platelet collection',
      'Rare blood type registry',
      'Hospital partnership network',
      'Emergency blood reserve',
    ],
  },
  {
    id: 'emergency-preparedness',
    title: 'Emergency Preparedness',
    icon: ShieldCheck,
    description:
      'Training individuals, families, and organizations to prepare for and respond to emergencies through workshops, certification courses, and community drills.',
    details: [
      'CPR and First Aid certification',
      'Family emergency planning',
      'Community drill coordination',
      'Disaster response training',
      'School safety programs',
    ],
  },
  {
    id: 'international-aid',
    title: 'International Humanitarian Aid',
    icon: Globe2,
    description:
      'Partnering with a global network of humanitarian organizations to deliver relief and recovery programs in conflict zones and disaster-affected regions worldwide.',
    details: [
      'Conflict zone relief operations',
      'Refugee camp support',
      'Water and sanitation projects',
      'Medical mission deployments',
      'Reconstruction programs',
    ],
  },
  {
    id: 'community-health',
    title: 'Community Health',
    icon: HeartPulse,
    description:
      'Providing health and safety education, disease prevention programs, and support services to underserved communities, including mental health resources for disaster survivors.',
    details: [
      'Disease prevention education',
      'Mental health counseling',
      'Health screening services',
      'Vaccination campaigns',
      'Community health worker training',
    ],
  },
]

export default function Programs() {
  const [openId, setOpenId] = useState<string | null>('disaster-relief')

  return (
    <section id="programs" className="py-16 sm:py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-900 tracking-tight mb-4">
            Programs & Services
          </h2>
          <p className="text-warm-600">
            From immediate disaster response to long-term community health, our
            programs address critical needs at every stage of recovery.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {programs.map((program) => {
            const isOpen = openId === program.id
            const Icon = program.icon
            return (
              <div
                key={program.id}
                className="bg-white rounded-xl border border-warm-200 overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : program.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-primary text-white' : 'bg-warm-100 text-warm-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1 font-semibold text-warm-900">
                    {program.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-warm-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`accordion-content ${isOpen ? 'open' : ''}`}
                >
                  <div className="accordion-inner">
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-warm-600 mb-4">{program.description}</p>
                      <ul className="space-y-2">
                        {program.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-warm-700"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
