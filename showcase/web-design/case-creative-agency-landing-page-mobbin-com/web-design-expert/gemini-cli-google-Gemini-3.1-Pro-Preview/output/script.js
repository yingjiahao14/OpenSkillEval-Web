document.addEventListener('DOMContentLoaded', () => {
    // 1. Stats Counter Animation
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeProgress * (end - start) + start);
            obj.innerHTML = new Intl.NumberFormat().format(current);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = new Intl.NumberFormat().format(end);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    animateValue(stat, 0, target, 2000);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 2. Search Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchResults = document.getElementById('search-results');

    const simulateLoading = () => {
        searchResults.style.opacity = '0.5';
        setTimeout(() => {
            searchResults.style.opacity = '1';
        }, 300);
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            simulateLoading();
        });
    });

    // 3. Search Filters
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            simulateLoading();
        });
    });

    // 4. Flows Toggle
    const flowToggles = document.querySelectorAll('.toggle-btn');
    const flowViews = document.querySelectorAll('.flow-view');

    flowToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewId = btn.getAttribute('data-view');
            
            flowToggles.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            flowViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === `view-${viewId}`) {
                    view.classList.add('active');
                }
            });
        });
    });
});
