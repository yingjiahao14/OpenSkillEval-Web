/* ===== Orchard — Shared Interactions ===== */

document.addEventListener('DOMContentLoaded', function() {

  // ===== Carousel Arrows =====
  document.querySelectorAll('.carousel-container').forEach(function(container) {
    var wrapper = container.querySelector('.carousel-wrapper');
    var track = wrapper ? wrapper.querySelector('.carousel-track') : null;
    var prevBtn = container.querySelector('.carousel-arrow.prev');
    var nextBtn = container.querySelector('.carousel-arrow.next');

    if (!wrapper || !track) return;

    function getScrollAmount() {
      var card = track.querySelector('.product-card, .support-card, .savings-card, .guide-card, .special-store-card');
      if (card) return card.offsetWidth + 20;
      return 300;
    }

    function updateArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.style.opacity = wrapper.scrollLeft <= 4 ? '0.35' : '0.85';
      prevBtn.style.pointerEvents = wrapper.scrollLeft <= 4 ? 'none' : 'auto';
      var maxScroll = wrapper.scrollWidth - wrapper.clientWidth - 4;
      nextBtn.style.opacity = wrapper.scrollLeft >= maxScroll ? '0.35' : '0.85';
      nextBtn.style.pointerEvents = wrapper.scrollLeft >= maxScroll ? 'none' : 'auto';
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        wrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        wrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }

    wrapper.addEventListener('scroll', updateArrows);
    updateArrows();

    // Update arrows on resize
    window.addEventListener('resize', updateArrows);
  });

  // ===== Entertainment Tabs =====
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = this.getAttribute('data-tab');

      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });

      this.classList.add('active');
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ===== Footer Accordion (mobile) =====
  var footerCols = document.querySelectorAll('.footer-col');

  footerCols.forEach(function(col) {
    var heading = col.querySelector('h5');
    if (!heading) return;

    heading.addEventListener('click', function() {
      if (window.innerWidth > 768) return;
      col.classList.toggle('open');
    });
  });

  // ===== Sticky Section Nav Active State =====
  var sectionNav = document.querySelector('.section-nav');
  if (sectionNav) {
    var navItems = sectionNav.querySelectorAll('.section-nav-item');
    var sections = [];

    navItems.forEach(function(item) {
      var targetId = item.getAttribute('data-scroll-to') ||
                     item.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        var section = document.getElementById(targetId.slice(1));
        if (section) sections.push({ el: section, nav: item });
      }
    });

    function updateActiveNav() {
      var scrollY = window.scrollY + 120;
      var active = null;

      for (var i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.offsetTop <= scrollY) {
          active = sections[i].nav;
          break;
        }
      }

      navItems.forEach(function(item) {
        item.classList.remove('active');
      });
      if (active) active.classList.add('active');
    }

    // Smooth scroll on click
    navItems.forEach(function(item) {
      item.addEventListener('click', function(e) {
        var targetId = item.getAttribute('data-scroll-to') ||
                       item.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          var target = document.getElementById(targetId.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  }

  // ===== Touch-friendly carousels (momentum scroll) =====
  document.querySelectorAll('.carousel-wrapper').forEach(function(wrapper) {
    var isDown = false;
    var startX;
    var scrollLeft;

    wrapper.addEventListener('mousedown', function(e) {
      isDown = true;
      wrapper.style.cursor = 'grabbing';
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', function() {
      isDown = false;
      wrapper.style.cursor = 'default';
    });

    wrapper.addEventListener('mouseup', function() {
      isDown = false;
      wrapper.style.cursor = 'default';
    });

    wrapper.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - wrapper.offsetLeft;
      var walk = (x - startX) * 2;
      wrapper.scrollLeft = scrollLeft - walk;
    });
  });

});
