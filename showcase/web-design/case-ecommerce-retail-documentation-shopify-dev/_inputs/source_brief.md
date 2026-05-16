# CommerceForge Dev Docs — Build for the Commerce Platform

## Brand
CommerceForge is a developer documentation hub for building apps, storefronts, and AI-powered shopping agents on a leading ecommerce platform. The docs guide developers through building, customizing, and launching commerce experiences with clear documentation, CLI tooling, and community resources.

Brand colors: #000000 (primary/background), #475F91 (accent/link blue), #FFFFFF (text/foreground)

Tone: Professional, modern, minimal. Dark mode default.

## Hero Content
Title: CommerceForge Dev Docs
Subtitle: Learn how to build an app, or customize your storefront. Whether you're just getting started, deep in the development process, or ready to distribute and monetize your work, CommerceForge's docs, dev tools and frameworks make building easy and efficient.
CTA: "Build your first app →" | "Build a storefront →" | "Build agents with UCP →"

## Product Areas
- **Apps** — Extend CommerceForge's core functionality with apps that integrate into the admin, online store, checkout and more. CTA: "Build your first app →"
- **Storefronts** — Help merchants express their unique brand by building a custom theme or Hydrogen storefront. CTA: "Build a storefront →"
- **Agents** — Build agentic shopping experiences powered by CommerceForge merchants, from product discovery to checkout. CTA: "Build agents with UCP →"

## CLI Quick-Start
Title: Accelerate development with CommerceForge CLI 3.0
Subtitle: Initialize new apps, themes, and headless storefronts in an instant with the latest CommerceForge CLI. A single command installs all the dependencies you need, including the CLI itself, so you can dive straight into development.

**Apps accordion:**
1. Install CommerceForge CLI globally.
2. Navigate to the directory where you want to create your app.
3. Run the second command to create a new app. Your app will be added as a new subdirectory.

**Themes accordion:**
1. Install CommerceForge CLI globally.
2. Navigate to the directory where you want to create your theme.
3. Run the second command to clone a starter theme. Your theme will be created in a new subdirectory.

**Headless storefronts accordion:**
1. Install CommerceForge CLI globally.
2. Navigate to the directory where you want to create your Hydrogen storefront.
3. Run the second command to initialize a Hydrogen storefront in a new subdirectory.

Install commands (tabbed):
- **npm:** `npm i -g @commerceforge/cli@latest`
- **yarn:** `yarn global add @commerceforge/cli@latest`
- **pnpm:** `pnpm add -g @commerceforge/cli@latest`

Init commands:
- Apps: `commerceforge app init`
- Themes: `commerceforge theme init`
- Storefronts: `commerceforge hydrogen init`

## Launch CTA
**App Marketplace** — When you're ready, submit your app to the CommerceForge App Marketplace so merchants can find and buy your app through search or personalized recommendations. CTA: "See App Marketplace requirements →"

**Theme Store** — Promote and sell your custom theme to merchants building their brands on the CommerceForge Theme Store. CTA: "See Theme Store requirements →"

## Community Resources
- **Dev Community →** — Q&A and advice from CommerceForge community experts
- **Developer Changelog →** — The latest CommerceForge ecosystem updates
- **YouTube channel →** — Tips and insights in dev and design
- **Partners blog →** — Educational resources and product previews

## App Surfaces
Build across every surface from a single app. All UI surfaces share Polaris, CommerceForge's unified design system.
- **App Home** — Build your app's main interface in the admin with Polaris web components and App Bridge.
- **Admin** — Add actions, blocks, and print functionality to resource pages in the admin.
- **Checkout** — Customize the checkout experience with UI extensions and backend logic.
- **Customer accounts** — Extend order status pages and the logged-in customer experience.
- **Flow** — Integrate triggers, actions, and templates into the automation platform.
- **Online store** — Add dynamic functionality to merchants' storefront themes.

## Building Blocks
Read and write store data with APIs, react to events with webhooks, and customize backend behavior with Functions.
- **GraphQL** — Query and mutate products, customers, orders, inventory, and more.
- **Extensions** — Add your app's functionality to user interfaces with app extensions.
- **Functions** — Customize backend logic for discounts, payments, delivery, and cart validation.
- **Webhooks** — Subscribe to store events and trigger your own logic in real time.
- **Metafields** — Extend resources with custom fields and validation rules.
- **Authentication** — Authenticate with CommerceForge and manage access scopes for your app.

## Use Cases
Integrate with dedicated APIs for specific commerce workflows.
- **Marketing and analytics** — Track customer behavior with web pixels and manage marketing activities.
- **Discounts** — Create custom discount types with Functions and the GraphQL Admin API.
- **Product merchandising** — Manage products, collections, variants, and pricing.
- **Orders and fulfillment** — Manage orders, fulfillments, returns, and shipping workflows.
- **Payments** — Build payment gateways, alternative payments, and redeemable extensions.
- **B2B** — Build for wholesale with company management, catalogs, and draft orders.

