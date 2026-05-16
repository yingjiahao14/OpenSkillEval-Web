document.addEventListener('DOMContentLoaded', () => {
  // Accordions for CLI Setup
  const accordionTabs = document.querySelectorAll('.accordion-tab');
  const cliContents = document.querySelectorAll('.cli-content');

  if (accordionTabs.length > 0) {
    accordionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all
        accordionTabs.forEach(t => t.classList.remove('active'));
        cliContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  // Terminal Package Manager Tabs
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalCodes = document.querySelectorAll('.terminal-code div');

  if (terminalTabs.length > 0) {
    terminalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Determine package manager clicked
        const pm = tab.getAttribute('data-pm');
        
        // Find parent terminal
        const terminal = tab.closest('.cli-terminal');
        const localTabs = terminal.querySelectorAll('.terminal-tab');
        const localCodes = terminal.querySelectorAll('.terminal-code div');

        // Update active tab in this terminal
        localTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active code in this terminal
        localCodes.forEach(c => c.classList.remove('active'));
        terminal.querySelector(`div[data-pm="${pm}"]`).classList.add('active');
        
        // Sync across other terminals
        terminalTabs.forEach(globalTab => {
            if (globalTab.getAttribute('data-pm') === pm) {
                globalTab.classList.add('active');
                const globalTerminal = globalTab.closest('.cli-terminal');
                globalTerminal.querySelectorAll('.terminal-tab').forEach(gt => gt.classList.remove('active'));
                globalTab.classList.add('active');
                
                globalTerminal.querySelectorAll('.terminal-code div').forEach(gc => gc.classList.remove('active'));
                globalTerminal.querySelector(`div[data-pm="${pm}"]`).classList.add('active');
            }
        });
      });
    });
  }

  // Sidebar Toggle
  const sidebar = document.querySelector('.sidebar');
  const collapseBtn = document.querySelector('.collapse-btn');

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      if (sidebar.classList.contains('collapsed')) {
        collapseBtn.innerHTML = '&#9776;'; // Hamburger
        collapseBtn.setAttribute('aria-expanded', 'false');
      } else {
        collapseBtn.innerHTML = '&times;'; // Close
        collapseBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Dark Mode Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      if (html.getAttribute('data-theme') === 'light') {
        html.removeAttribute('data-theme');
      } else {
        html.setAttribute('data-theme', 'light');
      }
    });
  }
});