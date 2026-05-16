export function renderHealthTopics(): string {
  const topics = [
    { name: 'Anxiety & Depression', color: 'from-violet-100 to-violet-50', iconColor: 'text-violet-600' },
    { name: 'Digestive Health', color: 'from-emerald-100 to-emerald-50', iconColor: 'text-emerald-600' },
    { name: 'Heart Health', color: 'from-rose-100 to-rose-50', iconColor: 'text-rose-600' },
    { name: 'Menopause', color: 'from-amber-100 to-amber-50', iconColor: 'text-amber-600' },
    { name: 'Type 2 Diabetes', color: 'from-sky-100 to-sky-50', iconColor: 'text-sky-600' },
    { name: 'Weight Management', color: 'from-teal-100 to-teal-50', iconColor: 'text-teal-600' },
  ]

  return `
<section class="bg-white py-10 lg:py-14">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-charcoal">Health Topics</h2>
      <a href="#" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
        View all
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </a>
    </div>
    <div data-carousel class="relative">
      <div data-carousel-track class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style="scrollbar-width:none;-ms-overflow-style:none;">
        ${topics.map(t => `
          <a href="#" class="snap-start shrink-0 flex flex-col items-center gap-3 group">
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${t.color} border-2 border-border-light group-hover:border-primary/30 flex items-center justify-center transition-all group-hover:shadow-md">
              <svg class="w-10 h-10 ${t.iconColor}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-charcoal group-hover:text-primary transition-colors text-center max-w-[120px]">${t.name}</span>
          </a>
        `).join('')}
      </div>
      <!-- Navigation arrows -->
      <button data-carousel-prev class="absolute left-0 top-10 -translate-x-2 w-9 h-9 rounded-full bg-white shadow-md border border-border-light flex items-center justify-center text-charcoal hover:text-primary hover:shadow-lg transition-all z-10 hidden sm:flex">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
      </button>
      <button data-carousel-next class="absolute right-0 top-10 translate-x-2 w-9 h-9 rounded-full bg-white shadow-md border border-border-light flex items-center justify-center text-charcoal hover:text-primary hover:shadow-lg transition-all z-10 hidden sm:flex">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </button>
    </div>
  </div>
</section>
`
}
