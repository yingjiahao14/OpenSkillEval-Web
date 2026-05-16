import re

with open('/app/output/index.html', 'r') as f:
    html = f.read()

# Find the Recommended Reads section
start_marker = "<!-- Recommended Reads with Tabs -->"
end_marker = "<!-- Newsletter CTA -->"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_section = """<!-- Recommended Reads with Tabs -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 lg:px-8" x-data="{ 
            activeTab: 'Top Reads',
            articles: {
              'Top Reads': [
                { category: 'Nutrition', title: '16 Superfoods That Are Worthy of the Title', icon: 'leaf', color: 'brand', bg: 'gradient-placeholder' },
                { category: 'Medication', title: 'Does Ozempic Cause Hair Loss?', icon: 'scissors', color: '[#FF8A3D]', bg: 'bg-[#FFF0E5]' },
                { category: 'Mental Health', title: 'Can Music Therapy Help with Depression?', icon: 'music', color: '[#3D94FF]', bg: 'bg-[#E5F2FF]' },
                { category: 'Technology', title: 'These Are the 8 Best Calorie Counter Apps', icon: 'smartphone', color: '[#943DFF]', bg: 'bg-[#F0E5FF]' }
              ],
              'Fitness': [
                { category: 'Workouts', title: '10-Minute Morning Stretch Routine', icon: 'activity', color: 'amber', bg: 'bg-amber/10' },
                { category: 'Running', title: 'How to Train for a Half Marathon', icon: 'zap', color: 'brand', bg: 'gradient-placeholder' },
                { category: 'Strength', title: 'Why Women Over 40 Should Lift Weights', icon: 'dumbbell', color: 'coral', bg: 'bg-coral/10' },
                { category: 'Recovery', title: 'The Best Foam Rollers for Sore Muscles', icon: 'heart-pulse', color: '[#3D94FF]', bg: 'bg-[#E5F2FF]' }
              ],
              'Mental Well-Being': [
                { category: 'Anxiety', title: '5 Breathing Exercises for Panic Attacks', icon: 'wind', color: '[#943DFF]', bg: 'bg-[#F0E5FF]' },
                { category: 'Stress', title: 'How Stress Impacts Your Digestion', icon: 'brain-circuit', color: '[#FF8A3D]', bg: 'bg-[#FFF0E5]' },
                { category: 'Mindfulness', title: 'A Beginner\\'s Guide to Meditation', icon: 'flower-2', color: 'brand', bg: 'gradient-placeholder' },
                { category: 'Sleep', title: 'Why Can\\'t I Sleep? 10 Common Causes', icon: 'moon', color: '[#3D94FF]', bg: 'bg-[#E5F2FF]' }
              ],
              'Product Reviews': [
                { category: 'Sleep Tech', title: 'We Tested the Oura Ring for 30 Days', icon: 'smartphone', color: '[#3D94FF]', bg: 'bg-[#E5F2FF]' },
                { category: 'Ergonomics', title: 'The 5 Best Standing Desks of 2026', icon: 'sofa', color: 'brand', bg: 'gradient-placeholder' },
                { category: 'Fitness', title: 'Are Smart Scales Actually Accurate?', icon: 'scale', color: '[#943DFF]', bg: 'bg-[#F0E5FF]' },
                { category: 'Nutrition', title: 'Top-Rated Blender for Smoothies', icon: 'utensils', color: 'amber', bg: 'bg-amber/10' }
              ],
              'Recipes': [
                { category: 'Breakfast', title: 'High-Protein Overnight Oats 3 Ways', icon: 'coffee', color: 'amber', bg: 'bg-amber/10' },
                { category: 'Dinner', title: 'Sheet Pan Lemon Herb Salmon', icon: 'fish', color: 'brand', bg: 'gradient-placeholder' },
                { category: 'Snacks', title: 'Energy Bites That Won\\'t Spike Blood Sugar', icon: 'zap', color: 'coral', bg: 'bg-coral/10' },
                { category: 'Meal Prep', title: '5 Easy Mediterranean Lunches', icon: 'utensils', color: '[#FF8A3D]', bg: 'bg-[#FFF0E5]' }
              ],
              'Skin Care': [
                { category: 'Routine', title: 'The Ultimate Guide to Retinol', icon: 'droplet', color: '[#3D94FF]', bg: 'bg-[#E5F2FF]' },
                { category: 'Acne', title: 'How to Build an Acne-Safe Skincare Routine', icon: 'sparkles', color: 'brand', bg: 'gradient-placeholder' },
                { category: 'Sun Protection', title: 'The Best Mineral Sunscreens for Dark Skin', icon: 'sun', color: 'amber', bg: 'bg-amber/10' },
                { category: 'Anti-Aging', title: 'Do Collagen Supplements Actually Work?', icon: 'flask-conical', color: '[#943DFF]', bg: 'bg-[#F0E5FF]' }
              ]
            },
            get currentArticles() {
              return this.articles[this.activeTab] || this.articles['Top Reads'];
            }
          }">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <h2 class="text-3xl font-bold text-charcoal mb-4 md:mb-0">Recommended Reads</h2>
          
          <!-- Tabs -->
          <div class="flex space-x-1 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            <template x-for="tab in ['Top Reads', 'Fitness', 'Mental Well-Being', 'Product Reviews', 'Recipes', 'Skin Care']">
              <button @click="activeTab = tab"
                      :class="{'bg-brand text-white shadow-sm': activeTab === tab, 'text-charcoal hover:bg-gray-100': activeTab !== tab}"
                      class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
                      x-text="tab"></button>
            </template>
          </div>
        </div>

        <!-- Article Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <template x-for="(article, index) in currentArticles" :key="activeTab + index">
            <a href="#" class="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 bg-white"
               x-transition:enter="transition ease-out duration-300"
               x-transition:enter-start="opacity-0 transform scale-95"
               x-transition:enter-end="opacity-100 transform scale-100">
              <div :class="article.bg" class="h-48 relative overflow-hidden flex items-center justify-center">
                <i :data-lucide="article.icon" :class="'text-' + article.color" class="w-16 h-16 opacity-50 group-hover:scale-110 transition duration-500"></i>
              </div>
              <div class="p-5">
                <span class="text-xs font-bold text-brand uppercase tracking-wider mb-2 block" x-text="article.category"></span>
                <h3 class="font-bold text-charcoal text-lg mb-2 leading-snug group-hover:text-brand transition" x-text="article.title"></h3>
              </div>
            </a>
          </template>
        </div>
      </div>
      
      <!-- Force Lucide Icons to Re-render on Tab Change -->
      <div x-data x-effect="lucide.createIcons()"></div>
    </section>

    """
    
    updated_html = html[:start_idx] + new_section + html[end_idx:]
    with open('/app/output/index.html', 'w') as f:
        f.write(updated_html)
