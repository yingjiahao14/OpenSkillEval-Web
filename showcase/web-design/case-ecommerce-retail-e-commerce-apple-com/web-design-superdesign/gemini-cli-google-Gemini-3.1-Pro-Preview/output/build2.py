import sys
import os

with open("/app/output/store.html", "r") as f:
    content = f.read()

# Find the insertion point before the Quick Links section
insert_point = content.find("<!-- Quick Links -->")

if insert_point == -1:
    print("Could not find insertion point.")
    sys.exit(1)

new_content = content[:insert_point] + """
        <!-- The Store difference -->
        <section class="mb-20">
            <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-orchard-dark mb-2">The Orchard Store difference. <span class="text-orchard-gray">Even more reasons to shop with us.</span></h2>
            
            <div class="relative group mt-8">
                <div class="flex overflow-x-auto hide-scroll carousel-snap gap-6 pb-8" id="carousel-difference">
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-[#f5f5f7] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="refresh-ccw" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Trade-In</h3>
                            <p class="text-orchard-dark mb-4">Trade in your current device. Get credit toward a new one.</p>
                        </div>
                    </div>
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-[#f5f5f7] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="credit-card" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Flexible Payment</h3>
                            <p class="text-orchard-dark mb-4">Pay in full or pay over time. Your choice.</p>
                        </div>
                    </div>
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-[#f5f5f7] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="smile" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Personalization</h3>
                            <p class="text-orchard-dark mb-4">Engrave a mix of emoji, names, and numbers for free.</p>
                        </div>
                    </div>
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-[#f5f5f7] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="truck" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p class="text-orchard-dark mb-4">Enjoy two-hour delivery from an Orchard Store, free delivery, or easy pickup.</p>
                        </div>
                    </div>
                </div>
                <button onclick="scrollCarousel('carousel-difference', -1)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
                <button onclick="scrollCarousel('carousel-difference', 1)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
            </div>
        </section>
        
        <!-- Savings and offers -->
        <section class="mb-20">
            <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-orchard-dark mb-2">Savings and offers. <span class="text-orchard-gray">Exclusive deals, special stores and more.</span></h2>
            
            <div class="relative group mt-8">
                <div class="flex overflow-x-auto hide-scroll carousel-snap gap-6 pb-8" id="carousel-savings">
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="tag" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Carrier Deals</h3>
                            <p class="text-orchard-dark mb-4">Get up to $800–$1,100 in credit on a new Phone after trade-in.</p>
                        </div>
                    </div>
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="graduation-cap" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Education</h3>
                            <p class="text-orchard-dark mb-4">Buy a new Laptop or Tablet with education savings.</p>
                        </div>
                    </div>
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="check-circle" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Certified Refurbished</h3>
                            <p class="text-orchard-dark mb-4">Shop refurbished products backed by a one-year warranty.</p>
                        </div>
                    </div>
                    <div class="carousel-item shrink-0 w-[300px] md:w-[480px] h-[320px] bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                        <i data-lucide="briefcase" class="w-8 h-8 text-orchard-dark"></i>
                        <div>
                            <h3 class="text-xl font-semibold mb-2">Small Business</h3>
                            <p class="text-orchard-dark mb-4">Simple solutions for all the ways you work.</p>
                        </div>
                    </div>
                </div>
                <button onclick="scrollCarousel('carousel-savings', -1)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
                <button onclick="scrollCarousel('carousel-savings', 1)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
            </div>
        </section>

""" + content[insert_point:]

with open("/app/output/store.html", "w") as f:
    f.write(new_content)

print("Updated store.html")
