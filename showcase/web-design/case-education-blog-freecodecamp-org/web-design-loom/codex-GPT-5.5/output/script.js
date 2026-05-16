const extraArticles = [
  { tag: '#JavaScript', title: 'How to Structure Async JavaScript for Production Apps', author: 'Alex Kim', time: '2 days ago', label: 'JS' },
  { tag: '#Python', title: 'Python Type Hints: A Practical Guide for Growing Codebases', author: 'Mina Patel', time: '3 days ago', label: 'PY' },
  { tag: '#React', title: 'Build Accessible React Components Without Overengineering', author: 'Nora Lee', time: '4 days ago', label: 'UI' },
  { tag: '#CSS', title: 'Modern CSS Layout Patterns for Editorial Websites', author: 'Sam Rivera', time: '5 days ago', label: 'CSS' },
  { tag: '#APIs', title: 'REST API Design Principles Every New Backend Developer Should Know', author: 'Ibrahim Ade', time: '6 days ago', label: 'API' },
  { tag: '#Docker', title: 'Containerize a Full-Stack App with Docker Compose', author: 'Tara Chen', time: '1 week ago', label: 'DO' }
];

const donationCopy = {
  5: 'Your $5 donation helps keep tutorials free for learners who are just getting started.',
  10: 'Your $10 donation supports new lessons, transcripts, and community-reviewed examples.',
  20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
  40: 'Your $40 donation helps us translate curricula and expand free certifications globally.'
};

function initials(name) {
  if (!name || name === '—') return 'OL';
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function cardTemplate(article) {
  const tagHref = article.tag.toLowerCase().includes('web scraping') ? 'tag-web-scraping.html' : article.tag.toLowerCase().includes('ai') ? 'tag-ai.html' : '#latest';
  return `
    <article class="article-card">
      <div class="thumb" data-label="${article.label || article.tag.replace('#', '').slice(0, 3).toUpperCase()}"></div>
      <div class="card-body">
        <a class="tag" href="${tagHref}">${article.tag}</a>
        <h3><a href="#">${article.title}</a></h3>
        <div class="byline">
          <span class="avatar" aria-hidden="true">${initials(article.author)}</span>
          <span>${article.author || 'OpenLearnHub Editors'}</span>
          <span class="dot">•</span>
          <time>${article.time}</time>
        </div>
      </div>
    </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-toggle').forEach(button => {
    const nav = button.closest('.header-inner').querySelector('.nav-links');
    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  const loadMore = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-article-grid="home"]');
  if (loadMore && grid) {
    let loaded = false;
    loadMore.addEventListener('click', () => {
      if (loaded) return;
      grid.insertAdjacentHTML('beforeend', extraArticles.map(cardTemplate).join(''));
      loaded = true;
      loadMore.textContent = 'All Articles Loaded';
      loadMore.disabled = true;
      loadMore.setAttribute('aria-disabled', 'true');
    });
  }

  const donationText = document.querySelector('[data-donation-text]');
  const donationLabel = document.querySelector('[data-donation-label]');
  document.querySelectorAll('.amount-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const amount = tab.dataset.amount;
      document.querySelectorAll('.amount-tab').forEach(other => {
        other.classList.toggle('active', other === tab);
        other.setAttribute('aria-pressed', String(other === tab));
      });
      if (donationText) donationText.textContent = donationCopy[amount];
      if (donationLabel) donationLabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
    });
  });

  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.toggle('open');
      question.setAttribute('aria-expanded', String(isOpen));
      answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
    });
  });
});
