export function renderHero(): string {
  return `
<section class="bg-warm-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Text -->
      <div class="order-2 lg:order-1">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Fitness
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight tracking-tight mb-4">
          Day 12: Resistance Band Moves You Can Do in 10 Minutes
        </h1>
        <p class="text-lg text-text-body leading-relaxed mb-6 max-w-xl">
          Simple, beginner-friendly resistance band exercises to build strength and improve flexibility at home.
        </p>
        <div class="flex items-center gap-4">
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
            Read Article
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <span class="inline-flex items-center gap-1.5 text-sm text-text-muted">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            5 min read
          </span>
        </div>
        <!-- Challenge badge -->
        <div class="mt-8 inline-flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-border-light shadow-sm">
          <div class="w-10 h-10 rounded-lg bg-coral-light flex items-center justify-center">
            <svg class="w-5 h-5 text-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
          </div>
          <div>
            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">30-Day Challenge</p>
            <p class="text-sm font-medium text-charcoal">Day 12 of 30</p>
          </div>
        </div>
      </div>

      <!-- Visual -->
      <div class="order-1 lg:order-2">
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-light to-warm-gray border border-border-light">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"/>
                </svg>
              </div>
              <p class="text-lg font-semibold text-charcoal">30-Day Fitness Challenge</p>
              <p class="text-sm text-text-muted mt-1">Resistance Band Workout</p>
            </div>
          </div>
          <!-- Decorative elements -->
          <div class="absolute top-4 right-4 w-16 h-16 rounded-full bg-coral/10 blur-xl"></div>
          <div class="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
        </div>
      </div>
    </div>
  </div>
</section>
`
}
