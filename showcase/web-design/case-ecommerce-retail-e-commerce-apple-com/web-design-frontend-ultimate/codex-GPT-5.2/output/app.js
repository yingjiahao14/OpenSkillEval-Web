(function(){
  function byId(id){return document.getElementById(id)}

  // Generic carousel: arrows with data-target pointing to the track element id
  function initCarousels(){
    document.querySelectorAll('[data-carousel]')
      .forEach(function(root){
        var trackId = root.getAttribute('data-carousel');
        var track = byId(trackId);
        if(!track) return;

        var prev = root.querySelector('[data-prev]');
        var next = root.querySelector('[data-next]');

        function step(dir){
          var card = track.querySelector(':scope > *');
          var cardWidth = card ? card.getBoundingClientRect().width : 320;
          var gap = 14;
          track.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
        }

        if(prev) prev.addEventListener('click', function(){ step(-1); });
        if(next) next.addEventListener('click', function(){ step(1); });

        // Keyboard support
        track.addEventListener('keydown', function(e){
          if(e.key === 'ArrowLeft') step(-1);
          if(e.key === 'ArrowRight') step(1);
        });

        // Make track focusable for keyboard
        track.setAttribute('tabindex','0');
      });
  }

  // Tabs: buttons with data-tab + panels with data-panel
  function initTabs(){
    document.querySelectorAll('[data-tabs]')
      .forEach(function(root){
        var buttons = Array.from(root.querySelectorAll('[data-tab]'));
        var panels = Array.from(root.querySelectorAll('[data-panel]'));

        function activate(key){
          buttons.forEach(function(b){
            var on = b.getAttribute('data-tab') === key;
            b.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          panels.forEach(function(p){
            var on = p.getAttribute('data-panel') === key;
            p.classList.toggle('active', on);
          });
        }

        buttons.forEach(function(b){
          b.addEventListener('click', function(){
            activate(b.getAttribute('data-tab'));
          });
        });

        // default
        var initial = root.getAttribute('data-initial') || (buttons[0] && buttons[0].getAttribute('data-tab'));
        if(initial) activate(initial);
      });
  }

  // Sticky section nav highlight (simple: on click set current)
  function initSectionNav(){
    document.querySelectorAll('[data-section-nav]')
      .forEach(function(nav){
        var links = Array.from(nav.querySelectorAll('a[href^="#"]'));
        if(!links.length) return;

        function setCurrent(hash){
          links.forEach(function(a){
            a.classList.toggle('current', a.getAttribute('href') === hash);
          });
        }

        links.forEach(function(a){
          a.addEventListener('click', function(){
            setCurrent(a.getAttribute('href'));
          });
        });

        // Scroll spy
        var targets = links.map(function(a){
          var id = a.getAttribute('href').slice(1);
          return byId(id);
        }).filter(Boolean);

        function onScroll(){
          var y = window.scrollY + 120;
          var best = null;
          targets.forEach(function(el){
            if(el.offsetTop <= y) best = el;
          });
          if(best) setCurrent('#' + best.id);
        }

        window.addEventListener('scroll', onScroll, {passive:true});
        onScroll();
      });
  }

  // Mobile footer accordion
  function initFooterAccordion(){
    document.querySelectorAll('[data-footer-accordion] .accordion-btn')
      .forEach(function(btn){
        btn.addEventListener('click', function(){
          var item = btn.closest('.accordion-item');
          if(!item) return;
          item.classList.toggle('open');
        });
      });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initCarousels();
    initTabs();
    initSectionNav();
    initFooterAccordion();
  });
})();
