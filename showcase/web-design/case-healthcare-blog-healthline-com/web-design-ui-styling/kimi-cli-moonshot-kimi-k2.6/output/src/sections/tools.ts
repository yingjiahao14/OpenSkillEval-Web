export function renderTools(): string {
  return `
<section class="bg-warm-white py-10 lg:py-14 border-y border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-xl sm:text-2xl font-bold text-charcoal mb-6">Health Tools</h2>
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Nutrition Hub -->
      <div class="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
        <div class="flex items-start gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-2.687c-1.718-.293-2.3-2.379-1.067-3.61L4.2 15.3"/></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-charcoal mb-1">Nutrition Hub</h3>
            <p class="text-sm text-text-body leading-relaxed">Take charge of your nutrition with guidance on meal planning, diets, supplements, and more from our dietitians and nutritionists.</p>
          </div>
        </div>
        <div class="space-y-3 mb-5">
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Recipe Hub</p>
              <p class="text-xs text-text-muted">Try 400+ recipes for different dietary preferences</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Macronutrient Calculator</p>
              <p class="text-xs text-text-muted">Calculate your daily carb, protein, and fat goals</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Calorie Calculator</p>
              <p class="text-xs text-text-muted">Learn how many calories you need for your weight goals</p>
            </div>
          </div>
        </div>
        <a href="#" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
          Visit Nutrition Hub
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
        </a>
      </div>

      <!-- Drug & Care Tools -->
      <div class="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
        <div class="flex items-start gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-charcoal mb-1">Drug & Care Tools</h3>
            <p class="text-sm text-text-body leading-relaxed">Find medications, identify pills, compare care options, and locate doctors near you.</p>
          </div>
        </div>
        <div class="space-y-3 mb-5">
          <div class="p-4 rounded-xl bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-semibold text-charcoal">Drug Directory: A to Z</p>
              <span class="text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded-md">Search drugs</span>
            </div>
            <p class="text-xs text-text-muted">Learn everything you need to know about specific prescriptions and over-the-counter medications.</p>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Pill Identifier</p>
              <p class="text-xs text-text-muted">Identify an unknown tablet or capsule</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">GLP-1 Resource</p>
              <p class="text-xs text-text-muted">Compare places to buy weight-loss medications online</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">FindCare</p>
              <p class="text-xs text-text-muted">Find local doctors who accept your insurance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`
}
