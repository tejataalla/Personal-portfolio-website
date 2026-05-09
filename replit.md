# Taalla Teja Portfolio

A modern, dark-themed personal portfolio website for Taalla Teja — a fresher Software Engineer specializing in Python Full Stack Development.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (preview at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Portfolio**: Plain HTML5 + CSS3 + JavaScript, served via Vite
- **Styling**: Bootstrap 5 (CDN) + custom dark CSS with CSS variables
- **Icons**: Bootstrap Icons (CDN)
- **Fonts**: Inter + Fira Code (Google Fonts CDN)
- API: Express 5 (shared api-server)
- DB: PostgreSQL + Drizzle ORM (available but not used by portfolio)

## Where things live

- `artifacts/portfolio/index.html` — full portfolio HTML (all sections)
- `artifacts/portfolio/src/styles.css` — all custom dark-theme CSS styles
- `artifacts/portfolio/src/script.js` — typing animation, scroll reveal, navbar, form logic

## Architecture decisions

- Portfolio is built as plain HTML/CSS/JS (not React) served via Vite — per user's explicit request
- Bootstrap 5 loaded from CDN for zero build-step dependency
- CSS custom properties (design tokens) control the entire color palette from `:root`
- Intersection Observer API powers scroll-reveal and skill card stagger animations
- No backend — contact form uses client-side simulation only

## Product

A fully responsive personal portfolio with 9 sections: Hero (typing animation), About, Skills (7 cards), Featured Project, Internship, Education, Resume download, Contact form, and Footer with social links.

## User preferences

- Separate HTML, CSS, and JS files (no React components)
- Dark modern UI with cyan (#00d4ff) accent color
- Bootstrap 5 for layout and components
- Bootstrap Icons for iconography

## Gotchas

- Bootstrap and Bootstrap Icons are loaded from jsDelivr CDN — no npm install needed
- Changing the Vite base path requires updating internal asset references in index.html
