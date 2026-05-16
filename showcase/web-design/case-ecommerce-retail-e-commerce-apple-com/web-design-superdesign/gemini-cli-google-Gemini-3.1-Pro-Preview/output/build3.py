with open("/app/output/store.html", "r") as f:
    content = f.read()

# Add brand collaboration section
insert_point = content.find("<!-- Savings and offers -->")

new_content = content[:insert_point] + """
        <!-- Brand Collaboration -->
        <section class="mb-20">
            <h2 class="text-2xl md:text-3xl font-semibold tracking-tight text-orchard-dark mb-2">Athletica × SoundPro. <span class="text-orchard-gray">Sport with style.</span></h2>
            
            <div class="mt-8 bg-black text-white rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden h-[400px]">
                <div class="z-10 w-full md:w-1/2 text-center md:text-left">
                    <p class="text-xl md:text-2xl font-light mb-6 text-gray-300">Two icons join forces to level up your workout.</p>
                    <div class="flex gap-4 justify-center md:justify-start">
                        <a href="#" class="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Shop the collection</a>
                    </div>
                </div>
            </div>
        </section>
""" + content[insert_point:]

with open("/app/output/store.html", "w") as f:
    f.write(new_content)

print("Added brand collaboration")
