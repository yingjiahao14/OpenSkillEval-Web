(function(){
  function qs(sel, root){ return (root || document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }

  function initMobileMenu(){
    var btn = qs('[data-menu-button]');
    var overlay = qs('[data-menu-overlay]');
    if(!btn || !overlay) return;

    function setOpen(isOpen){
      btn.setAttribute('aria-expanded', String(isOpen));
      overlay.classList.toggle('is-open', isOpen);
      overlay.setAttribute('aria-hidden', String(!isOpen));
      document.documentElement.style.overflow = isOpen ? 'hidden' : '';
      if(isOpen){
        var firstLink = qs('a', overlay);
        if(firstLink) firstLink.focus();
      } else {
        btn.focus();
      }
    }

    btn.addEventListener('click', function(){
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });

    overlay.addEventListener('click', function(e){
      if(e.target && e.target.matches('[data-menu-overlay]')) setOpen(false);
    });

    qsa('a', overlay).forEach(function(a){
      a.addEventListener('click', function(){ setOpen(false); });
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  function initMarquee(){
    // Nothing required beyond CSS; this is here to ensure the tracks have enough content.
    qsa('[data-marquee-track]').forEach(function(track){
      var items = qsa('.item', track);
      if(items.length < 6) return;
      // Duplicate once so the 50% translate loop is seamless.
      var clone = track.cloneNode(true);
      while(clone.firstChild) track.appendChild(clone.firstChild);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initMobileMenu();
    initMarquee();
  });
})();

