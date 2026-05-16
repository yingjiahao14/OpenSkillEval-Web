document.addEventListener('DOMContentLoaded', () => {
    const initTabs = () => {
        document.querySelectorAll('.tab-container').forEach(group => {
            const btns = group.querySelectorAll('.tab-btn');
            const contents = group.querySelectorAll('.tab-content');
            btns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    btns.forEach(b => b.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    btn.classList.add('active');
                    if(contents[index]) contents[index].classList.add('active');
                });
            });
        });
    };

    const initFAQ = () => {
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            if(question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
                    if (!isActive) item.classList.add('active');
                });
            }
        });
    };

    const initCarousel = () => {
        document.querySelectorAll('.carousel').forEach(carousel => {
            const inner = carousel.querySelector('.carousel-inner');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            const items = carousel.querySelectorAll('.testimonial-card');
            if (!inner || !items.length) return;
            
            let currentIndex = 0;
            const update = () => inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            if(prevBtn) prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
                update();
            });
            if(nextBtn) nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                update();
            });
        });
    };

    const initDemo = () => {
        const header = document.querySelector('.demo-header');
        if(header) {
            header.addEventListener('click', () => {
                const content = document.querySelector('.demo-content');
                if(content) {
                    content.classList.toggle('active');
                    const icon = header.querySelector('span');
                    if(icon) icon.textContent = content.classList.contains('active') ? '▲' : '▼';
                }
            });
        }
    };

    initTabs();
    initFAQ();
    initCarousel();
    initDemo();
});
