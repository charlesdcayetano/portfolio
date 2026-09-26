# Charles D. Cayetano — Portfolio

A minimalist developer portfolio built with React, Vite, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`, configured with base path `/portfolio/` for GitHub Pages
deployment at `https://charlesdcayetano.github.io/portfolio/`.

## Replacing the portrait

Replace `public/images/Portrait.webp` with your real photo (same filename, or
update the `src` in `src/components/ProfileHeader.tsx`). A placeholder image is
included so the layout can be previewed before the real photo is added.

## Content

All real content (profile, projects, experience, skills, certifications) lives in
`src/data/*.ts`. Edit those files to update copy — no need to touch the
components themselves.

## Deploying to GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

(Or use a GitHub Actions workflow that builds and publishes `dist/` to the
`gh-pages` branch / Pages settings.)
