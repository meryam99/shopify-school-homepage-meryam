Stellar Soft – Storefront (Vite)

A small storefront prototype: hero slider, product gallery with thumbnails & color swatches, FAQ accordion, “Need Help?” form, responsive footer, and a timed newsletter popup.

🚀 Run locally
Requirements

Node.js ≥ 18 (LTS recommended)

npm ≥ 9 (or use pnpm/yarn if you prefer)

Install & start
# 1) install deps
npm install

# 2) start dev server (Vite)
npm run dev


Vite will print a local URL (typically http://localhost:5173/).

Build & preview
# production build
npm run build

# preview the built site locally
npm run preview


🛠️ Tech stack

Vite (dev server & build)

Vanilla JS (ES Modules)

CSS: Flexbox/Grid, custom properties, responsive media queries

Swiper.js (hero/products sliders)

Google Fonts (Poppins)


🧪 What I’d improve with more time

A11y:

Full focus trap in the popup and return focus to opener.

Keyboard support for sliders (left/right), and for color/size groups (roving tabindex).

Performance:

Responsive images (<img srcset/sizes>), WebP/AVIF, lazy loading.

Preload hero fonts with font-display: swap.

Data layer:

Fetch product data from JSON/API instead of hardcoded objects.

Persist size/color selections.

Testing:

Unit tests with Vitest, e2e with Playwright.

Tooling:

GitHub Actions CI (lint, test, build).

husky + lint-staged pre-commit hooks.

i18n:

Extract copy into a messages file for multi-language support.

Design polish:

Motion (micro-interactions), skeleton loaders, better empty/error states.