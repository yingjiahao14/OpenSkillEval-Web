export function renderTrustSection(): string {
  const pillars = [
    {
      icon: 'users',
      title: 'For you, by experts',
      desc: 'Experienced health writers break down complex topics so your choices feel clearer.',
    },
    {
      icon: 'arrow',
      title: 'Built to move you forward',
      desc: 'We pair trusted information with tools and resources to guide your real health decisions.',
    },
    {
      icon: 'shield',
      title: 'Reviewed by professionals',
      desc: 'Content accuracy checked by our medical experts so information is always dependable.',
    },
    {
      icon: 'refresh',
      title: 'Always up to date',
      desc: 'We regularly update our content as medical guidance evolves, so your next steps reflect what\'s current.',
    },
  ]

  return `
<section class="bg-warm-white py-12 lg:py-16 border-y border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-bold text-charcoal mb-3">Why you can trust us on your health journey</h2>
      <p class="text-text-body max-w-xl mx-auto">WellSource is committed to delivering accurate, accessible, and actionable health information you can rely on.</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${pillars.map(p => `
        <div class="bg-white rounded-2xl border border-border-light p-6 text-center hover:shadow-md transition-shadow">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-light flex items-center justify-center">
            ${renderPillarIcon(p.icon)}
          </div>
          <h3 class="text-base font-bold text-charcoal mb-2">${p.title}</h3>
          <p class="text-sm text-text-body leading-relaxed">${p.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
`
}

function renderPillarIcon(name: string): string {
  const icons: Record<string, string> = {
    users: `<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,
    arrow: `<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,
    shield: `<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
    refresh: `<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
  }
  return icons[name] || ''
}
