document.addEventListener('DOMContentLoaded', () => {

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Load More Articles
  const loadMoreBtn = document.getElementById('load-more-articles');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const grid = document.querySelector('.article-grid');
      if (!grid) return;
      
      const additionalArticles = [
        { tag: '#Python', title: 'Data Structures in Python - A Beginners Guide', author: 'Eamonn Cottrell', time: '2 days ago' },
        { tag: '#React', title: 'How to Build a Custom Hook in React', author: 'Joel Olawanle', time: '3 days ago' },
        { tag: '#CSS', title: 'Mastering CSS Grid Layouts', author: 'Oluwatobi', time: '5 days ago' }
      ];

      additionalArticles.forEach(article => {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
          <div class="img-placeholder">${article.tag}</div>
          <div class="content">
            <a href="#" class="card-tag">${article.tag}</a>
            <h3 class="card-title"><a href="#">${article.title}</a></h3>
            <div class="card-meta">
              <div class="avatar">${article.author.charAt(0)}</div>
              <span>${article.author}</span>
              <span>•</span>
              <span>${article.time}</span>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
      
      // Remove button after loading to simulate end of list
      loadMoreBtn.style.display = 'none';
    });
  }

  // Donation Amount Selector
  const amountBtns = document.querySelectorAll('.amount-btn');
  const donateDesc = document.getElementById('donate-description');
  if (amountBtns.length > 0 && donateDesc) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        amountBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        const amount = btn.getAttribute('data-amount');
        let hours = 0;
        if (amount === '5') hours = 250;
        if (amount === '10') hours = 500;
        if (amount === '20') hours = 1000;
        if (amount === '40') hours = 2000;
        
        donateDesc.textContent = `Your $\${amount} donation will provide \${hours.toLocaleString()} hours of learning to people around the world each month.`;
        
        const subLabel = document.querySelector('.donate-sub');
        if (subLabel) {
          subLabel.innerHTML = `Donating $\${amount} / month: <a href="#">edit amount</a> · Secure donation`;
        }
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});
