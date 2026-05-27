// Site configuration for ClipCast
export const siteConfig = {
  name: "ClipCast",
  tagline: "One video is worth a thousand words",
  description: "A free screen recorder and async video messaging platform that helps teams communicate faster with AI-powered video creation, editing, and sharing.",
  url: "https://clipcast.com",
  brandColors: {
    primary: "#1868DB",
    accent: "#FF613D",
    dark: "#292A2E",
    light: "#F8F9FC"
  },

  navigation: [
    { label: "Enterprise", href: "/enterprise.html" },
    { label: "Pricing", href: "/pricing.html" },
    { label: "Sign In", href: "/login.html" },
  ],

  hero: {
    badge: "",
    title: "One video is worth a thousand words",
    subtitle: "Easily record and share AI-powered video messages with your teammates and customers to supercharge productivity",
    cta: { text: "Get ClipCast for free", href: "/signup.html" },
    secondaryCta: { text: "Install Chrome Extension", href: "#" },
  },

  socialProof: {
    text: "Millions of people across 400,000 companies choose ClipCast",
    logos: ["Stripe", "Dropbox", "HubSpot", "Atlassian", "Launchdarkly", "Netflix"]
  },

  features: {
    aiBugReports: {
      label: "New!",
      title: "Ship faster with AI bug reports",
      description: "Record a quick walkthrough and let ClipCast's AI turn it into a fully populated Jira work item in a few clicks. ClipCast automatically captures the technical details devs need (device/browser/OS, console errors, and network activity) to pinpoint the problem fast and move work forward.",
      cta: { text: "Learn more", href: "#" }
    },
    screenRecorder: {
      title: "The easiest screen recorder you'll ever use",
      subtitle: "Record in a few clicks. Share anywhere. Collaborate better.",
      description: "Easily record your screen and camera. Record on any device using ClipCast's Chrome extension, desktop app, or mobile app.",
      cta: { text: "Download now", href: "#" }
    },
    videoEditor: {
      title: "So much more than a screen recorder",
      points: [
        { title: "Edit your videos like a pro", desc: "ClipCast's intuitive editor lets you trim, stitch clips, add eye-catching backgrounds, and even enhance your message with text, arrows, and box overlays." },
        { title: "Share or embed video anywhere you work", desc: "From Google Workspace to Slack, ClipCast videos seamlessly integrate with hundreds of tools you use every day." },
        { title: "Engage and connect with video", desc: "Easily collaborate by adding emojis, comments, tasks and CTAs to your video message. Empower remote teams with transcripts and captions in 50+ languages." }
      ]
    }
  },

  useCases: [
    { title: "Sales", desc: "Personalize your pitch with video outreach to close more deals." },
    { title: "Engineering", desc: "Add visual context to your code to accelerate your sprints." },
    { title: "Customer support", desc: "Troubleshoot over video to reach resolutions faster." },
    { title: "Design", desc: "Share ideas and provide feedback over video to enhance designs." }
  ],

  featuresGrid: [
    { title: "Screen and camera recording" },
    { title: "Easy sharing and embedding" },
    { title: "Trim and stitch video clips" },
    { title: "Download and upload" },
    { title: "Transcriptions and closed captions" },
    { title: "Video privacy controls" },
    { title: "Custom background" },
    { title: "Video and viewer insights" }
  ],

  security: {
    title: "Keep your content safe",
    description: "Enterprise-grade security to keep your data and your customer's data private and secure. We offer SSO, SCIM as well as custom data retention policies and privacy settings.",
    features: [
      "GDPR, CCPA, and SOC 2 Type 2 compliant",
      "Built on the AWS-backbone with secure and reliable infrastructure",
      "Equipped with advanced admin controls to protect sensitive information internally",
      "Secured with encrypted data and industry-standard security frameworks"
    ],
    cta: { text: "Learn more", href: "/enterprise.html" }
  },

  stats: [
    { value: "50%", label: "fewer meetings across organizations" },
    { value: "18%", label: "increase in traffic on webpages with ClipCast videos" },
    { value: "19%", label: "boost in reply rates across sales outreach" }
  ],

  testimonials: [
    { quote: "ClipCast enables us to maximize our impact as a distributed company by helping us collaborate and share ideas more easily.", name: "Andrew Reynolds", role: "Design Lead, MetaLab" },
    { quote: "I think it's the plug-and-play, intuitive, frictionless nature of ClipCast that allows us to create personalized videos so quickly and see such an impressive increase in our response rate.", name: "Bucky Henry", role: "Sales Manager, Intercom" },
    { quote: "ClipCast allows me to connect more personally with people without having to do 75 different one-on-one calls, which is just impossible at scale.", name: "Katie Burke", role: "Chief People Officer, HubSpot" },
    { quote: "My teammates and I love using ClipCast! It has saved us hundreds of hours by creating informative video tutorials instead of long emails or 1-on-1 trainings with customers.", name: "Erica Goodell", role: "Customer Success, Pearson" },
    { quote: "ClipCast gave us an affordable platform to create personalized video content from our laptops, without the need for expensive video production teams.", name: "Chris Radtke", role: "Sr Director of Content Marketing, Braze" },
    { quote: "I've sent ClipCasts externally three times this month instead of scheduling a meeting and the first response is always, 'This is great, why don't more people do this?'", name: "Colby Howard", role: "Founding Partner, Paragon Intel" }
  ],

  blogPosts: [
    { title: "When to Choose Synchronous Vs. Asynchronous Communication", desc: "This guide explores the intricacies of sync vs. async communication, helps you decide which is best for your workflow, and introduces how screen recording bridges the gap." },
    { title: "Let ClipCast AI Do the Work: Say Goodbye to Manual Documentation", desc: "With new ClipCast AI workflows, you turn any video into a written doc to draft SOPs, file Jira tickets, and more." }
  ],

  aiFeatures: {
    title: "ClipCast AI",
    subtitle: "Just hit record and ClipCast AI will do the rest. Instant edits, enhancements, and recaps for all your video recordings.",
    features: ["Auto-meeting notes (NEW)", "Auto-meeting recaps (NEW)", "Video-to-text automation", "Variables (NEW)", "Auto-titles & summaries", "Filler word removal"],
    cta: { text: "Try for free", href: "/signup.html" }
  },

  pricing: {
    title: "Choose the plan that fits your needs.",
    billingNote: "SAVE UP TO 17%",
    plans: [
      {
        name: "Starter",
        price: 0,
        label: "",
        cta: "Sign up",
        href: "/signup.html",
        highlight: "25 videos, 5 min screen recordings, unlimited meeting length, transcriptions in 50+ languages"
      },
      {
        name: "Business",
        price: 18,
        label: "",
        cta: "Try for free",
        href: "/signup.html",
        highlight: "Everything in Starter + unlimited videos, unlimited recording, basic waveform editing, remove branding, upload & download"
      },
      {
        name: "Business + AI",
        price: 24,
        label: "MOST POPULAR",
        cta: "Try for free",
        href: "/signup.html",
        highlight: "Everything in Business + auto-video enhancement, advanced editing, video-to-text automation, auto-meeting recap emails, auto-meeting notes"
      },
      {
        name: "Enterprise",
        price: null,
        label: "",
        cta: "Contact Sales",
        href: "/enterprise.html",
        highlight: "Everything in Business + AI + advanced security (SSO, SCIM), Salesforce integration, 99.95% uptime SLA, admin insights"
      }
    ]
  },

  comparisonTable: {
    headers: ["Feature", "Starter", "Business", "Business + AI", "Enterprise"],
    rows: [
      ["Members", "Up to 50", "Unlimited", "Unlimited", "Unlimited"],
      ["Recordings per person", "Up to 25", "Unlimited", "Unlimited", "Unlimited"],
      ["Screen recording length", "5 min per video", "Unlimited", "Unlimited", "Unlimited"],
      ["Screenshots", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
      ["Video quality", "Up to 720p", "High-def up to 4k", "High-def up to 4k", "High-def up to 4k"],
      ["Loom AI features", "—", "—", "Included", "Included"],
      ["Trim & stitch videos", "—", "Included", "Included", "Included"],
      ["Edit by transcript", "—", "—", "Included", "Included"],
      ["Remove branding", "—", "Included", "Included", "Included"],
      ["Custom branding", "—", "Included", "Included", "Included"],
      ["Engagement insights", "—", "Included", "Included", "Included"],
      ["Password protected videos", "—", "Included", "Included", "Included"],
      ["SSO (SAML)", "—", "—", "—", "Included"],
      ["SCIM provisioning", "—", "—", "—", "Included"],
      ["Custom data retention", "—", "—", "—", "Included"],
      ["Salesforce integration", "—", "—", "—", "Included"],
      ["Priority support", "—", "Included", "Included", "Included"],
      ["Dedicated account manager", "—", "—", "—", "Included"]
    ]
  },

  faq: [
    { q: "Can I start a free trial of paid plans?", a: "Yes, you can try our Business + AI plan free for 14 days. If you would like a free 14-day trial of our Enterprise plan please contact sales." },
    { q: "Why should I consider getting ClipCast Business + AI?", a: "The ClipCast AI suite reduces time spent packaging and sharing videos after recording. 67% of users do not edit the auto-generated title. 73% of people said it is \"extremely or very valuable\" to their workflows. 18% more viewer engagement with AI-enhanced videos." },
    { q: "What enterprise-grade security features does ClipCast offer?", a: "Enforced single sign-on (SSO), SCIM automated user provisioning, organization audit log, and advanced admin controls are included in the Enterprise plan." },
    { q: "What are my payment options?", a: "You can be billed monthly, but save 17% if you pay annually. We accept credit card payment; for ACH, reach out to our Sales team." }
  ],

  footerNav: {
    app: ["Pricing", "ClipCast SDK", "Screen Recorder", "Screenshot", "Chrome Screen Recorder", "Mac Screen Recorder", "Windows Screen Recorder", "iPhone Screen Recorder", "Android Screen Recorder"],
    solutions: ["Sales", "Engineering", "Design", "Marketing", "Product Management", "Support", "Presentation", "Team Alignment", "Education", "Webcam Recorder"],
    forBusiness: ["ClipCast AI", "Enterprise", "ClipCast HQ", "Customer Stories", "Security", "Video Hosting", "Video Library"],
    downloads: ["Desktop App", "Chrome Extension", "Mobile Apps"],
    resources: ["Blog", "Help Center", "Community", "eBooks", "Status", "What's New"],
    company: ["About Us", "Diversity, Equity & Inclusion", "Careers", "Newsroom", "Media Kit"]
  }
}