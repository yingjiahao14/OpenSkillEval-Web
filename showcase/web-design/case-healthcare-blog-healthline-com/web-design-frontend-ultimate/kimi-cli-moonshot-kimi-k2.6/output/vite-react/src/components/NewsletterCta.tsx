import { useState } from "react";
import { siteConfig } from "../config/site";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="bg-teal-600 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/30 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-700/30 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <Mail className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 font-display">
            {siteConfig.newsletterCta.heading}
          </h2>
          <p className="text-teal-100 text-base lg:text-lg mb-8 leading-relaxed">
            {siteConfig.newsletterCta.body}
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-white font-medium py-4">
              <CheckCircle className="w-5 h-5" />
              <span>You're on the list! Check your inbox soon.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-teal-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-white text-teal-700 font-bold text-sm hover:bg-teal-50 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {siteConfig.newsletterCta.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-teal-200 text-xs mt-4">
            {siteConfig.newsletterCta.privacy}
          </p>
        </div>
      </div>
    </section>
  );
}
