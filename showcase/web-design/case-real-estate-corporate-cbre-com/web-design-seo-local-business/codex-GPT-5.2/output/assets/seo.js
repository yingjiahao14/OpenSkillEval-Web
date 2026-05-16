function buildGlobalStoneSeo(opts){
  var businessName = 'GlobalStone';
  var siteUrl = (opts && opts.siteUrl) ? opts.siteUrl.replace(/\/$/, '') : '';
  var pagePath = (opts && opts.path) ? opts.path : '/';
  var canonical = siteUrl ? (siteUrl + pagePath) : pagePath;

  // Corporate site: use Organization (not LocalBusiness) to avoid inaccurate local signals.
  var schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": (siteUrl ? (siteUrl + '/#organization') : '#organization'),
        "name": businessName,
        "url": siteUrl || undefined,
        "description": "GlobalStone is the global leader in commercial real estate services and investments, providing integrated, data-led solutions across every dimension of real estate.",
        "logo": (siteUrl ? (siteUrl + '/media/logo-mark.svg') : 'media/logo-mark.svg')
      },
      {
        "@type": "WebSite",
        "@id": (siteUrl ? (siteUrl + '/#website') : '#website'),
        "url": siteUrl || undefined,
        "name": "GlobalStone — Global Commercial Real Estate Services",
        "publisher": {"@id": (siteUrl ? (siteUrl + '/#organization') : '#organization')}
      },
      {
        "@type": "WebPage",
        "@id": canonical + '#webpage',
        "url": canonical,
        "name": (opts && opts.pageTitle) ? opts.pageTitle : 'Global Commercial Real Estate Services',
        "isPartOf": {"@id": (siteUrl ? (siteUrl + '/#website') : '#website')},
        "about": {"@id": (siteUrl ? (siteUrl + '/#organization') : '#organization')}
      }
    ]
  };

  if (opts && opts.service){
    schema["@graph"].push({
      "@type": "Service",
      "name": opts.service.name,
      "description": opts.service.description,
      "provider": {"@id": (siteUrl ? (siteUrl + '/#organization') : '#organization')},
      "serviceType": opts.service.type || "Commercial Real Estate Services"
    });
  }

  var meta = {
    title: ((opts && opts.pageTitle) ? opts.pageTitle : 'Global Commercial Real Estate Services') + ' | ' + businessName,
    description: (opts && opts.description) ? opts.description : 'Integrated, data-led commercial real estate services and investments for investors, occupiers, owners, and corporate clients.',
    canonical: canonical,
    ogImage: (siteUrl ? (siteUrl + '/media/og.png') : 'media/og.png')
  };
  return { meta: meta, jsonLd: JSON.stringify(schema, null, 2) };
}

function injectSeo(seo){
  var head = document.head;

  function setMeta(name, content){
    var el = head.querySelector('meta[name="' + name + '"]');
    if (!el){ el = document.createElement('meta'); el.setAttribute('name', name); head.appendChild(el); }
    el.setAttribute('content', content);
  }
  function setProp(prop, content){
    var el = head.querySelector('meta[property="' + prop + '"]');
    if (!el){ el = document.createElement('meta'); el.setAttribute('property', prop); head.appendChild(el); }
    el.setAttribute('content', content);
  }
  function setLink(rel, href){
    var el = head.querySelector('link[rel="' + rel + '"]');
    if (!el){ el = document.createElement('link'); el.setAttribute('rel', rel); head.appendChild(el); }
    el.setAttribute('href', href);
  }

  document.title = seo.meta.title;
  setMeta('title', seo.meta.title);
  setMeta('description', seo.meta.description);
  setLink('canonical', seo.meta.canonical);

  setProp('og:type', 'website');
  setProp('og:url', seo.meta.canonical);
  setProp('og:title', seo.meta.title);
  setProp('og:description', seo.meta.description);
  setProp('og:image', seo.meta.ogImage);

  setProp('twitter:card', 'summary_large_image');
  setProp('twitter:url', seo.meta.canonical);
  setProp('twitter:title', seo.meta.title);
  setProp('twitter:description', seo.meta.description);
  setProp('twitter:image', seo.meta.ogImage);

  // Structured data
  var existing = head.querySelector('script[type="application/ld+json"][data-seo]');
  if (!existing){
    existing = document.createElement('script');
    existing.type = 'application/ld+json';
    existing.setAttribute('data-seo','true');
    head.appendChild(existing);
  }
  existing.textContent = seo.jsonLd;
}
