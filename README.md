# Fort Wayne Web Studio

Static site — deploys automatically to Cloudflare Pages.

## Deploy

1. Push this repo to GitHub
2. In Cloudflare Pages dashboard: **New Project → Connect to Git → select this repo**
3. Build settings: Framework preset = **None**, Build command = *(leave blank)*, Output directory = `/`
4. Set environment: Production branch = `main`

## Adding a portfolio project

Open `index.html` and find the `<!-- PORTFOLIO -->` comment block.
Copy an existing `<article class="project-card">` and update the fields.
See `images/README.md` for image specs.

## Updating contact email

Search for `dexter@fortwaynebusinesses.com` across all files and replace with the new address.

## Replacing the GA tag

Search for `G-XXXXXXXXXX` across all files and replace with your real Google Analytics measurement ID.

## File structure

```
/
├── index.html          Home page
├── about.html
├── contact.html
├── faq.html
├── css/
│   ├── style.css       Design tokens, reset, shared components
│   ├── nav.css         Navbar, mobile drawer, footer
│   ├── home.css        Hero, stats, services, portfolio, why-us, testimonials, CTA
│   ├── about.css
│   ├── contact.css
│   └── faq.css
├── js/
│   ├── main.js         Dark mode, custom cursor, nav scroll
│   ├── nav.js          Mobile hamburger drawer
│   └── animations.js   Scroll reveal, counters, portfolio filter, FAQ accordion
├── images/
│   └── README.md       Instructions for adding project screenshots
├── _redirects          Cloudflare Pages redirect rules
└── _headers            Security headers
```
