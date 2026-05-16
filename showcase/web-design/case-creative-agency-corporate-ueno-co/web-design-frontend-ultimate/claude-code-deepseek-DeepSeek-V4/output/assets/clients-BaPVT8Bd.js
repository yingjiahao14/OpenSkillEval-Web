import{n as e,t}from"./nav-CWDOnK3C.js";var n=`clients.html`,r=[{name:`Nexora`,description:`Dozens of projects with teams across Maps, Cloud, Mobile, Mail, Drive, Play, Navigation, Video, Search, and more.`},{name:`Kinetic`,description:`We worked with Kinetic to re-brand the service as it expanded, leading to a new website and redesign of their core app.`},{name:`Pinnacle`,description:`We worked with the Pinnacle Maps team to build products to help businesses manage their services and find clients.`},{name:`Streamline`,description:`We've done multi-project engagements with the Streamline product, marketing and brand teams across multiple platforms.`},{name:`Orbis`,description:`Multi-year engagements with Messenger, Social, Video, VR, AI, and more, as well as a corporate re-brand.`},{name:`Lumina`,description:`We worked with the Lumina leadership team to create the biggest sports service in South America, across multiple platforms.`},{name:`Beacon`,description:`We've worked with Beacon to create partnerships with major partners and to develop new products.`},{name:`Prism`,description:`We worked with Store Lab, Prism's innovation unit, to create products like their innovative home delivery service.`},{name:`Zenith`,description:`We've worked with Zenith to develop their video service products as well as innovation for their physical shopping experiences.`},{name:`Forge`,description:`We worked with Forge to re-design their core apps on desktop and mobile and helped their sub-brand rebuild from the ground up.`},{name:`Catalyst`,description:`We worked closely with Catalyst to build their video product, launched across multiple platforms.`},{name:`Vertex`,description:`We initially worked with the brand and marketing team on a re-brand and a new website which led to product innovation.`},{name:`Horizon`,description:`We worked with the European convenience chain to create the fastest growing loyalty program in the local sector.`},{name:`Atlas`,description:`We worked with the brand and marketing team on a long term engagement across their main app and marketing channels.`},{name:`Meridian`,description:`We worked with Meridian from the early days of the service and onwards to design and develop products for their app and main website.`},{name:`Crest`,description:`We worked with Crest on a digital transformation project creating apps and services for their iconic venues.`},{name:`Ember`,description:`We worked closely with Ember leadership to design and build new products around safety, verification and faster checkout.`},{name:`Helix`,description:`We worked with Helix to create a comprehensive new product vision for the consumer and revenue side as well as a re-brand.`},{name:`Apex`,description:`Multi-year engagement, working with Apex on creating their innovative multi-platform streaming service and website.`},{name:`Stratos`,description:`Our first project with Stratos was to create their live news service, over the years this led to multiple engagements, including a full website redesign.`},{name:`Vantage`,description:`We worked with Vantage on their transformation from print first to digital first, designing a new website and app suite.`},{name:`Cirrus`,description:`Long term engagement including product design and development for Cirrus Banking, a pioneering new financial service.`},{name:`Mosaic`,description:`We worked with Mosaic on re-designing their sports platform from the ground up for web, TVs and new apps.`},{name:`Aether`,description:`We worked with Aether on their core platform experience and brand evolution across digital touchpoints.`},{name:`More`,description:`Other clients include Dropbox, ESPN, Nike, Samsung, Splunk, Allianz, Chubb, Spotify, Superhuman, Microsoft, Huawei, and so on.`}];function i(e){return`
    <div class="client-card">
      <h3>${e.name}</h3>
      <p>${e.description}</p>
    </div>
  `}document.querySelector(`#app`).innerHTML=`
  ${e(n)}

  <main>
    <section class="w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-16 md:pt-24 pb-8">
      <div class="section-label">Clients</div>
      <h1 class="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] mb-4">
        Some of them.
      </h1>
    </section>

    <section class="w-full max-w-[1400px] mx-auto px-8 md:px-16 pb-16 md:pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-12">
        ${r.map(i).join(``)}
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