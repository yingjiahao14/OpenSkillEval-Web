const extraArticles = [
  { tag: '#JavaScript', title: 'JavaScript Closures Explained with Practical Examples', author: 'Ava Chen', time: '2 days ago', className: '' },
  { tag: '#Python', title: 'Build a Clean Data Pipeline with Python and Pandas', author: 'Sam Rivera', time: '3 days ago', className: 'db' },
  { tag: '#React', title: 'How to Structure React Components for Large Projects', author: 'Nora Mensah', time: '4 days ago', className: 'scraping' },
  { tag: '#CSS', title: 'Modern CSS Layout Patterns Every Developer Should Know', author: 'Leo Grant', time: '5 days ago', className: 'data' },
  { tag: '#Node.js', title: 'Designing Reliable REST APIs with Node.js', author: 'Mina Patel', time: '6 days ago', className: 'search-tag' },
  { tag: '#Docker', title: 'A Beginner-Friendly Guide to Docker for Web Apps', author: 'Kai Brooks', time: '1 week ago', className: '' }
];

function initials(name) {
  return name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'OL';
}

function cardTemplate(article) {
  const tagClass = article.className ? ` ${article.className}` : '';
  const tagHref = article.tag.toLowerCase().includes('ai') ? 'tag-ai.html' : article.tag.toLowerCase().includes('scraping') ? 'tag-web-scraping.html' : '#';
  return `
    <article class="article-card">
      <div class="thumb" aria-hidden="true"></div>
      <div class="article-body">
        <a class="tag${tagClass}" href="${tagHref}">${article.tag}</a>
        <h3>${article.title}</h3>
        <div class="byline"><span class="avatar">${initials(article.author)}</span><span>${article.author} · ${article.time}</span></div>
      </div>
    </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-menu-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const menu = document.querySelector('[data-mobile-menu]');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      menu?.classList.toggle('open');
    });
  });

  const loadMore = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-article-grid]');
  if (loadMore && grid) {
    loadMore.addEventListener('click', () => {
      grid.insertAdjacentHTML('beforeend', extraArticles.map(cardTemplate).join(''));
      loadMore.textContent = 'More Articles Loaded';
      loadMore.disabled = true;
      loadMore.classList.add('ghost');
    });
  }

  const amountButtons = document.querySelectorAll('[data-amount]');
  const donationText = document.querySelector('[data-donation-text]');
  const donationLabel = document.querySelector('[data-donation-label]');
  const hours = { 5: '250', 10: '500', 20: '1,000', 40: '2,000' };
  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      const amount = button.dataset.amount;
      amountButtons.forEach(item => item.classList.toggle('active', item === button));
      amountButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      if (donationText) donationText.textContent = `Your $${amount} donation will provide ${hours[amount]} hours of learning to people around the world each month.`;
      if (donationLabel) donationLabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
    });
  });

  document.querySelectorAll('[data-faq]').forEach(item => {
    const question = item.querySelector('button');
    question?.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      question.setAttribute('aria-expanded', String(open));
    });
  });
});
