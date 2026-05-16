export function renderHeader(): string {
  return `
<header class="sticky top-0 z-50 bg-white border-b border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <span class="text-xl font-bold text-charcoal tracking-tight">WellSource</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main navigation">
        <div class="relative">
          <button data-dropdown="menu-health" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Health Conditions
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${renderHealthMenu()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-wellness" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Wellness
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${renderWellnessMenu()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-tools" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Tools
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${renderToolsMenu()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-featured" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Featured
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${renderFeaturedMenu()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-connect" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Connect
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${renderConnectMenu()}
        </div>
      </nav>

      <!-- Secondary Actions -->
      <div class="flex items-center gap-3">
        <a href="#newsletter" class="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary-dark transition-colors">Subscribe</a>
        <a href="#" class="hidden sm:inline-flex text-sm font-medium text-charcoal hover:text-primary transition-colors">Sign In</a>
        <!-- Mobile menu button -->
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-md text-charcoal hover:bg-warm-gray" aria-label="Open menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden lg:hidden border-t border-border-light bg-white">
    <div class="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
      ${renderMobileMenu()}
    </div>
  </div>
</header>
`
}

function renderHealthMenu(): string {
  const items = [
    'Breast Cancer','Chronic Kidney Disease','COPD','Digestive Health','Eye Health',
    'Heart Health','Menopause','Mental Health','Migraine','Multiple Sclerosis',
    "Parkinson's Disease",'Psoriasis','Rheumatoid Arthritis','Sleep Health',
    'Type 2 Diabetes','Weight Management'
  ]
  return renderMegaMenu('menu-health', 'Health Conditions', items)
}

function renderWellnessMenu(): string {
  const items = [
    'CBD','Fitness','Healthy Aging','Hearing','Mental Well-Being','Nutrition',
    'Parenthood','Recipes','Sexual Health','Skin Care','Sleep Health',
    'Vitamins and Supplements',"Women's Wellness"
  ]
  const extras = ['Product Reviews','Featured Programs']
  return renderMegaMenu('menu-wellness', 'Wellness', items, extras)
}

function renderToolsMenu(): string {
  const items = [
    'Pill Identifier','FindCare','Drugs A-Z','Medicare Plans by State',
    'Lessons','Newsletters','Lifestyle Quizzes'
  ]
  return renderMegaMenu('menu-tools', 'Tools', items)
}

function renderFeaturedMenu(): string {
  const items = ['Health News','Top Reads','Video Series']
  return renderMegaMenu('menu-featured', 'Featured', items)
}

function renderConnectMenu(): string {
  const items = ['Bezzy Communities','Facebook','X','Pinterest','Instagram','YouTube']
  return renderMegaMenu('menu-connect', 'Connect', items)
}

function renderMegaMenu(id: string, title: string, items: string[], extras?: string[]): string {
  const extraHtml = extras?.length
    ? `<div class="mt-4 pt-4 border-t border-border-light">
         <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Also in ${title}</p>
         <div class="flex flex-wrap gap-2">
           ${extras.map(e => `<a href="#" class="text-sm text-primary hover:underline">${e}</a>`).join('')}
         </div>
       </div>`
    : ''
  return `
<div id="${id}" class="mega-menu hidden opacity-0 pointer-events-none absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-border-light overflow-hidden transition-opacity duration-200 z-50">
  <div class="p-4">
    <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">${title}</p>
    <ul class="grid grid-cols-1 gap-1">
      ${items.map(item => `
        <li><a href="#" class="block px-3 py-2 text-sm text-charcoal hover:text-primary hover:bg-primary-light rounded-md transition-colors">${item}</a></li>
      `).join('')}
    </ul>
    ${extraHtml}
  </div>
</div>
`
}

function renderMobileMenu(): string {
  const sections = [
    { title: 'Health Conditions', items: ['Breast Cancer','Chronic Kidney Disease','COPD','Digestive Health','Eye Health','Heart Health','Menopause','Mental Health','Migraine','Multiple Sclerosis',"Parkinson's Disease",'Psoriasis','Rheumatoid Arthritis','Sleep Health','Type 2 Diabetes','Weight Management'] },
    { title: 'Wellness', items: ['CBD','Fitness','Healthy Aging','Hearing','Mental Well-Being','Nutrition','Parenthood','Recipes','Sexual Health','Skin Care','Sleep Health','Vitamins and Supplements',"Women's Wellness"] },
    { title: 'Tools', items: ['Pill Identifier','FindCare','Drugs A-Z','Medicare Plans by State','Lessons','Newsletters','Lifestyle Quizzes'] },
    { title: 'Featured', items: ['Health News','Top Reads','Video Series'] },
    { title: 'Connect', items: ['Bezzy Communities','Facebook','X','Pinterest','Instagram','YouTube'] },
  ]
  return sections.map(s => `
    <details class="group">
      <summary class="flex items-center justify-between px-3 py-2 text-sm font-medium text-charcoal cursor-pointer hover:bg-warm-gray rounded-md list-none">
        ${s.title}
        <svg class="w-4 h-4 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </summary>
      <ul class="pl-4 mt-1 space-y-1">
        ${s.items.map(i => `<li><a href="#" class="block px-3 py-1.5 text-sm text-text-body hover:text-primary rounded-md">${i}</a></li>`).join('')}
      </ul>
    </details>
  `).join('')
}
