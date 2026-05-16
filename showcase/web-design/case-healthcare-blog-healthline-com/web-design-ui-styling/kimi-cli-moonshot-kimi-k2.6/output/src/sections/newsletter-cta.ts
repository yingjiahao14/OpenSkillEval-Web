export function renderNewsletterCTA(): string {
  return `
<section id="newsletter" class="bg-primary">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    <div class="max-w-2xl mx-auto text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/15 flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">The best of health and wellness</h2>
      <p class="text-primary-light text-base mb-8">We do the research so you don't have to. Stay in the know with the latest in health and wellness.</p>
      <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="event.preventDefault(); alert('Thanks for subscribing!');">
        <input 
          type="email" 
          required
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent text-sm"
        />
        <button type="submit" class="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-warm-white transition-colors shadow-sm text-sm whitespace-nowrap">
          Join Now
        </button>
      </form>
      <p class="mt-3 text-xs text-white/60">Your privacy is important to us.</p>
    </div>
  </div>
</section>
`
}
