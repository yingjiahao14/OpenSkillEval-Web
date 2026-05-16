document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  document.querySelectorAll('.tab-group').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll(group.dataset.targetContent || '.tab-content');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deactivate all in group
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        
        // Deactivate all targets linked to this group
        const targetClass = group.dataset.targetClass;
        if (targetClass) {
          document.querySelectorAll(`.${targetClass}`).forEach(c => c.classList.remove('active'));
        }
        
        // Activate clicked
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        const targetId = btn.dataset.target;
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.classList.add('active');
          }
        }
      });
    });
  });

  // Accordions
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true' || false;
      btn.setAttribute('aria-expanded', !expanded);
      const targetId = btn.dataset.target;
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('open');
        }
      }
    });
  });

  // Toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const activeClass = btn.dataset.activeClass || 'active';
      btn.classList.toggle(activeClass);
      
      const targetId = btn.dataset.target;
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.toggle('active');
        }
      }
    });
  });
});
