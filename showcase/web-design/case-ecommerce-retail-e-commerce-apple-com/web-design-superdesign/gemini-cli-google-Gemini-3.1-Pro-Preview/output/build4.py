with open("/app/output/shop-laptops.html", "r") as f:
    content = f.read()

insert_point = content.find("<!-- Shopping Guides -->")

new_content = content[:insert_point] + """
            <!-- Accessories -->
            <section id="accessories" class="scroll-mt-32 col-span-1 md:col-span-2 mt-12 mb-12">
                <h2 class="text-2xl font-semibold tracking-tight text-orchard-dark mb-6">Accessories. <span class="text-orchard-gray">Make it yours.</span></h2>
                <div class="relative group">
                    <div class="flex overflow-x-auto hide-scroll carousel-snap gap-6 pb-8" id="carousel-accessories">
                        <div class="carousel-item shrink-0 w-[240px] md:w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between">
                            <div>
                                <div class="w-32 h-32 bg-[#f5f5f7] rounded-full mx-auto mb-6 mt-4 flex items-center justify-center"><i data-lucide="mouse" class="w-12 h-12 text-gray-400"></i></div>
                                <h3 class="text-md font-semibold mb-2">Magic Mouse</h3>
                                <p class="text-orchard-dark text-sm font-medium mb-4">$79.00</p>
                            </div>
                        </div>
                        <div class="carousel-item shrink-0 w-[240px] md:w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between">
                            <div>
                                <div class="w-32 h-32 bg-[#f5f5f7] rounded-full mx-auto mb-6 mt-4 flex items-center justify-center"><i data-lucide="keyboard" class="w-12 h-12 text-gray-400"></i></div>
                                <h3 class="text-md font-semibold mb-2">Magic Keyboard</h3>
                                <p class="text-orchard-dark text-sm font-medium mb-4">$99.00</p>
                            </div>
                        </div>
                        <div class="carousel-item shrink-0 w-[240px] md:w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between">
                            <div>
                                <div class="w-32 h-32 bg-[#f5f5f7] rounded-full mx-auto mb-6 mt-4 flex items-center justify-center"><i data-lucide="monitor" class="w-12 h-12 text-gray-400"></i></div>
                                <h3 class="text-md font-semibold mb-2">Studio Display</h3>
                                <p class="text-orchard-dark text-sm font-medium mb-4">$1599.00</p>
                            </div>
                        </div>
                    </div>
                    <button onclick="scrollCarousel('carousel-accessories', -1)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
                    <button onclick="scrollCarousel('carousel-accessories', 1)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
                </div>
            </section>

            <!-- Setup Support -->
            <section id="setup-support" class="scroll-mt-32 col-span-1 md:col-span-2 mb-12">
                <div class="bg-[#f5f5f7] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                    <div class="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                        <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-orchard-dark mb-4">Setup Support</h2>
                        <p class="text-orchard-dark mb-6 max-w-xl">Set up your new device with help from a Specialist — data transfer, features, and more. Online or in a store.</p>
                        <a href="#" class="bg-orchard-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors inline-block">Book a session</a>
                    </div>
                    <div class="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shrink-0">
                        <i data-lucide="users" class="w-16 h-16 md:w-24 md:h-24 text-orchard-dark"></i>
                    </div>
                </div>
            </section>

            <!-- Product Experience -->
            <section id="product-experience" class="scroll-mt-32 col-span-1 md:col-span-2 mb-12">
                <div class="bg-black text-white rounded-2xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
                    <div class="z-10">
                        <p class="text-sm font-bold tracking-widest uppercase mb-2 opacity-80">Orchard Intelligence</p>
                        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Create, communicate, and get things done effortlessly.</h2>
                        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">Explore the power of Orchard Intelligence on your new Laptop.</p>
                        <a href="#" class="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors inline-block">Learn more</a>
                    </div>
                </div>
            </section>

""" + content[insert_point:]

with open("/app/output/shop-laptops.html", "w") as f:
    f.write(new_content)

print("Updated shop-laptops.html")
