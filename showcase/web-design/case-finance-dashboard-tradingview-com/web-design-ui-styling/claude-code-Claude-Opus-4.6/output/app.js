// ChartPulse — Global Interactions

document.addEventListener('DOMContentLoaded', function() {
  // Generic tab system
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.dataset.tab;
        if (targetId) {
          const parent = tabGroup.closest('section') || tabGroup.closest('.container') || document;
          parent.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
          });
          const target = document.getElementById(targetId);
          if (target) {
            target.classList.add('active');
            // Re-render charts in newly visible tab
            target.querySelectorAll('.sparkline, .spark-mini').forEach(canvas => {
              const trend = canvas.dataset.trend || 'up';
              const color = canvas.dataset.color || '#26a69a';
              drawSparkline(canvas, trend, color);
            });
            target.querySelectorAll('.idea-chart, .idea-chart-sm').forEach(canvas => {
              const type = canvas.dataset.type || 'line';
              const color = canvas.dataset.color || '#26a69a';
              drawIdeaChart(canvas, type, color);
            });
          }
        }
      });
    });
  });

  // Active nav link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
