// Small helper to keep page headers consistent when authoring multiple static files.
// This is optional: pages can include headers inline without using this.
window.VoltaPartials = {
  header: function(opts){
    var current = (opts && opts.current) || '';
    function link(href, label, id){
      var isCurrent = id === current;
      return '<a href="' + href + '"' + (isCurrent ? ' aria-current="page"' : '') + '>' + label + '</a>';
    }

    return (
      '<header class="site-header">' +
        '<a class="skip" href="#content">Skip to content</a>' +
        '<div class="container">' +
          '<nav class="nav" aria-label="Primary">' +
            '<a class="brand" href="index.html" aria-label="Volta Studio home">Volta<span class="dot">.</span></a>' +
            '<div class="nav-links">' +
              link('neweno.html', 'Neweno', 'neweno') +
              link('services.html', 'Services', 'services') +
              link('clients.html', 'Clients', 'clients') +
              link('contact.html', 'Contact', 'contact') +
            '</div>' +
            '<button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" data-menu-button>' +
              '<span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>' +
            '</button>' +
          '</nav>' +
        '</div>' +
        '<div class="overlay" data-menu-overlay aria-hidden="true">' +
          '<div class="overlay-panel" role="dialog" aria-modal="true" aria-label="Site menu">' +
            '<div class="overlay-title">Volta<span class="dot">.</span></div>' +
            '<nav class="overlay-nav" aria-label="Mobile">' +
              link('index.html', 'Home', 'home') +
              link('neweno.html', 'Neweno', 'neweno') +
              link('services.html', 'Services', 'services') +
              link('clients.html', 'Clients', 'clients') +
              link('contact.html', 'Contact', 'contact') +
            '</nav>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }
};

