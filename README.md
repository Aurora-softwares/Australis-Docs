# Australis OS website and documentation

A welcoming home for **Australis OS**, part of Aurora Softwares. Built with **Astro 7 + Starlight**, with a warm, pastel, glass-inspired landing page in the spirit of **Astro Haze**.

## Local development

Requires Node.js 22.12 or later.

~~~sh
npm install
npm run dev
npm run build
~~~

The welcome page is at `/`; the searchable documentation lives at `/docs/`. The site uses GitHub Pages' `/Australis-Docs/` base path.

## Where to edit

- `src/pages/index.astro` — the welcome page, gallery, and feature cards.
- `src/styles/site.css` — homepage layout and pastel design tokens.
- `src/styles/docs.css` — Starlight's matching warm documentation theme.
- `astro.config.mjs` — documentation sidebar and site settings.
- **`docs/**/*.md` — the authoritative documentation.** All existing pages are retained.
- `public/screenshots/` — actual OS screenshots, when available.

`scripts/prepare-docs.mjs` mirrors and normalizes the original Markdown to `src/content/docs/docs/` before dev/build. **Do not edit this generated folder**; edit `docs/` instead.

## Screenshots

Add real screenshots of the running OS as `public/screenshots/desktop.png`, `terminal.png`, or `boot.png`. The homepage detects files that exist and displays them automatically. Until then it displays clearly marked illustrative panels; no images are presented as real captures without evidence.

The site is deployed to GitHub Pages on pushes to **Release**. Pull requests to **Development** or **Release** run a build check without publishing.

The landing design is inspired by Astro Haze's visual approach, rather than distributing its complete starter, while Starlight supplies the documentation UI and search.
