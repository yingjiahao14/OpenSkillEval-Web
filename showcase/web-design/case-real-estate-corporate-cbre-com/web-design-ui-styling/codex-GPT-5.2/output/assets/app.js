(function(){
  "use strict";

  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function setAriaHidden(el, hidden){
    if(!el) return;
    el.setAttribute("aria-hidden", hidden ? "true" : "false");
  }

  function initMegaMenu(){
    var trigger = qs('[data-mega-trigger="services"]');
    var menu = qs('[data-mega="services"]');
    if(!trigger || !menu) return;

    var closeTimer = null;
    function open(){
      clearTimeout(closeTimer);
      trigger.setAttribute("aria-expanded","true");
      setAriaHidden(menu, false);
    }
    function close(){
      trigger.setAttribute("aria-expanded","false");
      setAriaHidden(menu, true);
    }
    function scheduleClose(){
      clearTimeout(closeTimer);
      closeTimer = setTimeout(close, 110);
    }

    trigger.addEventListener("click", function(e){
      e.preventDefault();
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      if(expanded) close(); else open();
    });

    // Desktop hover affordance
    trigger.addEventListener("mouseenter", open);
    trigger.addEventListener("mouseleave", scheduleClose);
    menu.addEventListener("mouseenter", function(){ clearTimeout(closeTimer); });
    menu.addEventListener("mouseleave", scheduleClose);

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") close();
    });
    document.addEventListener("click", function(e){
      if(!menu.contains(e.target) && e.target !== trigger) close();
    });
  }

  function initMobileNav(){
    var openBtn = qs('[data-mobile-open]');
    var drawer = qs('[data-mobile-drawer]');
    var closeBtn = qs('[data-mobile-close]');
    if(!openBtn || !drawer || !closeBtn) return;

    function open(){
      setAriaHidden(drawer, false);
      drawer.dataset.open = "true";
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function close(){
      setAriaHidden(drawer, true);
      drawer.dataset.open = "false";
      document.body.style.overflow = "";
      openBtn.focus();
    }

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    drawer.addEventListener("click", function(e){
      if(e.target === drawer) close();
    });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && drawer.getAttribute('aria-hidden') === 'false') close();
    });

    // Accordion
    qsa('[data-acc-trigger]', drawer).forEach(function(btn){
      btn.addEventListener('click', function(){
        var item = btn.closest('[data-acc-item]');
        if(!item) return;
        var openNow = item.getAttribute('data-open') === 'true';
        // close others
        qsa('[data-acc-item]', drawer).forEach(function(it){ it.setAttribute('data-open','false'); });
        item.setAttribute('data-open', openNow ? 'false' : 'true');
      });
    });
  }

  function initWhatWeDoTabs(){
    var root = qs('[data-tabs="what-we-do"]');
    if(!root) return;

    var buttons = qsa('[role="tab"]', root);
    var panels = qsa('[role="tabpanel"]', root);

    function activate(id){
      buttons.forEach(function(b){
        var active = b.getAttribute('aria-controls') === id;
        b.setAttribute('aria-selected', active ? 'true' : 'false');
        b.tabIndex = active ? 0 : -1;
      });
      panels.forEach(function(p){
        var active = p.id === id;
        p.hidden = !active;
      });
    }

    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        activate(btn.getAttribute('aria-controls'));
      });
      btn.addEventListener('keydown', function(e){
        var i = buttons.indexOf(btn);
        if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){
          e.preventDefault();
          buttons[(i+1) % buttons.length].focus();
        }
        if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
          e.preventDefault();
          buttons[(i-1+buttons.length) % buttons.length].focus();
        }
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          activate(btn.getAttribute('aria-controls'));
        }
      });
    });

    // Initialize to first selected
    var selected = buttons.find(function(b){ return b.getAttribute('aria-selected') === 'true'; }) || buttons[0];
    if(selected) activate(selected.getAttribute('aria-controls'));
  }

  function initCarousel(){
    var root = qs('[data-carousel]');
    if(!root) return;
    var track = qs('[data-carousel-track]', root);
    var prev = qs('[data-carousel-prev]', root);
    var next = qs('[data-carousel-next]', root);
    if(!track || !prev || !next) return;

    var index = 0;
    var slides = qsa('[data-slide]', track);
    if(slides.length === 0) return;

    function go(i){
      index = (i + slides.length) % slides.length;
      var left = slides[index].offsetLeft;
      track.scrollTo({ left:left, behavior:"smooth" });
      root.setAttribute('data-index', String(index));
    }
    prev.addEventListener('click', function(){ go(index - 1); });
    next.addEventListener('click', function(){ go(index + 1); });

    // Keep aligned on resize
    window.addEventListener('resize', function(){ go(index); });
    go(0);
  }

  document.addEventListener('DOMContentLoaded', function(){
    initMegaMenu();
    initMobileNav();
    initWhatWeDoTabs();
    initCarousel();
  });
})();

