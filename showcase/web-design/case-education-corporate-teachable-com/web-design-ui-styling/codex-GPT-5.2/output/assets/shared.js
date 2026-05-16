const LearnForge = (() => {
  const BRAND = {
    name: 'LearnForge',
    primaryCta: { label: 'Start Free Trial', href: '#free-trial' },
  };

  const NAV = [
    { label: 'Online Courses', href: 'online-courses.html' },
    { label: 'Digital Downloads', href: 'digital-downloads.html' },
    { label: 'Memberships', href: 'memberships.html' },
    { label: 'Coaching', href: 'coaching.html' },
  ];

  const STATS = [
    { big: '$12B+', label: 'earned by creators' },
    { big: '120M+', label: 'students served' },
    { big: '180 countries', label: 'global reach' },
  ];

  const INTEGRATIONS = [
    'Stripe','Zapier','Google Analytics','Mailchimp','Google Tag Manager','Zoom','AWeber','Pinterest','Unsplash','PayPal','HotJar','OneDrive','TikTok','Segment','Meta','Dropbox','Google Drive','Calendly'
  ];

  const TESTIMONIALS = [
    {
      name: 'Leila G.',
      org: 'XelPlus Academy',
      headline: 'Global Reach',
      quote: 'With students from 188 countries, tax compliance could have been a nightmare. LearnForge handles it all, so we can focus on helping members upgrade their data skills.',
    },
    {
      name: 'Erin B.',
      org: 'Virtual Assistant Coach',
      headline: 'Full Control',
      quote: 'You should never have anyone dictating the prices you charge. With LearnForge, you get full control—you can build real relationships instead of going through third parties.',
    },
    {
      name: 'Razvan C.',
      org: 'Voxyde',
      headline: 'Peace of Mind',
      quote: 'LearnForge delivers excellent uptime. That peace of mind is invaluable. The built-in tax handling frees me to focus on creating content.',
    },
    {
      name: 'Francesco C.',
      org: 'Vaporetto Italiano',
      headline: 'Essential',
      quote: 'LearnForge has been essential for reaching thousands of students worldwide. It handles payments, taxes, and enrollments so I can focus on the creative side.',
    },
    {
      name: 'Dan G.',
      org: 'FlightInsight',
      headline: '10,000+ Students',
      quote: 'What started as a few dozen students has grown into 10,000+ pilots worldwide. My courses run 24/7 while I focus on teaching.',
    },
    {
      name: 'Huzan R. & Nicoleta S.',
      org: 'Speak Norsk',
      headline: 'Made Simple',
      quote: 'The platform made it simple to create and deliver our programs, and even let us offer a free course so students could get comfortable.',
    },
    {
      name: 'Anna G.',
      org: 'The Science of Reading',
      headline: 'Revenue Engine',
      quote: "I've been using LearnForge since 2017, and it continues to be a major revenue generator. Hands down the best platform.",
    },
  ];

  const FAQ_HOME = [
    {
      q: 'Can I cancel my account at any time?',
      a: "Yes, simply cancel your account if LearnForge isn't right for you.",
    },
    {
      q: 'Can I change my plan once I sign up?',
      a: 'Yes, change your plan at any time from your admin. Your new amount is charged at your next billing date.',
    },
    {
      q: 'Are there any transaction fees?',
      a: '0% on Builder, Growth, Advanced, and Unlimited plans using LearnForge:pay. 7.5% on Starter. Standard processing fees may apply.',
    },
    {
      q: 'Who uses LearnForge?',
      a: 'Creators, experts, entrepreneurs, and businesses serious about education—from language teachers to finance professionals to health and fitness leaders.',
    },
  ];

  const FAQ_GENERIC = [
    {
      q: 'Does LearnForge support global payments?',
      a: 'Yes—sell in 130+ currencies across 200+ countries with modern payment methods and tax handling.',
    },
    {
      q: 'Can I use LearnForge with my existing tools?',
      a: 'Absolutely. Connect to popular tools and automate workflows with integrations like Stripe, Zapier, and Mailchimp.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes. Start with a 7-day free trial to find the plan that fits your business.',
    },
    {
      q: 'Can I change what I sell later?',
      a: 'Yes—add courses, coaching, downloads, and memberships anytime as your business evolves.',
    },
  ];

  const FOOTER = {
    Explore: ['Pricing', 'Example Schools', 'Product Demo'],
    Company: ['About us', 'Careers', 'Press', 'Partners', 'Newsletter'],
    Support: ['Help Center', 'Blog', 'Pricing', 'House Rules', 'Content Guidelines'],
    Legal: ['Privacy Policy', 'Terms of Use', 'Cookies Policy', 'Ethics Line', 'Accessibility'],
  };

  return {
    BRAND,
    NAV,
    STATS,
    INTEGRATIONS,
    TESTIMONIALS,
    FAQ_HOME,
    FAQ_GENERIC,
    FOOTER,
  };
})();

