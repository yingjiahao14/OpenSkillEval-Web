// Shared data for OpenLearnHub demo site (static)
window.__OLH = {
  popularTags: [
    { tag: '#General Programming', count: 2773 },
    { tag: '#JavaScript', count: 2532 },
    { tag: '#Web Development', count: 2035 },
    { tag: '#Python', count: 1014 },
    { tag: '#React', count: 970 },
    { tag: '#tech', count: 2735 },
    { tag: '#youtube', count: 953 },
    { tag: '#startup', count: 715 },
    { tag: '#software development', count: 673 },
    { tag: '#Design', count: 577 },
    { tag: '#Productivity', count: 544 },
    { tag: '#Life lessons', count: 532 },
    { tag: '#CSS', count: 491 },
    { tag: '#self-improvement', count: 486 }
  ]
};

// Home page “Load More” batch data
window.__OLH_MORE_ARTICLES = [
  {
    tag: '#AI',
    tagHref: 'tag-ai.html',
    tagClass: 'amber',
    title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
    author: 'Rudrendu Paul',
    avatar: 'RP',
    time: '3 days ago',
    thumb: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0a23"/><stop offset="1" stop-color="#feac32"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><circle cx="880" cy="210" r="220" fill="rgba(255,255,255,.10)"/><text x="70" y="360" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas" font-size="54" fill="rgba(255,255,255,.78)">AI GOVERNANCE</text><text x="70" y="420" font-family="ui-sans-serif, system-ui" font-size="22" fill="rgba(255,255,255,.60)">Shipping responsibly, without slowing down.</text></svg>`)
  },
  {
    tag: '#web scraping',
    tagHref: 'tag-web-scraping.html',
    tagClass: '',
    title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
    author: 'Manish Shivanandhan',
    avatar: 'MS',
    time: '6 months ago',
    thumb: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#002ead"/><stop offset="1" stop-color="#0a0a23"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><rect x="70" y="110" width="520" height="420" rx="26" fill="rgba(255,255,255,.10)"/><text x="110" y="220" font-family="ui-monospace, SFMono-Regular, Menlo" font-size="44" fill="rgba(255,255,255,.78)">firecrawl()</text><text x="110" y="285" font-family="ui-sans-serif, system-ui" font-size="22" fill="rgba(255,255,255,.62)">Turn pages into datasets</text><text x="110" y="340" font-family="ui-sans-serif, system-ui" font-size="18" fill="rgba(255,255,255,.55)">Clean HTML → JSON → embeddings</text></svg>`)
  },
  {
    tag: '#Databases',
    tagHref: '#',
    tagClass: '',
    title: 'A Pragmatic Guide to Query Planning: Reading EXPLAIN Like a Pro',
    author: 'iyiola',
    avatar: 'i',
    time: '2 days ago',
    thumb: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0a23"/><stop offset="1" stop-color="#eef0f6"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><g fill="rgba(255,255,255,.14)"><rect x="70" y="110" width="1060" height="70" rx="16"/><rect x="70" y="210" width="820" height="52" rx="14"/><rect x="70" y="284" width="940" height="52" rx="14"/><rect x="70" y="358" width="640" height="52" rx="14"/></g><text x="70" y="520" font-family="ui-monospace, SFMono-Regular, Menlo" font-size="24" fill="rgba(255,255,255,.72)">EXPLAIN ANALYZE</text></svg>`)
  },
  {
    tag: '#React',
    tagHref: '#',
    tagClass: '',
    title: 'React Patterns for Documentation Sites: Search, TOCs, and Fast Reading',
    author: 'Oluwatobi',
    avatar: 'O',
    time: '5 days ago',
    thumb: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0a23"/><stop offset="1" stop-color="#002ead"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><circle cx="280" cy="320" r="190" fill="rgba(254,172,50,.20)"/><text x="520" y="340" font-family="ui-sans-serif, system-ui" font-size="46" fill="rgba(255,255,255,.80)">Readable UI</text><text x="520" y="396" font-family="ui-monospace, SFMono-Regular, Menlo" font-size="22" fill="rgba(255,255,255,.64)">Search • TOC • Anchors</text></svg>`)
  },
  {
    tag: '#data-engineering',
    tagHref: '#',
    tagClass: '',
    title: 'From CSV to Lakehouse: Batch Ingestion Patterns That Scale',
    author: 'Puneet Singh',
    avatar: 'PS',
    time: 'a week ago',
    thumb: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#feac32"/><stop offset="1" stop-color="#0a0a23"/></linearGradient></defs><rect width="1200" height="675" fill="url(#g)"/><path d="M140 470 C 260 330, 420 560, 560 430 S 860 420, 1060 320" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="18" stroke-linecap="round"/><text x="140" y="260" font-family="ui-monospace, SFMono-Regular, Menlo" font-size="32" fill="rgba(255,255,255,.76)">BATCH INGESTION</text></svg>`)
  }
];

