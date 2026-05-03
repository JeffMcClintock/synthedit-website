# SynthEdit Website

Marketing site and documentation for [SynthEdit](https://www.synthedit.com), a visual modular synthesizer editor for creating VST plugins.

## Tech Stack

- **Astro + Starlight** — static site generator with built-in docs support
- **GitHub Actions → FTP** — `.github/workflows/deploy.yml` builds on every push to `main` and uploads `dist/` to `ftp.synthedit.com:/domains/synthedit.com/public_html/new/`
- **Node.js** — required for local dev (`npm run dev`)

## Project Structure

```
src/
  content/docs/
    index.mdx              # Marketing homepage (splash layout)
    guides/
      introduction.md      # What is SynthEdit
      installation.mdx     # Download page with changelog
      first-synth.md       # Tutorial
      modules.md           # Working with modules
      creating-vst-plugins.md
    reference/             # Module docs (auto-generates sidebar)
      example.md           # Oscillator reference
  styles/
    custom.css             # Dark theme, all custom styling
  assets/                  # Images used via Astro imports (hero, logo)
public/
  images/                  # Images used in raw HTML blocks (features, showcase)
astro.config.mjs           # Sidebar structure, logo, theme config
netlify.toml               # Netlify build settings
```

## Key Patterns

- **Adding a new doc page**: Create a `.md` file in the appropriate `guides/` or `reference/` folder. Reference pages auto-appear in the sidebar. Guide pages need a manual entry in `astro.config.mjs` sidebar config.
- **Cross-page links**: use **relative paths** like `[Foo](./foo/)` or `[Bar](../guides/bar/)`. Markdown absolute paths like `[Foo](/guides/foo/)` do NOT get the `/new/` base prepended and will 404 while the site is hosted under `/new/`. Starlight's auto-generated sidebar links work fine; this is only a concern for inline links inside `.md`/`.mdx` content.
- **Images in MDX HTML blocks**: Must go in `public/images/` and be referenced as `/images/filename.jpg`. Astro-imported images (hero, logo) go in `src/assets/`.
- **Changelog**: Recent entries are manually listed in `installation.mdx` inside a `<div class="se-changelog-scroll">` container. Full changelog links to `https://synthedit.com/release_1_6/changelog.html`.
- **Styling**: All custom CSS is in `src/styles/custom.css`. Uses CSS custom properties from Starlight's theming system (`--sl-color-*`).

## Download Links

- macOS: `https://synthedit.com/release_1_6/SynthEdit-Installer.dmg`
- Windows: `https://synthedit.com/release_1_6/SynthEdit.msix`

## Local Development

```bash
npm install
npm run dev     # starts dev server at localhost:4321
npm run build   # production build to dist/
```

## Deployment

Push to `main` — the `Deploy to synthedit.com/new` GitHub Actions workflow runs `npm run build` and FTPs `dist/` to the server. Site lives at `https://synthedit.com/new/`. The FTP password is stored as the repo secret `FTP_PASSWORD`. No manual steps needed.

When ready to move from `/new/` to the site root, remove `base: '/new/'` from `astro.config.mjs` and update the workflow's `server-dir` to `/domains/synthedit.com/public_html/`.
