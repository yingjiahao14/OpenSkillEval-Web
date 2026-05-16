import{n as e,t}from"./nav-CWDOnK3C.js";function n(){let e=[`Nexora`,`Pinnacle`,`Orbis`,`Kinetic`,`Lumina`,`Helix`],t=[`Streamline`,`Beacon`,`Prism`,`Zenith`,`Forge`,`Catalyst`],n=[`Vertex`,`Horizon`,`Atlas`,`Meridian`,`Crest`,`Ember`];function r(e,t){let n=[...e,...e,...e,...e].map(e=>`<span class="text-2xl md:text-3xl font-serif font-semibold italic whitespace-nowrap text-[#1A1A1A] opacity-80">${e} <span class="text-[#C27B5A] mx-1">◦</span></span>`).join(` `);return`
      <div class="marquee-row py-3 border-b border-[#D4C5B2]">
        <div class="marquee-track marquee-${t}" style="animation: scroll-${t} 40s linear infinite;">
          ${n}
        </div>
        <div class="marquee-track marquee-${t}" style="animation: scroll-${t} 40s linear infinite;" aria-hidden="true">
          ${n}
        </div>
      </div>
    `}return`
    <style>
      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes scroll-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      .marquee-left {
        animation: scroll-left 40s linear infinite !important;
      }
      .marquee-right {
        animation: scroll-right 40s linear infinite !important;
      }
    </style>
    <section class="w-full overflow-hidden py-12 md:py-20">
      <div class="section-label text-center">Selected Clients</div>
      ${r(e,`left`)}
      ${r(t,`right`)}
      ${r(n,`left`)}
    </section>
  `}var r=`index.html`;document.querySelector(`#app`).innerHTML=`
  ${e(r)}

  <main>
    <!-- Hero -->
    <section class="w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-16 md:pt-24 pb-16 md:pb-24">
      <h1 class="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] max-w-[14ch]">
        Hi. We're a strategic design and innovation studio.
      </h1>
    </section>

    <!-- Media Showcase — Triptych -->
    <section class="w-full max-w-[1400px] mx-auto px-8 md:px-16 pb-16 md:pb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div class="media-block bg-[#C27B5A]"></div>
        <div class="media-block bg-[#8B9D83]"></div>
        <div class="media-block bg-[#D4C5B2]"></div>
      </div>
    </section>

    <!-- Client Marquee -->
    ${n()}

    <!-- About -->
    <section class="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-16 md:py-24">
      <div class="section-label">About Us</div>
      <div class="max-w-[720px]">
        <p class="editorial-body text-lg md:text-xl leading-relaxed mb-8">
          We've worked with many of the most innovative companies in the world on large scale, strategic product and brand initiatives. We've built products used daily by hundreds of millions of people and created brands that changed industries.
        </p>
        <p class="editorial-body text-base md:text-lg leading-relaxed mb-8">
          We've won multiple industry awards, including Webby Awards, Red Dot Design Awards, D&AD Pencils, Cannes Lions, FWA's, Awwwards, and many more. We've been named one of the Ad Age best places to work, and we landed on the Inc. 5000 with the fastest growing companies in the U.S. multiple times.
        </p>
        <p class="editorial-body text-base md:text-lg leading-relaxed">
          In 2021 we joined a leading technology company to drive innovation. In 2025 we opened up again as a boutique agency working with a handful of carefully selected industry leading clients to create Function + Feeling.
        </p>
      </div>
    </section>
  </main>

  <footer class="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-12 border-t border-[#D4C5B2]">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <span class="font-serif font-semibold text-lg">Volta Studio</span>
      <span class="text-sm text-[#8B7355]">Reykjavík, Iceland &mdash; Est. 2014</span>
    </div>
  </footer>
`,t();