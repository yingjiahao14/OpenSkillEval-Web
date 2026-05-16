export function renderLatestVideos(): string {
  const videos = [
    { title: '7 Types of Exercises to Relieve Constipation', duration: '4:32' },
    { title: 'What Every Psoriasis Patient Needs to Know About Flares and Stress', duration: '6:15' },
    { title: "Parkinson's Disease: 5 Progression Stages", duration: '5:48' },
    { title: 'Chronic Spontaneous Urticaria Facts and Resources', duration: '3:55' },
  ]

  return `
<section class="bg-warm-white py-10 lg:py-14 border-t border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-charcoal">Latest Videos</h2>
      <a href="#" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
        View all videos
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${videos.map(v => `
        <a href="#" class="group block bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
          <div class="relative aspect-video bg-charcoal/5 flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-medium">${v.duration}</span>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors line-clamp-2">${v.title}</h3>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`
}