## Best Practices
- **Performance** — Optimize speed across admin, checkout, storefront, and POS.
- **Accessibility** — Make your app usable by everyone, including people with disabilities.
- **Security** — Protect your app and merchant data from common vulnerabilities.
- **Compliance** — Follow API terms and privacy law requirements.
- **Localization** — Translate and adapt your app for international merchants.
- **Non-deceptive code** — Meet requirements for transparent and honest app behavior.

## Themes & Theming System
**Themes** — Complete customization on CommerceForge's fully managed platform. Tailor the look and feel of your storefront without worrying about servers, security, or scaling.
- **Create a new theme** — Create and preview a starter theme in minutes, using real store data.
- **Customize an existing theme** — Connect an existing theme codebase to start making updates.

**Theming system highlights:**
- **Powered by Liquid** — A simple and expressive templating language. Mix with standard HTML, CSS, and JavaScript for fully bespoke storefronts.
- **No-code editor, with low-code configuration** — Define composable blocks and sections with a simple JSON schema and let merchants make edits without touching code.
- **Build for the Theme Store** — Create premium themes that work off the shelf, then sell to millions of merchants.
- **Theme app extensions** — Build custom apps to augment storefront functionality.

## Headless APIs
Full-stack control with advanced commerce APIs. Go headless with composable APIs or use Hydrogen, the official headless framework.
- **Storefront API** — Surface product data anywhere, served from the edge with no rate limits.
- **Customer Account API** — Build personalized commerce into any part of your stack.
- **Storefront Web Components** — Sell products anywhere with a few lines of embedded HTML.

## Headless Dev Tools
- **Hydrogen** — Skip the boilerplate and start building fast with CommerceForge's batteries-included headless framework, built on top of Remix.
- **Oxygen** — Host Hydrogen apps on Oxygen, a global serverless edge, and preview every update before deploying to production. No extra charge.

## Mobile Commerce
- **Mobile SDKs** — Build native shopping experiences with SDKs for Android and iOS.
- **Checkout Kit** — Add the world's best performing checkout to your mobile apps.

## Platform Extensions
- **Customer Account extensions** — Add custom functionality to the customer account experience.
- **Checkout UI extensions** — Customize the world's best-performing checkout.

## Agentic Commerce Hero
Title: Agentic commerce has arrived
Subtitle: Build unified agentic experiences that securely act on behalf of users by leveraging Universal Commerce Protocol (UCP) with CommerceForge MCP servers.
CTA: "Start building" — Authenticate, search the Catalog, and refer buyers to checkout for attribution.

## Protocol Overview
The Universal Commerce Protocol (UCP) is an open standard that establishes a common language and a set of primitives that allow agents, merchants, Payment Service Providers (PSPs), and Credential Providers (CPs) to communicate consistently and securely across the web. CommerceForge provides MCP tools that are UCP-compliant to build with this interoperable and extensible protocol.

## Protocol Actors
UCP defines interactions between four primary actors:
- **Agent** — Platforms, agents, and applications acting on behalf of buyers
- **Merchant** — Sellers providing products and fulfillment
- **CP** — Credential Providers managing buyer identity and authentication
- **PSP** — Payment Service Providers handling payment processing

## How It Works
CommerceForge provides MCP tools that implement UCP's core capabilities:
- **Discovery** — Search products across the platform, retrieve details, and help buyers find what they're looking for.
- **Checkout** — Create checkout sessions, collect buyer information, attach payment information, and direct buyers to finish purchases on merchant storefronts.

## Product Discovery
Agents can query all merchants across the CommerceForge platform, apply relevant filters, and display results buyers can interact with using the Catalog MCP server. Once buyers select a product, agentic apps can retrieve variant details needed to create checkout sessions.

## Checkout Flow
As buyers select items from the Catalog, agentic apps can create and update carts and checkouts. Apps can refer buyers directly to merchant storefronts to complete checkout. All developers with Catalog access can direct buyers through Checkout, building referral applications and advertising models by controlling marketing attribution on top of UCP.
Status: Coming soon

## Support Hero
Title: Get answers from Dev Community
Subtitle: Connect with developers and CommerceForge experts to share insights, ask questions, and collaborate on projects.
CTA: "Visit community"

## Additional Support
For non-technical support, read partner program documentation, or reach out to the support team on the CommerceForge Help Center.

## Support Categories
- **Partner Program** — CommerceForge Partner Program, Partner Branding
- **Apps** — App Store Review Process, App Distribution
- **Themes** — Theme Store Review Process, Theme Store Requirements
- **Payout** — Payout Management, Leads & Referrals

## General Queries
For any other non-technical requests, contact the support team.
CTA: "Contact us"

## Navigation
Top nav: Apps · Storefronts · Agents · References · Help · Log in
Utility: Ask assistant (search) · Dark mode toggle

## Footer Navigation
**Updates:** Developer changelog · CommerceForge Editions
**Business growth:** CommerceForge Partners Program · CommerceForge App Marketplace · CommerceForge Academy
**Legal:** Terms of service · API terms of use · Privacy policy · Partners Program Agreement
**CommerceForge:** About CommerceForge · CommerceForge Plus · Careers · Investors · Press and media