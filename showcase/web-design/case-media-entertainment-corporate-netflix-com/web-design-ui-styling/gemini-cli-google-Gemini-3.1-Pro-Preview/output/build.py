import json

data = {
    "trending": [
        "Bloodhounds", "BEEF", "XO, Kitty", "War Machine", "Bridgerton", 
        "Stranger Things", "Agent from Above", "Boyfriend on Demand", 
        "KPop Demon Hunters", "Emily in Paris"
    ],
    "features": [
        {"title": "Enjoy on your TV", "desc": "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.", "icon": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />'},
        {"title": "Download your series to watch offline", "desc": "Save your favourites easily and always have something to watch.", "icon": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />'},
        {"title": "Watch everywhere", "desc": "Stream unlimited films and series on your phone, tablet, laptop and TV.", "icon": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />'},
        {"title": "Create profiles for children", "desc": "Send children on adventures with their favourite characters in a space made just for them — free with your membership.", "icon": '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'}
    ],
    "faqs": [
        {"q": "What is StreamWave?", "a": "StreamWave is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more — on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single advert — all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!"},
        {"q": "How much does StreamWave cost?", "a": "Watch StreamWave on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from $15.98 to $29.98/month."},
        {"q": "Where can I watch?", "a": "Watch anywhere, anytime. Sign in with your StreamWave account to watch instantly on the web from your personal computer or on any internet-connected device that offers the StreamWave app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite programmes with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take StreamWave with you anywhere."},
        {"q": "How do I cancel?", "a": "StreamWave is flexible. You can easily cancel your account online in two clicks. There are no cancellation fees — start or stop your account at any time."},
        {"q": "What can I watch on StreamWave?", "a": "StreamWave has an extensive library of feature films, documentaries, series, anime, award-winning StreamWave originals, and more. Watch as much as you want, any time you want."},
        {"q": "Is StreamWave good for children?", "a": "The StreamWave Children's experience is included in your membership to give parents control while children enjoy family-friendly TV programmes and films in their own space. Children's profiles come with PIN-protected parental controls that let you restrict the maturity rating of content children can watch and block specific titles you don't want children to see."}
    ],
    "footer": [
        ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
        ["Help Centre", "Jobs", "Cookie Preferences", "Legal Notices"],
        ["Account", "Ways to Watch", "Corporate Information", "Only on StreamWave"],
        ["Media Centre", "Terms of Use", "Contact Us"]
    ]
}

def generate_index():
    # Head and CSS
    html = """<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StreamWave - Unlimited Films, Series and More</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { brand: { red: '#E50914', dark: '#141414', black: '#000000', white: '#FFFFFF', gray: '#808080' } },
                    fontFamily: { sans: ['Inter', 'sans-serif'], heading: ['Bebas Neue', 'sans-serif'] }
                }
            }
        }
    </script>
    <style>
        body { background-color: #000; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .font-heading { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .text-stroke {
            color: black;
            -webkit-text-stroke: 3px #555;
            text-shadow: 0 0 10px rgba(0,0,0,0.8);
            transition: all 0.3s;
        }
        @media (min-width: 768px) { .text-stroke { -webkit-text-stroke: 4px #555; } }
        .trending-card:hover .text-stroke { -webkit-text-stroke: 4px white; color: rgba(255,255,255,0.1); }
        .hero-bg {
            background-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%), url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
        }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.4s ease; opacity: 0; }
        .faq-item.active .faq-answer { max-height: 800px; padding-bottom: 1.5rem; opacity: 1; }
        .faq-item.active .faq-icon { transform: rotate(45deg); }
    </style>
</head>
<body class="antialiased">
"""
    # Header
    html += """
<!-- Header -->
<header class="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-4 md:px-12 md:py-6">
    <div class="text-brand-red text-4xl md:text-5xl font-heading font-bold tracking-wider">STREAMWAVE</div>
    <div class="flex items-center gap-4 md:gap-6">
        <div class="relative hidden sm:block">
            <select class="appearance-none bg-black/40 border border-gray-600 text-white py-1 pl-3 pr-8 rounded-md text-sm outline-none focus:ring-2 focus:ring-white">
                <option value="en">English</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
        <a href="login.html" class="bg-brand-red hover:bg-red-700 text-white text-sm md:text-base font-semibold py-1.5 px-4 md:px-6 rounded-md transition-colors">Sign In</a>
    </div>
</header>
"""
    # Hero
    html += """
<!-- Hero -->
<section class="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center px-4 hero-bg border-b-8 border-[#232323]">
    <div class="max-w-4xl z-10 pt-16">
        <h1 class="text-5xl md:text-7xl font-bold font-heading mb-4 leading-tight tracking-wide drop-shadow-lg">Unlimited films, series and more</h1>
        <p class="text-lg md:text-2xl font-medium mb-8 drop-shadow-md">Starts at $15.98. Cancel at any time.</p>
        <p class="text-base md:text-lg mb-4 font-light drop-shadow-md">Ready to watch? Enter your email to create or restart your membership.</p>
        <form class="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto" onsubmit="event.preventDefault(); window.location.href='login.html';">
            <input type="email" placeholder="Email address" required class="flex-1 bg-black/60 border border-gray-500 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400 text-lg transition-all">
            <button type="submit" class="bg-brand-red hover:bg-red-700 text-white font-semibold rounded-md px-8 py-3 text-xl md:text-2xl transition-colors flex items-center justify-center gap-2 group">
                Get Started <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </form>
    </div>
</section>
"""
    # Trending
    html += """
<!-- Trending Content -->
<section class="py-16 md:py-20 px-4 md:px-12 border-b-8 border-[#232323] overflow-hidden">
    <div class="max-w-[1600px] mx-auto relative">
        <h2 class="text-3xl md:text-4xl font-semibold mb-6">Trending now</h2>
        <div class="relative group">
            <div id="carousel" class="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 pt-4 scroll-smooth pr-16 md:pr-24">
"""
    
    for i, title in enumerate(data["trending"]):
        rank = i + 1
        html += f"""
                <div class="trending-card relative w-[160px] md:w-[220px] shrink-0 snap-start pl-8 md:pl-12 cursor-pointer">
                    <div class="relative w-full aspect-[2/3] rounded-md overflow-hidden bg-brand-dark transition-transform duration-300 hover:scale-105 hover:ring-4 ring-gray-400">
                        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="{title}">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        <div class="absolute bottom-3 right-3 left-3 text-right">
                            <span class="text-white font-bold text-sm md:text-lg leading-tight drop-shadow-lg">{title}</span>
                        </div>
                    </div>
                    <div class="absolute -left-2 bottom-0 md:-left-4 md:-bottom-2 text-[7rem] md:text-[12rem] font-bold font-heading text-stroke leading-none select-none pointer-events-none drop-shadow-2xl">
                        {rank}
                    </div>
                </div>"""
                
    html += """
            </div>
            <button onclick="document.getElementById('carousel').scrollBy({left: window.innerWidth * 0.6, behavior: 'smooth'})" class="absolute right-0 top-0 bottom-8 w-16 md:w-24 z-20 flex items-center justify-center bg-gradient-to-l from-black via-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 focus:outline-none">
                <svg class="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
    </div>
</section>
"""
    # Features
    html += """
<!-- Platform Features -->
<section class="py-16 md:py-20 px-4 md:px-12 border-b-8 border-[#232323]">
    <div class="max-w-[1200px] mx-auto">
        <h2 class="text-3xl md:text-4xl font-semibold mb-8">More reasons to join</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
"""
    for f in data["features"]:
        html += f"""
            <div class="bg-gradient-to-br from-[#1c1c1c] to-[#121212] p-8 rounded-xl relative min-h-[250px] md:min-h-[300px]">
                <h3 class="text-xl md:text-2xl font-bold mb-4">{f['title']}</h3>
                <p class="text-gray-400 text-sm md:text-base leading-relaxed">{f['desc']}</p>
                <div class="absolute bottom-6 right-6 text-brand-red opacity-80">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">{f['icon']}</svg>
                </div>
            </div>"""
    
    html += """
        </div>
    </div>
</section>
"""

    # FAQ
    html += """
<!-- FAQ -->
<section class="py-16 md:py-20 px-4 md:px-12 border-b-8 border-[#232323]">
    <div class="max-w-[1000px] mx-auto">
        <h2 class="text-3xl md:text-4xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
        <div class="space-y-2 flex flex-col items-center w-full">
"""
    for item in data["faqs"]:
        html += f"""
            <div class="faq-item w-full bg-[#2d2d2d] hover:bg-[#414141] transition-colors cursor-pointer group rounded-sm overflow-hidden">
                <div class="p-6 md:p-8 flex justify-between items-center text-xl md:text-2xl font-medium" onclick="toggleFaq(this)">
                    <span class="group-hover:text-white transition-colors">{item['q']}</span>
                    <svg class="w-8 h-8 faq-icon transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <div class="faq-answer px-6 md:px-8 bg-[#2d2d2d] text-lg md:text-xl border-t border-black">
                    <div class="pt-4 pb-2 leading-normal text-gray-100">{item['a']}</div>
                </div>
            </div>"""

    html += """
        </div>
        <div class="mt-12 text-center max-w-2xl mx-auto">
            <p class="text-base md:text-lg mb-4 font-light">Ready to watch? Enter your email to create or restart your membership.</p>
            <form class="flex flex-col md:flex-row gap-2" onsubmit="event.preventDefault(); window.location.href='login.html';">
                <input type="email" placeholder="Email address" required class="flex-1 bg-black/60 border border-gray-500 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white placeholder-gray-400 text-lg transition-all">
                <button type="submit" class="bg-brand-red hover:bg-red-700 text-white font-semibold rounded-md px-8 py-3 text-xl md:text-2xl transition-colors flex items-center justify-center gap-2 group">
                    Get Started <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </form>
        </div>
    </div>
</section>
"""

    # Footer
    html += """
<!-- Footer -->
<footer class="py-16 px-4 md:px-12 text-gray-400 max-w-[1000px] mx-auto text-sm">
    <p class="mb-8 hover:underline cursor-pointer inline-block">Questions? Contact us.</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
"""
    for col in data["footer"]:
        html += """<ul class="space-y-3">"""
        for link in col:
            html += f"""<li><a href="#" class="hover:underline">{link}</a></li>"""
        html += """</ul>"""
        
    html += """
    </div>
    <div class="relative inline-block mb-6">
        <select class="appearance-none bg-black border border-gray-600 text-gray-400 py-1 pl-3 pr-8 rounded-md text-sm outline-none focus:ring-2 focus:ring-white">
            <option value="en">English</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
    </div>
    <p class="text-xs">StreamWave</p>
    <p class="text-xs mt-4 text-gray-500">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
</footer>

<script>
function toggleFaq(element) {
    const parent = element.parentElement;
    const isActive = parent.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        parent.classList.add('active');
    }
}
</script>
</body>
</html>
"""
    with open('/app/output/index.html', 'w') as f:
        f.write(html)


def generate_login():
    html = """<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StreamWave - Sign In</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { brand: { red: '#E50914', dark: '#141414', black: '#000000', white: '#FFFFFF', gray: '#808080' } },
                    fontFamily: { sans: ['Inter', 'sans-serif'], heading: ['Bebas Neue', 'sans-serif'] }
                }
            }
        }
    </script>
    <style>
        body { background-color: #000; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .font-heading { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
        .bg-image {
            background-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%), url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
        }
        @media (max-width: 768px) {
            .bg-image { background-image: none; background-color: #000; }
        }
        .help-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; opacity: 0; }
        .help-content.open { max-height: 200px; opacity: 1; }
    </style>
</head>
<body class="antialiased bg-image min-h-screen flex flex-col">

<!-- Header -->
<header class="absolute top-0 left-0 w-full z-50 px-4 py-4 md:px-12 md:py-6">
    <a href="index.html" class="text-brand-red text-4xl md:text-5xl font-heading font-bold tracking-wider inline-block">STREAMWAVE</a>
</header>

<!-- Login Form -->
<main class="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
    <div class="bg-black/80 md:bg-black/75 rounded-md w-full max-w-[450px] p-10 md:p-16 border border-gray-800 md:border-none backdrop-blur-sm">
        <h1 class="text-3xl font-bold mb-1">Enter your info to sign in</h1>
        <p class="text-gray-400 mb-8 text-sm">Or get started with a new account.</p>
        
        <form onsubmit="event.preventDefault(); alert('Login submitted successfully!');" class="space-y-4">
            <div class="relative">
                <input type="text" id="email" required class="block w-full appearance-none rounded-sm border border-gray-600 bg-[#333] px-4 pb-2 pt-6 text-white focus:border-white focus:outline-none focus:ring-0 peer" placeholder=" " />
                <label for="email" class="absolute top-4 left-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75">Email address or mobile number</label>
            </div>
            
            <div class="relative">
                <input type="password" id="password" required class="block w-full appearance-none rounded-sm border border-gray-600 bg-[#333] px-4 pb-2 pt-6 text-white focus:border-white focus:outline-none focus:ring-0 peer" placeholder=" " />
                <label for="password" class="absolute top-4 left-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75">Password</label>
            </div>
            
            <button type="submit" class="w-full bg-brand-red hover:bg-red-700 text-white font-semibold rounded-sm py-3 mt-6 transition-colors">Continue</button>
        </form>
        
        <div class="mt-4">
            <button onclick="document.getElementById('help-section').classList.toggle('open')" class="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer inline-flex items-center gap-1 group">
                Get help <svg class="w-3 h-3 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="help-section" class="help-content mt-2 text-sm text-gray-400 space-y-2">
                <p><a href="#" class="hover:underline">Forgot password?</a></p>
                <p><a href="#" class="hover:underline">Forgot email?</a></p>
                <p><a href="#" class="hover:underline">Contact support</a></p>
            </div>
        </div>
        
        <div class="mt-16 text-gray-400 text-sm">
            <p>New to StreamWave? <a href="index.html" class="text-white hover:underline">Sign up now.</a></p>
            <p class="mt-4 text-xs">This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" class="text-blue-500 hover:underline">Learn more.</a></p>
        </div>
    </div>
</main>

<!-- Footer -->
<footer class="bg-black/90 py-8 px-4 md:px-12 text-gray-400 text-sm border-t border-gray-900 w-full mt-auto">
    <div class="max-w-[1000px] mx-auto">
        <p class="mb-6 hover:underline cursor-pointer inline-block">Questions? Contact us.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <ul class="space-y-3">
                <li><a href="#" class="hover:underline">FAQ</a></li>
                <li><a href="#" class="hover:underline">Cookie Preferences</a></li>
            </ul>
            <ul class="space-y-3">
                <li><a href="#" class="hover:underline">Help Centre</a></li>
                <li><a href="#" class="hover:underline">Corporate Information</a></li>
            </ul>
            <ul class="space-y-3">
                <li><a href="#" class="hover:underline">Terms of Use</a></li>
            </ul>
            <ul class="space-y-3">
                <li><a href="#" class="hover:underline">Privacy</a></li>
            </ul>
        </div>
        <div class="relative inline-block mb-4">
            <select class="appearance-none bg-black border border-gray-600 text-gray-400 py-1 pl-3 pr-8 rounded-md text-sm outline-none focus:ring-2 focus:ring-white">
                <option value="en">English</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    </div>
</footer>

</body>
</html>
"""
    with open('/app/output/login.html', 'w') as f:
        f.write(html)

if __name__ == "__main__":
    generate_index()
    generate_login()
    print("Files generated.")
