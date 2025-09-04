# Stellar Soft – Storefront (Vite)

A small storefront prototype: hero slider, product gallery with thumbnails & color swatches, FAQ accordion, “Need Help?” form, responsive footer, and a timed newsletter popup.

Check via https://meryam99.github.io/shopify-school-homepage-meryam/

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

Keyboard support for sliders (left/right), and for color/size groups.

Lazy loading and skeleton loaders.

With more time, I’d refactor the code to be cleaner and better organized. I also added inline comments to lightly explain and structure parts of the implementation :)
I focused on delivering a refined Product Details page. The client-side state links color, price, and sizes: switching colors updates the main image and thumbnails, refreshes the price, and enables the correct size options, with sensible defaults. This makes the product detail page feel cohesive and responsive.
