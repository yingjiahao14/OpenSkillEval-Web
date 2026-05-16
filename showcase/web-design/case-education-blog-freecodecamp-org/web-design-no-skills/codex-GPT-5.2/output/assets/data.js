// Shared data used by multiple pages.

function initials(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function thumbGradient(seed) {
  // Simple deterministic gradient-ish background based on a seed string.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = 40 + (h % 30);
  const b = 55 + ((h >> 8) % 25);
  const c = 65 + ((h >> 16) % 20);
  return `linear-gradient(135deg, rgba(254, 172, 50, 0.${a}), rgba(10, 10, 35, 0.${b})), radial-gradient(circle at 30% 30%, rgba(0, 46, 173, 0.${c}), rgba(10, 10, 35, 0.05))`;
}

function makeArticle({
  title,
  tagLabel,
  tagSlug,
  author,
  time,
  topic,
}) {
  return {
    title,
    tagLabel,
    tagSlug,
    author,
    authorInitials: initials(author === '—' ? '' : author),
    time,
    topic: topic || tagSlug,
    thumbCss: thumbGradient(`${title}|${author}|${tagLabel}`),
  };
}

window.OLH_DATA = {
  homeInitial: [
    makeArticle({
      tagLabel: '#AI',
      tagSlug: 'ai',
      title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back',
      author: 'Manish Shivanandhan',
      time: '15 hours ago',
      topic: 'ai',
    }),
    makeArticle({
      tagLabel: '#web scraping',
      tagSlug: 'web-scraping',
      title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams',
      author: 'Joel Olawanle',
      time: '16 hours ago',
      topic: 'web-scraping',
    }),
    makeArticle({
      tagLabel: '#Databases',
      tagSlug: 'databases',
      title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples',
      author: 'iyiola',
      time: '20 hours ago',
      topic: 'databases',
    }),
    makeArticle({
      tagLabel: '#elasticsearch',
      tagSlug: 'elasticsearch',
      title: 'How to Streamline Search in Web Applications with Elasticsearch',
      author: 'Oluwatobi',
      time: '21 hours ago',
      topic: 'search',
    }),
    makeArticle({
      tagLabel: '#data-engineering',
      tagSlug: 'data-engineering',
      title: 'How to Build an Open Source Data Lake for Batch Ingestion',
      author: 'Puneet Singh',
      time: 'a day ago',
      topic: 'data',
    }),
  ],
  homeMore: [
    makeArticle({
      tagLabel: '#JavaScript',
      tagSlug: 'javascript',
      title: 'A Practical Guide to Async Patterns in Modern JavaScript',
      author: 'Amina Yusuf',
      time: '2 days ago',
      topic: 'javascript',
    }),
    makeArticle({
      tagLabel: '#Python',
      tagSlug: 'python',
      title: 'Python Data Pipelines: From Notebooks to Production',
      author: 'S. Patel',
      time: '3 days ago',
      topic: 'python',
    }),
    makeArticle({
      tagLabel: '#Web Development',
      tagSlug: 'web-development',
      title: 'Accessible UI Patterns That Don\u2019t Feel Like Homework',
      author: 'Elena Gomez',
      time: '4 days ago',
      topic: 'web',
    }),
    makeArticle({
      tagLabel: '#AI',
      tagSlug: 'ai',
      title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
      author: 'Rudrendu Paul',
      time: '3 days ago',
      topic: 'ai',
    }),
    makeArticle({
      tagLabel: '#CSS',
      tagSlug: 'css',
      title: 'CSS Layouts in 2026: Grid, Subgrid, and Container Queries',
      author: 'Noah Kim',
      time: '5 days ago',
      topic: 'css',
    }),
    makeArticle({
      tagLabel: '#AI',
      tagSlug: 'ai',
      title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?',
      author: 'Oyedele Tioluwani',
      time: '4 days ago',
      topic: 'ai',
    }),
    makeArticle({
      tagLabel: '#node js',
      tagSlug: 'node-js',
      title: 'Designing APIs for Humans: Error Messages, Status Codes, and Logs',
      author: 'Khaled Hassan',
      time: '6 days ago',
      topic: 'backend',
    }),
    makeArticle({
      tagLabel: '#web scraping',
      tagSlug: 'web-scraping',
      title: 'Scraping at Scale: Rate Limits, Retries, and Respectful Crawlers',
      author: 'Priya N.',
      time: '7 days ago',
      topic: 'web-scraping',
    }),
    makeArticle({
      tagLabel: '#Databases',
      tagSlug: 'databases',
      title: 'PostgreSQL Indexing Patterns You\u2019ll Actually Use',
      author: 'iyiola',
      time: '8 days ago',
      topic: 'databases',
    }),
    makeArticle({
      tagLabel: '#React',
      tagSlug: 'react',
      title: 'State Management Without the Ceremony',
      author: 'Jordan Lee',
      time: '9 days ago',
      topic: 'frontend',
    }),
    makeArticle({
      tagLabel: '#data-engineering',
      tagSlug: 'data-engineering',
      title: 'Batch vs Streaming: Choosing the Right Ingestion Strategy',
      author: 'Puneet Singh',
      time: '10 days ago',
      topic: 'data',
    }),
    makeArticle({
      tagLabel: '#Design',
      tagSlug: 'design',
      title: 'Designing Developer Docs That People Read',
      author: 'Maya Chen',
      time: '11 days ago',
      topic: 'writing',
    }),
  ],
  tagAI: {
    name: '#AI',
    count: 212,
    articles: [
      makeArticle({
        tagLabel: '#AI',
        tagSlug: 'ai',
        title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back',
        author: 'Manish Shivanandhan',
        time: '12 hours ago',
        topic: 'ai',
      }),
      makeArticle({
        tagLabel: '#AI',
        tagSlug: 'ai',
        title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
        author: 'Rudrendu Paul',
        time: '3 days ago',
        topic: 'ai',
      }),
      makeArticle({
        tagLabel: '#AI',
        tagSlug: 'ai',
        title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?',
        author: 'Oyedele Tioluwani',
        time: '4 days ago',
        topic: 'ai',
      }),
      makeArticle({
        tagLabel: '#AI-automation',
        tagSlug: 'ai-automation',
        title: 'How to Build a Secure AI PR Reviewer with Claude, GitHub Actions, and JavaScript',
        author: 'Sumit Saha',
        time: '7 days ago',
        topic: 'ai',
      }),
      makeArticle({
        tagLabel: '#AI',
        tagSlug: 'ai',
        title: 'How to Build Reliable AI Systems',
        author: 'Jide Abdul-Qudus',
        time: '8 days ago',
        topic: 'ai',
      }),
    ],
  },
  tagScraping: {
    name: '#WEB SCRAPING',
    count: 33,
    articles: [
      makeArticle({
        tagLabel: '#web scraping',
        tagSlug: 'web-scraping',
        title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams',
        author: 'Joel Olawanle',
        time: '13 hours ago',
        topic: 'web-scraping',
      }),
      makeArticle({
        tagLabel: '#Python',
        tagSlug: 'python',
        title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
        author: 'Manish Shivanandhan',
        time: '6 months ago',
        topic: 'web-scraping',
      }),
      makeArticle({
        tagLabel: '#Python',
        tagSlug: 'python',
        title: 'How to Use Python to Build Your Own Web Scraper',
        author: '—',
        time: '2 years ago',
        topic: 'web-scraping',
      }),
      makeArticle({
        tagLabel: '#node js',
        tagSlug: 'node-js',
        title: 'How to Scrape Amazon Product Reviews Behind a Login',
        author: '—',
        time: '2 years ago',
        topic: 'web-scraping',
      }),
      makeArticle({
        tagLabel: '#google sheets',
        tagSlug: 'google-sheets',
        title: 'Web Scraping with Google Sheets – How to Scrape Web Pages with Built-in Functions',
        author: 'Eamonn Cottrell',
        time: '3 years ago',
        topic: 'web-scraping',
      }),
    ],
  },
  popularTags: [
    { label: '#General Programming', count: 2773 },
    { label: '#JavaScript', count: 2532 },
    { label: '#Web Development', count: 2035 },
    { label: '#Python', count: 1014 },
    { label: '#React', count: 970 },
    { label: '#tech', count: 2735 },
    { label: '#youtube', count: 953 },
    { label: '#startup', count: 715 },
    { label: '#software development', count: 673 },
    { label: '#Design', count: 577 },
    { label: '#Productivity', count: 544 },
    { label: '#Life lessons', count: 532 },
    { label: '#CSS', count: 491 },
    { label: '#self-improvement', count: 486 },
  ],
};

