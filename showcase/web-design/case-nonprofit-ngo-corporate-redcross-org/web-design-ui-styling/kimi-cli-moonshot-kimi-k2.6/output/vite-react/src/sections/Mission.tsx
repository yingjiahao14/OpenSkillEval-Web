import { Shield, Users, Globe2 } from 'lucide-react'

export default function Mission() {
  return (
    <section id="mission" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-900 tracking-tight mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-warm-600 leading-relaxed">
            Global Aid Alliance prevents and alleviates human suffering in the face
            of emergencies by mobilizing the power of volunteers and the generosity
            of donors.
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-warm-600 leading-relaxed">
            We are guided by the fundamental principles of humanity, impartiality, and
            neutrality. Every day, our teams work across borders and boundaries to
            ensure that help reaches those who need it most — regardless of race,
            religion, nationality, or political affiliation. From the first hours of a
            disaster to the years of recovery that follow, we stand with affected
            communities every step of the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-warm-50 border border-warm-100">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-warm-900 mb-2">Humanity</h3>
            <p className="text-sm text-warm-600">
              We protect life and health and ensure respect for every human being.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-warm-50 border border-warm-100">
            <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-navy" />
            </div>
            <h3 className="font-semibold text-warm-900 mb-2">Impartiality</h3>
            <p className="text-sm text-warm-600">
              We make no discrimination as to nationality, race, or religious beliefs.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-warm-50 border border-warm-100">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-warm-900 mb-2">Neutrality</h3>
            <p className="text-sm text-warm-600">
              We do not take sides in hostilities or engage in political controversies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
