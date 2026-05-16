import { useState } from "react"
import { Mail, Check } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F4A261]/10 mb-6">
            <Mail className="w-6 h-6 text-[#F4A261]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-black text-[#2D6A4F] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get the Inside Scoop
          </h2>
          <p className="text-[#2D6A4F]/60 text-sm md:text-base mb-8 max-w-md mx-auto">
            Weekly recipes, new product drops, and exclusive deals delivered
            straight to your inbox.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full sm:flex-1 px-5 py-3 rounded-full border-2 border-[#2D6A4F]/15 bg-white text-sm font-medium text-[#2D6A4F] placeholder:text-[#2D6A4F]/30 focus:outline-none focus:border-[#2D6A4F]/40 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F4A261] text-white font-bold text-sm hover:bg-[#e08c4f] transition-colors shadow-lg shadow-[#F4A261]/20"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[#2D6A4F] font-bold text-sm">
              <div className="p-1.5 rounded-full bg-[#2D6A4F]/10">
                <Check className="w-4 h-4 text-[#2D6A4F]" />
              </div>
              You&apos;re on the list! Check your inbox soon.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
