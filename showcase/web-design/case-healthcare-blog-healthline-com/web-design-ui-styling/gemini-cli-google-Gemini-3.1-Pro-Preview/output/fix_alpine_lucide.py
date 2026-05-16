with open('/app/output/index.html', 'r') as f:
    html = f.read()

# Replace the problematic x-effect line with a clean solution
bad_line = '<!-- Force Lucide Icons to Re-render on Tab Change -->\n      <div x-data x-effect="lucide.createIcons()"></div>'

new_script = """<!-- Icon Rendering Hook -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <template x-for="(article, index) in currentArticles" :key="activeTab + index">
            <a href="#" class="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 bg-white"
               x-init="$nextTick(() => { lucide.createIcons({root: $el}) })">
              <div :class="article.bg" class="h-48 relative overflow-hidden flex items-center justify-center">
                <!-- Using inline SVG or standard tags can be tricky with lucide via x-for. 
                     We use x-html to inject the icon directly or a wrapper div -->
                <div x-init="$nextTick(() => { lucide.createIcons({root: $el}) })" class="w-16 h-16 opacity-50 group-hover:scale-110 transition duration-500" :class="article.color.startsWith('[') ? 'text-' + article.color : 'text-' + article.color">
                   <i :data-lucide="article.icon"></i>
                </div>
              </div>
              <div class="p-5">
                <span class="text-xs font-bold text-brand uppercase tracking-wider mb-2 block" x-text="article.category"></span>
                <h3 class="font-bold text-charcoal text-lg mb-2 leading-snug group-hover:text-brand transition" x-text="article.title"></h3>
              </div>
            </a>
          </template>
        </div>"""

import re
# Replace the whole <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">...</div> and the bad_line
html = re.sub(r'<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">.*?</template>\n\s*</div>\n\s*</div>\n\s*<!-- Force Lucide Icons to Re-render on Tab Change -->\n\s*<div x-data x-effect="lucide.createIcons\(\)"></div>', new_script + "\n      </div>", html, flags=re.DOTALL)

with open('/app/output/index.html', 'w') as f:
    f.write(html)
