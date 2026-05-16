export const siteConfig = {
  name: "CommerceForge",
  tagline: "Dev Docs",
  description: "Build apps, storefronts, and AI-powered shopping agents on the CommerceForge platform.",

  nav: [
    { label: "Apps", href: "apps-build.html" },
    { label: "Storefronts", href: "storefronts.html" },
    { label: "Agents", href: "agents.html" },
    { label: "References", href: "#" },
    { label: "Help", href: "support.html" },
  ],

  hero: {
    title: "CommerceForge Dev Docs",
    subtitle:
      "Learn how to build an app, or customize your storefront. Whether you're just getting started, deep in the development process, or ready to distribute and monetize your work, CommerceForge's docs, dev tools and frameworks make building easy and efficient.",
    ctas: [
      { text: "Build your first app →", href: "apps-build.html" },
      { text: "Build a storefront →", href: "storefronts.html" },
      { text: "Build agents with UCP →", href: "agents.html" },
    ],
  },

  productCards: [
    {
      id: "apps",
      title: "Apps",
      description:
        "Extend CommerceForge's core functionality with apps that integrate into the admin, online store, checkout and more.",
      cta: "Build your first app →",
      href: "apps-build.html",
    },
    {
      id: "storefronts",
      title: "Storefronts",
      description:
        "Help merchants express their unique brand by building a custom theme or Hydrogen storefront.",
      cta: "Build a storefront →",
      href: "storefronts.html",
    },
    {
      id: "agents",
      title: "Agents",
      description:
        "Build agentic shopping experiences powered by CommerceForge merchants, from product discovery to checkout.",
      cta: "Build agents with UCP →",
      href: "agents.html",
    },
  ],

  cliSetup: {
    title: "Accelerate development with CommerceForge CLI 3.0",
    subtitle:
      "Initialize new apps, themes, and headless storefronts in an instant with the latest CommerceForge CLI. A single command installs all the dependencies you need, including the CLI itself, so you can dive straight into development.",
    accordions: [
      {
        id: "apps",
        label: "Apps",
        steps: [
          "Install CommerceForge CLI globally.",
          "Navigate to the directory where you want to create your app.",
          "Run the second command to create a new app. Your app will be added as a new subdirectory.",
        ],
        initCommand: "commerceforge app init",
      },
      {
        id: "themes",
        label: "Themes",
        steps: [
          "Install CommerceForge CLI globally.",
          "Navigate to the directory where you want to create your theme.",
          "Run the second command to clone a starter theme. Your theme will be created in a new subdirectory.",
        ],
        initCommand: "commerceforge theme init",
      },
      {
        id: "headless",
        label: "Headless storefronts",
        steps: [
          "Install CommerceForge CLI globally.",
          "Navigate to the directory where you want to create your Hydrogen storefront.",
          "Run the second command to initialize a Hydrogen storefront in a new subdirectory.",
        ],
        initCommand: "commerceforge hydrogen init",
      },
    ],
    installCommands: {
      npm: "npm i -g @commerceforge/cli@latest",
      yarn: "yarn global add @commerceforge/cli@latest",
      pnpm: "pnpm add -g @commerceforge/cli@latest",
    },
  },

  launchCta: [
    {
      title: "App Marketplace",
      description:
        "When you're ready, submit your app to the CommerceForge App Marketplace so merchants can find and buy your app through search or personalized recommendations.",
      cta: "See App Marketplace requirements →",
      href: "#",
    },
    {
      title: "Theme Store",
      description:
        "Promote and sell your custom theme to merchants building their brands on the CommerceForge Theme Store.",
      cta: "See Theme Store requirements →",
      href: "#",
    },
  ],

  community: [
    { label: "Dev Community →", description: "Q&A and advice from CommerceForge community experts", href: "#" },
    { label: "Developer Changelog →", description: "The latest CommerceForge ecosystem updates", href: "#" },
    { label: "YouTube channel →", description: "Tips and insights in dev and design", href: "#" },
    { label: "Partners blog →", description: "Educational resources and product previews", href: "#" },
  ],

  footer: {
    updates: [
      { label: "Developer changelog", href: "#" },
      { label: "CommerceForge Editions", href: "#" },
    ],
    business: [
      { label: "CommerceForge Partners Program", href: "#" },
      { label: "CommerceForge App Marketplace", href: "#" },
      { label: "CommerceForge Academy", href: "#" },
    ],
    legal: [
      { label: "Terms of service", href: "#" },
      { label: "API terms of use", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Partners Program Agreement", href: "#" },
    ],
    company: [
      { label: "About CommerceForge", href: "#" },
      { label: "CommerceForge Plus", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investors", href: "#" },
      { label: "Press and media", href: "#" },
    ],
  },

  appsPage: {
    hero: {
      title: "Build apps for CommerceForge",
      subtitle:
        "Extend CommerceForge's core functionality with apps that integrate into the admin, online store, checkout, and more. Build across every surface from a single app.",
    },
    devTools: {
      title: "Developer Tools",
      items: [
        { title: "CommerceForge CLI", description: "Initialize, develop, and deploy apps from the command line." },
        { title: "Polaris", description: "CommerceForge's unified design system for building consistent admin interfaces." },
        { title: "App Bridge", description: "Embed your app seamlessly into the CommerceForge admin." },
      ],
    },
    surfaces: [
      { title: "App Home", description: "Build your app's main interface in the admin with Polaris web components and App Bridge." },
      { title: "Admin", description: "Add actions, blocks, and print functionality to resource pages in the admin." },
      { title: "Checkout", description: "Customize the checkout experience with UI extensions and backend logic." },
      { title: "Customer accounts", description: "Extend order status pages and the logged-in customer experience." },
      { title: "Flow", description: "Integrate triggers, actions, and templates into the automation platform." },
      { title: "Online store", description: "Add dynamic functionality to merchants' storefront themes." },
    ],
    buildingBlocks: [
      { title: "GraphQL", description: "Query and mutate products, customers, orders, inventory, and more." },
      { title: "Extensions", description: "Add your app's functionality to user interfaces with app extensions." },
      { title: "Functions", description: "Customize backend logic for discounts, payments, delivery, and cart validation." },
      { title: "Webhooks", description: "Subscribe to store events and trigger your own logic in real time." },
      { title: "Metafields", description: "Extend resources with custom fields and validation rules." },
      { title: "Authentication", description: "Authenticate with CommerceForge and manage access scopes for your app." },
    ],
    useCases: [
      { title: "Marketing and analytics", description: "Track customer behavior with web pixels and manage marketing activities." },
      { title: "Discounts", description: "Create custom discount types with Functions and the GraphQL Admin API." },
      { title: "Product merchandising", description: "Manage products, collections, variants, and pricing." },
      { title: "Orders and fulfillment", description: "Manage orders, fulfillments, returns, and shipping workflows." },
      { title: "Payments", description: "Build payment gateways, alternative payments, and redeemable extensions." },
      { title: "B2B", description: "Build for wholesale with company management, catalogs, and draft orders." },
    ],
    bestPractices: [
      { title: "Performance", description: "Optimize speed across admin, checkout, storefront, and POS." },
      { title: "Accessibility", description: "Make your app usable by everyone, including people with disabilities." },
      { title: "Security", description: "Protect your app and merchant data from common vulnerabilities." },
      { title: "Compliance", description: "Follow API terms and privacy law requirements." },
      { title: "Localization", description: "Translate and adapt your app for international merchants." },
      { title: "Non-deceptive code", description: "Meet requirements for transparent and honest app behavior." },
    ],
  },

  storefrontsPage: {
    hero: {
      title: "Build storefronts on CommerceForge",
      subtitle:
        "Help merchants express their unique brand by building a custom theme or Hydrogen storefront. From fully managed themes to headless commerce, you have full control.",
    },
    themes: {
      title: "Themes",
      description:
        "Complete customization on CommerceForge's fully managed platform. Tailor the look and feel of your storefront without worrying about servers, security, or scaling.",
      items: [
        { title: "Create a new theme", description: "Create and preview a starter theme in minutes, using real store data." },
        { title: "Customize an existing theme", description: "Connect an existing theme codebase to start making updates." },
      ],
    },
    themingSystem: {
      title: "Theming system highlights",
      items: [
        { title: "Powered by Liquid", description: "A simple and expressive templating language. Mix with standard HTML, CSS, and JavaScript for fully bespoke storefronts." },
        { title: "No-code editor, with low-code configuration", description: "Define composable blocks and sections with a simple JSON schema and let merchants make edits without touching code." },
        { title: "Build for the Theme Store", description: "Create premium themes that work off the shelf, then sell to millions of merchants." },
        { title: "Theme app extensions", description: "Build custom apps to augment storefront functionality." },
      ],
    },
    headlessApis: [
      { title: "Storefront API", description: "Surface product data anywhere, served from the edge with no rate limits." },
      { title: "Customer Account API", description: "Build personalized commerce into any part of your stack." },
      { title: "Storefront Web Components", description: "Sell products anywhere with a few lines of embedded HTML." },
    ],
    headlessDevTools: [
      { title: "Hydrogen", description: "Skip the boilerplate and start building fast with CommerceForge's batteries-included headless framework, built on top of Remix." },
      { title: "Oxygen", description: "Host Hydrogen apps on Oxygen, a global serverless edge, and preview every update before deploying to production. No extra charge." },
    ],
    mobileCommerce: [
      { title: "Mobile SDKs", description: "Build native shopping experiences with SDKs for Android and iOS." },
      { title: "Checkout Kit", description: "Add the world's best performing checkout to your mobile apps." },
    ],
    platformExtensions: [
      { title: "Customer Account extensions", description: "Add custom functionality to the customer account experience." },
      { title: "Checkout UI extensions", description: "Customize the world's best-performing checkout." },
    ],
  },

  agentsPage: {
    hero: {
      title: "Agentic commerce has arrived",
      subtitle:
        "Build unified agentic experiences that securely act on behalf of users by leveraging Universal Commerce Protocol (UCP) with CommerceForge MCP servers.",
      cta: "Start building",
    },
    protocolOverview: {
      title: "Protocol Overview",
      description:
        "The Universal Commerce Protocol (UCP) is an open standard that establishes a common language and a set of primitives that allow agents, merchants, Payment Service Providers (PSPs), and Credential Providers (CPs) to communicate consistently and securely across the web. CommerceForge provides MCP tools that are UCP-compliant to build with this interoperable and extensible protocol.",
    },
    protocolActors: [
      { title: "Agent", description: "Platforms, agents, and applications acting on behalf of buyers" },
      { title: "Merchant", description: "Sellers providing products and fulfillment" },
      { title: "CP", description: "Credential Providers managing buyer identity and authentication" },
      { title: "PSP", description: "Payment Service Providers handling payment processing" },
    ],
    howItWorks: {
      title: "How It Works",
      description:
        "CommerceForge provides MCP tools that implement UCP's core capabilities:",
      items: [
        { title: "Discovery", description: "Search products across the platform, retrieve details, and help buyers find what they're looking for." },
        { title: "Checkout", description: "Create checkout sessions, collect buyer information, attach payment information, and direct buyers to finish purchases on merchant storefronts." },
      ],
    },
    productDiscovery: {
      title: "Product Discovery",
      description:
        "Agents can query all merchants across the CommerceForge platform, apply relevant filters, and display results buyers can interact with using the Catalog MCP server. Once buyers select a product, agentic apps can retrieve variant details needed to create checkout sessions.",
    },
    checkoutFlow: {
      title: "Checkout Flow",
      description:
        "As buyers select items from the Catalog, agentic apps can create and update carts and checkouts. Apps can refer buyers directly to merchant storefronts to complete checkout. All developers with Catalog access can direct buyers through Checkout, building referral applications and advertising models by controlling marketing attribution on top of UCP.",
      status: "Coming soon",
    },
  },

  supportPage: {
    hero: {
      title: "Get answers from Dev Community",
      subtitle:
        "Connect with developers and CommerceForge experts to share insights, ask questions, and collaborate on projects.",
      cta: "Visit community",
    },
    additionalSupport: {
      title: "Additional Support",
      description:
        "For non-technical support, read partner program documentation, or reach out to the support team on the CommerceForge Help Center.",
    },
    supportCategories: [
      { title: "Partner Program", description: "CommerceForge Partner Program, Partner Branding" },
      { title: "Apps", description: "App Store Review Process, App Distribution" },
      { title: "Themes", description: "Theme Store Review Process, Theme Store Requirements" },
      { title: "Payout", description: "Payout Management, Leads & Referrals" },
    ],
    generalQueries: {
      title: "General Queries",
      description: "For any other non-technical requests, contact the support team.",
      cta: "Contact us",
    },
  },
};
