(function(){
  // Per the seo-local-business skill, we include LocalBusiness schema everywhere.
  // Since this is a static demo without a real domain, we use a placeholder URL.
  const SITE_URL = 'https://openlearnhub.org';
  const ORG_ID = SITE_URL + '/#organization';

  const baseOrg = {
    "@context":"https://schema.org",
    "@type":"NonProfit",
    "name":"OpenLearnHub",
    "description":"A nonprofit education platform offering free programming tutorials, certifications, and a structured coding curriculum.",
    "@id": ORG_ID,
    "url": SITE_URL,
    "image": SITE_URL + '/og-image.jpg'
  };

  const pageMeta = {
    "index.html": {
      title: 'OpenLearnHub — Free Coding Tutorials & Curriculum',
      desc: 'Editorial tutorials and a free structured curriculum for developers. Learn to code with OpenLearnHub — donor-supported and free for everyone.'
    },
    "learn.html": {
      title: 'Curriculum',
      desc: 'Explore OpenLearnHub’s structured curriculum and certification paths. Save your progress and learn with a clear, syllabus-style plan.'
    },
    "donate.html": {
      title: 'Donate',
      desc: 'Support OpenLearnHub’s mission to help people learn to code for free. Choose a monthly amount and see the impact of your donation.'
    },
    "tag-ai.html": {
      title: 'AI Articles',
      desc: 'Browse OpenLearnHub articles tagged #AI — editorial tutorials and practical guides for responsible, real-world AI systems.'
    },
    "tag-web-scraping.html": {
      title: 'Web Scraping Articles',
      desc: 'Browse OpenLearnHub articles tagged #web scraping — practical tutorials for developers and data teams.'
    }
  };

  const path = (location.pathname.split('/').pop() || 'index.html');
  const meta = pageMeta[path] || pageMeta['index.html'];

  const canonical = SITE_URL + '/' + (path === 'index.html' ? '' : path);
  const ogImage = SITE_URL + '/og-image.jpg';

  const set = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute('content', val);
  };

  document.title = `${meta.title} | OpenLearnHub`;
  set('meta[name="title"]', `${meta.title} | OpenLearnHub`);
  set('meta[name="description"]', meta.desc);

  const canonEl = document.querySelector('link[rel="canonical"]');
  if (canonEl) canonEl.setAttribute('href', canonical);

  set('meta[property="og:url"]', canonical);
  set('meta[property="og:title"]', `${meta.title} | OpenLearnHub`);
  set('meta[property="og:description"]', meta.desc);
  set('meta[property="og:image"]', ogImage);

  set('meta[property="twitter:url"]', canonical);
  set('meta[property="twitter:title"]', `${meta.title} | OpenLearnHub`);
  set('meta[property="twitter:description"]', meta.desc);
  set('meta[property="twitter:image"]', ogImage);

  // Replace JSON-LD placeholder
  const ld = document.querySelector('script[data-jsonld]');
  if (ld){
    const extras = ld.getAttribute('data-extras');
    let extraSchemas = [];
    try{ extraSchemas = extras ? JSON.parse(extras) : []; } catch(_){ extraSchemas = []; }

    const schemas = [baseOrg, ...extraSchemas];
    ld.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
  }
})();
