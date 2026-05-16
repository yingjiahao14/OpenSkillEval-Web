document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabGroups = document.querySelectorAll('.tab-group');
    tabGroups.forEach(group => {
        const btns = group.querySelectorAll('.tab-btn');
        const contents = group.querySelectorAll('.tab-content');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                group.querySelector(`#${btn.dataset.target}`).classList.add('active');
            });
        });
    });

    // Accordions (FAQs and Product Demos)
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const body = acc.nextElementSibling;
            const isOpen = acc.classList.contains('active');
            
            const parent = acc.closest('.accordion-group');
            if(parent) {
                parent.querySelectorAll('.accordion-header').forEach(other => {
                    other.classList.remove('active');
                    other.nextElementSibling.style.maxHeight = null;
                });
            }

            if (!isOpen) {
                acc.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // Carousels
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;
        const slides = Array.from(track.children);
        const nextBtn = carousel.querySelector('.carousel-next');
        const prevBtn = carousel.querySelector('.carousel-prev');
        let currentIndex = 0;

        const updateSlidePosition = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                if(currentIndex < slides.length - 1) currentIndex++;
                else currentIndex = 0;
                updateSlidePosition();
            });
            prevBtn.addEventListener('click', () => {
                if(currentIndex > 0) currentIndex--;
                else currentIndex = slides.length - 1;
                updateSlidePosition();
            });
        }
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
