export function renderRecommendedReads(): string {
  const tabs = ['Top Reads', 'Fitness', 'Mental Well-Being', 'Product Reviews', 'Recipes', 'Skin Care']

  const articles: Record<string, Array<{ title: string; category: string; readTime: string; imageColor: string }>> = {
    'Top Reads': [
      { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', readTime: '6 min', imageColor: 'bg-emerald-50' },
      { title: 'Does Ozempic Cause Hair Loss?', category: 'Medications', readTime: '5 min', imageColor: 'bg-violet-50' },
      { title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds', category: 'Health News', readTime: '4 min', imageColor: 'bg-rose-50' },
      { title: 'Can Music Therapy Help with Depression?', category: 'Mental Health', readTime: '7 min', imageColor: 'bg-amber-50' },
      { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', readTime: '4 min', imageColor: 'bg-sky-50' },
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', readTime: '8 min', imageColor: 'bg-teal-50' },
    ],
    'Fitness': [
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', readTime: '8 min', imageColor: 'bg-teal-50' },
      { title: 'Day 12: Resistance Band Moves You Can Do in 10 Minutes', category: 'Fitness', readTime: '5 min', imageColor: 'bg-primary-light' },
      { title: '7 Types of Exercises to Relieve Constipation', category: 'Fitness', readTime: '4 min', imageColor: 'bg-emerald-50' },
      { title: 'Can You Run a Marathon … with POTS?', category: 'Lifestyle', readTime: '6 min', imageColor: 'bg-amber-50' },
      { title: 'How to Make a Heart-Healthy Grocery List', category: 'Heart Health', readTime: '5 min', imageColor: 'bg-rose-50' },
      { title: 'The Worst U.S. Cities for Spring Allergies in 2026, Ranked', category: 'Wellness', readTime: '4 min', imageColor: 'bg-sky-50' },
    ],
    'Mental Well-Being': [
      { title: 'Can Music Therapy Help with Depression?', category: 'Mental Health', readTime: '7 min', imageColor: 'bg-amber-50' },
      { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', readTime: '4 min', imageColor: 'bg-sky-50' },
      { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', readTime: '6 min', imageColor: 'bg-emerald-50' },
      { title: 'Does Ozempic Cause Hair Loss?', category: 'Medications', readTime: '5 min', imageColor: 'bg-violet-50' },
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', readTime: '8 min', imageColor: 'bg-teal-50' },
      { title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds', category: 'Health News', readTime: '4 min', imageColor: 'bg-rose-50' },
    ],
    'Product Reviews': [
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', readTime: '8 min', imageColor: 'bg-teal-50' },
      { title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', category: 'Products', readTime: '6 min', imageColor: 'bg-violet-50' },
      { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', readTime: '6 min', imageColor: 'bg-emerald-50' },
      { title: 'Does Ozempic Cause Hair Loss?', category: 'Medications', readTime: '5 min', imageColor: 'bg-rose-50' },
      { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', readTime: '4 min', imageColor: 'bg-sky-50' },
      { title: 'Can Music Therapy Help with Depression?', category: 'Mental Health', readTime: '7 min', imageColor: 'bg-amber-50' },
    ],
    'Recipes': [
      { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', readTime: '6 min', imageColor: 'bg-emerald-50' },
      { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', readTime: '4 min', imageColor: 'bg-sky-50' },
      { title: 'How to Make a Heart-Healthy Grocery List', category: 'Heart Health', readTime: '5 min', imageColor: 'bg-rose-50' },
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', readTime: '8 min', imageColor: 'bg-teal-50' },
      { title: 'Does Ozempic Cause Hair Loss?', category: 'Medications', readTime: '5 min', imageColor: 'bg-violet-50' },
      { title: 'Can Music Therapy Help with Depression?', category: 'Mental Health', readTime: '7 min', imageColor: 'bg-amber-50' },
    ],
    'Skin Care': [
      { title: 'Beginner\'s Guide to Sensitive Skin', category: 'Skin Care', readTime: '6 min', imageColor: 'bg-rose-50' },
      { title: 'Eczema Solutions: Knowledge for Self-Care', category: 'Skin Care', readTime: '5 min', imageColor: 'bg-amber-50' },
      { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', readTime: '6 min', imageColor: 'bg-emerald-50' },
      { title: 'Does Ozempic Cause Hair Loss?', category: 'Medications', readTime: '5 min', imageColor: 'bg-violet-50' },
      { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', readTime: '4 min', imageColor: 'bg-sky-50' },
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', readTime: '8 min', imageColor: 'bg-teal-50' },
    ],
  }

  return `
<section class="bg-white py-10 lg:py-14">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-xl sm:text-2xl font-bold text-charcoal mb-6">Recommended Reads</h2>
    <div data-tabs>
      <!-- Tab List -->
      <div class="flex gap-1 overflow-x-auto pb-1 mb-6 border-b border-border-light" role="tablist" aria-label="Recommended reads categories">
        ${tabs.map((tab, i) => `
          <button 
            data-tab="${tab}" 
            role="tab" 
            aria-selected="${i === 0 ? 'true' : 'false'}"
            class="px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${i === 0 ? 'text-primary border-primary' : 'text-text-muted border-transparent hover:text-charcoal'}"
          >${tab}</button>
        `).join('')}
      </div>
      <!-- Tab Panels -->
      ${tabs.map((tab, i) => `
        <div data-tab-panel="${tab}" class="${i === 0 ? '' : 'hidden'}" role="tabpanel">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${articles[tab].map(a => `
              <a href="#" class="group block bg-warm-white rounded-xl border border-border-light overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
                <div class="aspect-[16/10] ${a.imageColor} flex items-center justify-center">
                  <svg class="w-10 h-10 text-charcoal/20" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                  </svg>
                </div>
                <div class="p-4">
                  <span class="inline-block text-xs font-semibold text-primary mb-1.5">${a.category}</span>
                  <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors line-clamp-2">${a.title}</h3>
                  <div class="flex items-center gap-2 mt-2 text-xs text-text-muted">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    ${a.readTime} read
                  </div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`
}
