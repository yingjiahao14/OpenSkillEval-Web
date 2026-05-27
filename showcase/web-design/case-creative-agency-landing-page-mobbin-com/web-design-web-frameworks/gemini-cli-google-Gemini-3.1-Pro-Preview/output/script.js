document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Stats Counter Animation on Scroll
    const statsSection = document.getElementById('stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + easeOut * (end - start));
            
            // Format with commas
            obj.innerHTML = current.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toLocaleString();
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                setTimeout(() => {
                    animateValue(stat, 0, target, 2000);
                }, index * 200); // Stagger start
            });
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // 2. Features: Search - Tabs & Filters
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pillBtns = document.querySelectorAll('.pill-btn');
    const resultsGrid = document.getElementById('search-results-grid');

    // Generate random layout to simulate fetching data
    const generateMockResults = () => {
        resultsGrid.innerHTML = '';
        const count = Math.floor(Math.random() * 4) + 6; // 6 to 9 items
        for(let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'result-card';
            // Randomly switch background color to show it "changed"
            const hue = Math.floor(Math.random() * 360);
            const content = `<div class="img-ph" style="background-color: hsl(${hue}, 10%, 90%);"></div>`;
            el.innerHTML = content;
            resultsGrid.appendChild(el);
        }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Trigger visual refresh of results
            resultsGrid.style.opacity = '0.5';
            setTimeout(() => {
                generateMockResults();
                resultsGrid.style.opacity = '1';
            }, 200);
        });
    });

    pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Trigger visual refresh of results
            resultsGrid.style.opacity = '0.5';
            setTimeout(() => {
                generateMockResults();
                resultsGrid.style.opacity = '1';
            }, 200);
        });
    });

    // 3. Features: Flows - Toggle View
    const toggleBtns = document.querySelectorAll('.flows-toggle .toggle-btn');
    const descVideo = document.getElementById('flows-desc-video');
    const descPrototype = document.getElementById('flows-desc-prototype');
    const viewVideo = document.getElementById('view-video');
    const viewPrototype = document.getElementById('view-prototype');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (view === 'video') {
                descVideo.classList.remove('hidden');
                descPrototype.classList.add('hidden');
                viewVideo.classList.remove('hidden');
                viewPrototype.classList.add('hidden');
            } else {
                descVideo.classList.add('hidden');
                descPrototype.classList.remove('hidden');
                viewVideo.classList.add('hidden');
                viewPrototype.classList.remove('hidden');
            }
        });
    });

});
