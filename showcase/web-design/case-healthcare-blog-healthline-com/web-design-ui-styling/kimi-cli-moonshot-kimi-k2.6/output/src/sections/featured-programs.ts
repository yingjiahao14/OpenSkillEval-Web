export function renderFeaturedPrograms(): string {
  const programs = [
    { title: "Beginner's Guide to Sensitive Skin", color: "bg-rose-50", iconColor: "text-rose-500" },
    { title: 'Living with Multiple Sclerosis', color: "bg-sky-50", iconColor: "text-sky-500" },
    { title: 'Eczema Solutions: Knowledge for Self-Care', color: "bg-amber-50", iconColor: "text-amber-500" },
    { title: "Men's Wellness", color: "bg-emerald-50", iconColor: "text-emerald-500" },
  ]

  return `
<section class="bg-white py-10 lg:py-14">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-charcoal">Featured Programs</h2>
      <a href="#" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
        View all
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${programs.map(p => `
        <a href="#" class="group block bg-warm-white rounded-xl border border-border-light p-5 hover:shadow-md hover:border-primary/20 transition-all">
          <div class="w-11 h-11 rounded-lg ${p.color} flex items-center justify-center mb-4">
            <svg class="w-5 h-5 ${p.iconColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
            </svg>
          </div>
          <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors">${p.title}</h3>
          <div class="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
            Explore
            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`
}
