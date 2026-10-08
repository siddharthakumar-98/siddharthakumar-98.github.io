# siddharthakumar-98.github.io

Personal portfolio of Siddhartha Kumar Senthil Kumar: <https://siddharthakumar-98.github.io/>

Built with React, TypeScript and Vite. All content lives in [`src/data.ts`](src/data.ts); the resume PDF is served from [`public/`](public/).

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages.
One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

The previous static versions of the site are kept in [`legacy/`](legacy/).
