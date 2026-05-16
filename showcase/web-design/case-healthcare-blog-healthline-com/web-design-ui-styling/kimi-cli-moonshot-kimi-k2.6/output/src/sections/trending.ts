export function renderTrending(): string {
  const articles = [
    { category: 'Heart Health', title: 'How to Make a Heart-Healthy Grocery List', color: 'bg-rose-50 text-rose-700' },
    { category: 'Wellness', title: 'The Worst U.S. Cities for Spring Allergies in 2026, Ranked', color: 'bg-emerald-50 text-emerald-700' },
    { category: 'Lifestyle', title: 'Can You Run a Marathon … with POTS?', color: 'bg-amber-50 text-amber-700' },
    { category: 'Products', title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', color: 'bg-sky-50 text-sky-700' },
  ]

  return `
<section class="bg-white border-b border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center gap-3 mb-5">
      <svg class="w-5 h-5 text-coral" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/></svg>
      <h2 class="text-lg font-bold text-charcoal">Trending Now</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${articles.map(a => `
        <a href="#" class="group block p-4 rounded-xl border border-border-light hover:border-primary/30 hover:shadow-md transition-all bg-warm-white">
          <span class="inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${a.color} mb-2">${a.category}</span>
          <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors">${a.title}</h3>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`
}
