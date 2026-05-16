// Shared content data for OpenLearnHub pages.
// Static site: safe to load directly in browser.

window.OPENLEARNHUB_DATA = {
  brand: {
    name: 'OpenLearnHub',
    colors: {
      navy: '#0A0A23',
      gold: '#FEAC32',
      link: '#002EAD'
    },
    searchPlaceholder: 'Search 12,000+ tutorials, articles, and books',
    bannerText: 'Learn to code — free 3,000-hour curriculum'
  },
  footer: {
    mission: "OpenLearnHub is a donor-supported tax-exempt 501(c)(3) charitable organization. Our mission: to help people learn to code for free. We accomplish this by creating thousands of videos, articles, and interactive coding lessons — all freely available to the public.",
    trending: ['REST APIs','Clean Code','TypeScript','JavaScript','AI Chatbots','Command Line','GraphQL APIs','CSS Transforms','Python','React','Docker','Node.js'],
    links: ['Our Charity','About','Alumni Network','Open Source','Shop','Support','Sponsors','Academic Honesty','Code of Conduct','Privacy Policy','Terms of Service','Copyright Policy']
  },
  articles: {
    featured: {
      tag: '#AI',
      tagSlug: 'tag-ai.html',
      title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back',
      author: 'Manish Shivanandhan',
      time: '15 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=70'
    },
    latestInitial: [
      {
        tag: '#AI',
        tagHref: 'tag-ai.html',
        title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back',
        author: 'Manish Shivanandhan',
        time: '15 hours ago',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#web scraping',
        tagHref: 'tag-web-scraping.html',
        title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams',
        author: 'Joel Olawanle',
        time: '16 hours ago',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#Databases',
        tagHref: 'index.html',
        title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples',
        author: 'iyiola',
        time: '20 hours ago',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#elasticsearch',
        tagHref: 'index.html',
        title: 'How to Streamline Search in Web Applications with Elasticsearch',
        author: 'Oluwatobi',
        time: '21 hours ago',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#data-engineering',
        tagHref: 'index.html',
        title: 'How to Build an Open Source Data Lake for Batch Ingestion',
        author: 'Puneet Singh',
        time: 'a day ago',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70'
      }
    ],
    moreForHome: [
      {
        tag: '#AI',
        tagHref: 'tag-ai.html',
        title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
        author: 'Rudrendu Paul',
        time: '3 days ago',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#AI',
        tagHref: 'tag-ai.html',
        title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?',
        author: 'Oyedele Tioluwani',
        time: '4 days ago',
        thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#AI-automation',
        tagHref: 'tag-ai.html',
        title: 'How to Build a Secure AI PR Reviewer with Claude, GitHub Actions, and JavaScript',
        author: 'Sumit Saha',
        time: '7 days ago',
        thumbnail: 'https://images.unsplash.com/photo-1557853197-aefb550b6fdc?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#AI',
        tagHref: 'tag-ai.html',
        title: 'How to Build Reliable AI Systems',
        author: 'Jide Abdul-Qudus',
        time: '8 days ago',
        thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#Python',
        tagHref: 'tag-web-scraping.html',
        title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
        author: 'Manish Shivanandhan',
        time: '6 months ago',
        thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#Python',
        tagHref: 'tag-web-scraping.html',
        title: 'How to Use Python to Build Your Own Web Scraper',
        author: '—',
        time: '2 years ago',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#node js',
        tagHref: 'tag-web-scraping.html',
        title: 'How to Scrape Amazon Product Reviews Behind a Login',
        author: '—',
        time: '2 years ago',
        thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=70'
      },
      {
        tag: '#google sheets',
        tagHref: 'tag-web-scraping.html',
        title: 'Web Scraping with Google Sheets – How to Scrape Web Pages with Built-in Functions',
        author: 'Eamonn Cottrell',
        time: '3 years ago',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70'
      }
    ],
    byTag: {
      ai: {
        label: '#AI',
        countLabel: 'A collection of 212 posts',
        posts: [
          {
            tag: '#AI',
            tagHref: 'tag-ai.html',
            title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back',
            author: 'Manish Shivanandhan',
            time: '12 hours ago',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#AI',
            tagHref: 'tag-ai.html',
            title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
            author: 'Rudrendu Paul',
            time: '3 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#AI',
            tagHref: 'tag-ai.html',
            title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?',
            author: 'Oyedele Tioluwani',
            time: '4 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#AI-automation',
            tagHref: 'tag-ai.html',
            title: 'How to Build a Secure AI PR Reviewer with Claude, GitHub Actions, and JavaScript',
            author: 'Sumit Saha',
            time: '7 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1557853197-aefb550b6fdc?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#AI',
            tagHref: 'tag-ai.html',
            title: 'How to Build Reliable AI Systems',
            author: 'Jide Abdul-Qudus',
            time: '8 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1200&q=70'
          }
        ]
      },
      scraping: {
        label: '#WEB SCRAPING',
        countLabel: 'A collection of 33 posts',
        posts: [
          {
            tag: '#web scraping',
            tagHref: 'tag-web-scraping.html',
            title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams',
            author: 'Joel Olawanle',
            time: '13 hours ago',
            thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#Python',
            tagHref: 'tag-web-scraping.html',
            title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
            author: 'Manish Shivanandhan',
            time: '6 months ago',
            thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#Python',
            tagHref: 'tag-web-scraping.html',
            title: 'How to Use Python to Build Your Own Web Scraper',
            author: '—',
            time: '2 years ago',
            thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#node js',
            tagHref: 'tag-web-scraping.html',
            title: 'How to Scrape Amazon Product Reviews Behind a Login',
            author: '—',
            time: '2 years ago',
            thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=70'
          },
          {
            tag: '#google sheets',
            tagHref: 'tag-web-scraping.html',
            title: 'Web Scraping with Google Sheets – How to Scrape Web Pages with Built-in Functions',
            author: 'Eamonn Cottrell',
            time: '3 years ago',
            thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70'
          }
        ]
      }
    }
  },
  popularTags: [
    { tag: '#General Programming', count: '2,773' },
    { tag: '#JavaScript', count: '2,532' },
    { tag: '#Web Development', count: '2,035' },
    { tag: '#Python', count: '1,014' },
    { tag: '#React', count: '970' },
    { tag: '#tech', count: '2,735' },
    { tag: '#youtube', count: '953' },
    { tag: '#startup', count: '715' },
    { tag: '#software development', count: '673' },
    { tag: '#Design', count: '577' },
    { tag: '#Productivity', count: '544' },
    { tag: '#Life lessons', count: '532' },
    { tag: '#CSS', count: '491' },
    { tag: '#self-improvement', count: '486' }
  ],
  curriculum: {
    welcome: "Welcome to OpenLearnHub's curriculum. Sign in to save your progress (it's free).",
    paths: [
      { icon: '▦', title: 'Responsive Web Design Certification', desc: 'HTML, CSS, accessibility, and responsive layouts.' },
      { icon: '⌁', title: 'JavaScript Certification', desc: 'Core JS, algorithms, data structures, and tooling.' },
      { icon: '⬡', title: 'Front-End Development Libraries Certification', desc: 'Modern UI libraries, state, and patterns.' },
      { icon: '∿', title: 'Python Certification', desc: 'Data structures, scripting, and automation.' },
      { icon: '⛃', title: 'Relational Databases Certification', desc: 'SQL fundamentals, schema design, and indexing.' },
      { icon: '⇄', title: 'Back-End Development and APIs Certification', desc: 'APIs, auth, testing, and deployment basics.' },
      { icon: '◎', title: 'Certified Full-Stack Developer Curriculum', desc: 'A structured, end-to-end learning path.' }
    ],
    daily: {
      cta: 'Try the coding challenge of the day',
      links: ["Go to Today's Challenge", 'Go to Daily Coding Challenge Archive']
    },
    language: {
      heading: 'Learn English for Developers',
      items: ['A2 English for Developers Certification (Beta)', 'B1 English for Developers Certification (Beta)']
    },
    interview: {
      heading: 'Interview Preparation',
      items: ['The Odin Project – OpenLearnHub Remix', 'Coding Interview Prep', 'Project Euler', 'Rosetta Code']
    },
    professional: {
      heading: 'Professional Certifications',
      items: ['Free Foundational C# with Microsoft Certification']
    }
  },
  donate: {
    heroTitle: 'Help Our Charity Do More',
    heroBody: "OpenLearnHub is a highly efficient education charity. When you donate, you help people learn new skills and provide for their families. You also help us create new resources for you to use to expand your own technology skills.",
    benefits: [
      'No more donation prompt popups',
      "You'll get a Supporter badge",
      'Your profile image will get a golden halo around it',
      "You'll gain access to special Supporter Discord channels — join our Discord and use the /supporter command",
      'And more benefits to come soon'
    ],
    initiatives: [
      'Creating new JavaScript and Python curricula',
      'Creating English and math curricula',
      'Translating our curriculum and tutorials into 32 languages',
      "Creating a free accredited computer science bachelor's degree"
    ],
    achievements: [
      'Published 193 full-length courses on YouTube',
      'Published 850 text-based coding tutorials and 5 free books through OpenLearnHub Press',
      'Merged 2,455 code contributions into our open source repositories on GitHub',
      'Translated 1.5 million words to make our curriculum and tutorials more accessible to speakers of many world languages'
    ],
    faq: [
      'How can I get help with my donations?',
      'How transparent is OpenLearnHub?',
      'How efficient is OpenLearnHub?',
      'How can I make a one-time donation?',
      'Does OpenLearnHub accept donations in Bitcoin or other cryptocurrencies?',
      'Can I mail a physical check?',
      'How can I set up matching gifts from my employer, or payroll deductions?',
      'How can I set up an Endowment Gift to OpenLearnHub?',
      'How can I set up a Legacy gift to OpenLearnHub?',
      'How can I donate stock to OpenLearnHub?',
      'I set up a monthly donation, but I need to update or stop the monthly recurrence. How can I do this?',
      'Is there anything else I can I learn about donating to OpenLearnHub?'
    ]
  }
};

