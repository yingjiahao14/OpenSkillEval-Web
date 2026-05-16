
document.addEventListener('DOMContentLoaded', () => {
    // Carousels
    document.querySelectorAll('.carousel-container').forEach(container => {
        const track = container.querySelector('.carousel-track');
        const prev = container.querySelector('.prev-btn');
        const next = container.querySelector('.next-btn');
        
        if (track && prev && next) {
            prev.addEventListener('click', () => {
                track.scrollBy({ left: -340, behavior: 'smooth' });
            });
            next.addEventListener('click', () => {
                track.scrollBy({ left: 340, behavior: 'smooth' });
            });
        }
    });

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            // reset all
            const tabs = btn.closest('.tabs');
            if (tabs) {
                tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            }
            const section = btn.closest('.entertainment-section') || document;
            section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // set active
            btn.classList.add('active');
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Footer Accordion
    const footerCols = document.querySelectorAll('.footer-col');
    if (window.innerWidth <= 768) {
        footerCols.forEach(col => {
            const h4 = col.querySelector('h4');
            if (h4) {
                h4.addEventListener('click', () => {
                    col.classList.toggle('active');
                });
            }
        });
    }
    
    // Smooth scroll for section nav
    document.querySelectorAll('.section-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const y = targetEl.getBoundingClientRect().top + window.scrollY - 88;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });
});
