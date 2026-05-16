(function() {
  'use strict';

  // --- Accordion (only one open at a time) ---
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var item = this.closest('.accordion-item');
      var wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(function(el) {
        el.classList.remove('open');
      });
      // Open clicked (unless it was already open)
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- Package Manager Tabs ---
  var installCommands = {
    npm: 'npm i -g @commerceforge/cli@latest',
    yarn: 'yarn global add @commerceforge/cli@latest',
    pnpm: 'pnpm add -g @commerceforge/cli@latest'
  };
  var installCodeEl = document.getElementById('install-code');

  document.querySelectorAll('.pkg-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.pkg-tab').forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
      if (installCodeEl) {
        installCodeEl.textContent = installCommands[this.dataset.pkg] || installCommands.npm;
      }
    });
  });

  // --- Copy Code Button ---
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var code = this.closest('.code-block').querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(function() {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = orig; }, 1500);
      });
    });
  });

  // --- Mobile Menu ---
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var navLinks = document.querySelector('.topnav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // --- Sidebar Collapse ---
  document.querySelectorAll('.sidebar-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.toggle('collapsed');
        btn.querySelector('.toggle-label').textContent =
          sidebar.classList.contains('collapsed') ? 'Show sidebar' : 'Collapse sidebar';
      }
    });
  });

  // --- Active Nav Link ---
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.topnav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('active');
  });

  // --- Theme Toggle (dark default, toggles to light) ---
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    var isDark = true;
    themeBtn.addEventListener('click', function() {
      isDark = !isDark;
      if (isDark) {
        document.body.classList.remove('light-mode');
        themeBtn.innerHTML = '&#9788;'; // sun
      } else {
        document.body.classList.add('light-mode');
        themeBtn.innerHTML = '&#9790;'; // moon
      }
    });
  }
})();
