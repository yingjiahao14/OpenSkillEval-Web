with open("/app/output/shop-tablets.html", "r") as f:
    content = f.read()

insert_point = content.find("<!-- Shopping Guides -->")

new_content = content[:insert_point] + """
            <!-- Accessories -->
            <section id="accessories" class="scroll-mt-32 col-span-1 md:col-span-2 mt-12 mb-12">
                <h2 class="text-2xl font-semibold tracking-tight text-orchard-dark mb-6">Accessories. <span class="text-orchard-gray">Make it yours.</span></h2>
                <div class="relative group">
                    <div class="flex overflow-x-auto hide-scroll carousel-snap gap-6 pb-8" id="carousel-accessories-tablet">
                        <div class="carousel-item shrink-0 w-[240px] md:w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between">
                            <div>
                                <div class="w-32 h-32 bg-[#f5f5f7] rounded-full mx-auto mb-6 mt-4 flex items-center justify-center"><i data-lucide="pen-tool" class="w-12 h-12 text-gray-400"></i></div>
                                <h3 class="text-md font-semibold mb-2">Orchard Pencil</h3>
                                <p class="text-orchard-dark text-sm font-medium mb-4">$129.00</p>
                            </div>
                        </div>
                        <div class="carousel-item shrink-0 w-[240px] md:w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between">
                            <div>
                                <div class="w-32 h-32 bg-[#f5f5f7] rounded-full mx-auto mb-6 mt-4 flex items-center justify-center"><i data-lucide="keyboard" class="w-12 h-12 text-gray-400"></i></div>
                                <h3 class="text-md font-semibold mb-2">Magic Keyboard</h3>
                                <p class="text-orchard-dark text-sm font-medium mb-4">$299.00</p>
                            </div>
                        </div>
                        <div class="carousel-item shrink-0 w-[240px] md:w-[300px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-between">
                            <div>
                                <div class="w-32 h-32 bg-[#f5f5f7] rounded-full mx-auto mb-6 mt-4 flex items-center justify-center"><i data-lucide="shield" class="w-12 h-12 text-gray-400"></i></div>
                                <h3 class="text-md font-semibold mb-2">Smart Folio</h3>
                                <p class="text-orchard-dark text-sm font-medium mb-4">$79.00</p>
                            </div>
                        </div>
                    </div>
                    <button onclick="scrollCarousel('carousel-accessories-tablet', -1)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
                    <button onclick="scrollCarousel('carousel-accessories-tablet', 1)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full p-3 shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-10"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
                </div>
            </section>

            <!-- Store Difference -->
            <section id="store-difference" class="scroll-mt-32 col-span-1 md:col-span-2 mb-12">
                <div class="bg-[#f5f5f7] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                    <div class="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                        <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-orchard-dark mb-4">Orchard Trade In</h2>
                        <p class="text-orchard-dark mb-6 max-w-xl">Trade in your current device. Get credit toward a new one.</p>
                        <a href="#" class="bg-orchard-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors inline-block">Get your estimate</a>
                    </div>
                    <div class="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shrink-0">
                        <i data-lucide="refresh-cw" class="w-16 h-16 md:w-24 md:h-24 text-orchard-dark"></i>
                    </div>
                </div>
            </section>

            <!-- Setup Support -->
            <section id="setup-support" class="scroll-mt-32 col-span-1 md:col-span-2 mb-12">
                <div class="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                    <div class="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                        <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-orchard-dark mb-4">Personal Setup</h2>
                        <p class="text-orchard-dark mb-6 max-w-xl">Set up your new device with help from a Specialist — data transfer, features, and more.</p>
                        <a href="#" class="bg-orchard-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors inline-block">Learn more</a>
                    </div>
                    <div class="w-32 h-32 md:w-48 md:h-48 bg-[#f5f5f7] rounded-full flex items-center justify-center shrink-0">
                        <i data-lucide="smile" class="w-16 h-16 md:w-24 md:h-24 text-orchard-dark"></i>
                    </div>
                </div>
            </section>

            <!-- Product Experience -->
            <section id="product-experience" class="scroll-mt-32 col-span-1 md:col-span-2 mb-12">
                <div class="bg-[#1d1d1f] text-white rounded-2xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
                    <div class="z-10">
                        <p class="text-sm font-bold tracking-widest uppercase mb-2 text-gray-400">Today at Orchard</p>
                        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Explore Tablet in a free session at the Orchard Store.</h2>
                        <a href="#" class="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors inline-block mt-4">Sign up</a>
                    </div>
                </div>
            </section>

            <!-- Special Stores -->
            <section id="special-stores" class="scroll-mt-32 col-span-1 md:col-span-2 mb-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div class="bg-[#f5f5f7] rounded-2xl p-8 h-[300px] flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                        <div class="z-10">
                            <h3 class="text-xl font-semibold mb-2 text-orchard-dark group-hover:underline">Education Pricing</h3>
                            <p class="text-orchard-gray text-sm">Save with education pricing on the Education Store.</p>
                        </div>
                    </div>
                    <div class="bg-[#f5f5f7] rounded-2xl p-8 h-[300px] flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                        <div class="z-10">
                            <h3 class="text-xl font-semibold mb-2 text-orchard-dark group-hover:underline">Certified Refurbished</h3>
                            <p class="text-orchard-gray text-sm">Shop refurbished products backed by a one-year warranty.</p>
                        </div>
                    </div>
                </div>
            </section>

""" + content[insert_point:]

with open("/app/output/shop-tablets.html", "w") as f:
    f.write(new_content)

print("Updated shop-tablets.html")
