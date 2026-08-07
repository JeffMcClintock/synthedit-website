# SynthEdit Website

Marketing site and documentation for [SynthEdit](https://www.synthedit.com), a visual modular synthesizer editor for creating VST plugins.

## Tech Stack

- **Astro + Starlight** — static site generator with built-in docs support
- **GitHub Actions → FTP** — `.github/workflows/deploy.yml` builds on every push to `main` and uploads `dist/` to `ftp.synthedit.com:/domains/synthedit.com/public_html/_site/`
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
source-assets/             # Source material (.synthedit/.skin files) used to generate
                            # site images/audio — not deployed, not referenced by the site
server/
  root.htaccess            # Version-controlled copy of public_html/.htaccess on the
                            # server. Routes the domain between this site and the old
                            # SilverStripe CMS. NOT deployed by CI — FTP it up by hand.
astro.config.mjs           # Sidebar structure, logo, theme config
netlify.toml               # Netlify build settings
```

## Key Patterns

- **Adding a new doc page**: Create a `.md` file in the appropriate `guides/` or `reference/` folder. Reference pages auto-appear in the sidebar. Guide pages need a manual entry in `astro.config.mjs` sidebar config.
- **Cross-page links**: use **relative paths** like `[Bar](../guides/bar/)`. Note that pages are served with a trailing slash, so a sibling page is `../foo/`, not `./foo/`. Absolute paths like `[Foo](/guides/foo/)` also work now that the site is at the domain root (they did not while it was hosted under `/new/`).
- **Images in MDX HTML blocks**: Must go in `public/images/` and be referenced as `/images/filename.jpg`. Astro-imported images (hero, logo) go in `src/assets/`.
- **Changelog**: Recent entries are manually listed in `installation.mdx` inside a `<div class="se-changelog-scroll">` container. Full changelog links to `https://synthedit.com/release_1_6/changelog.html`.
- **Styling**: All custom CSS is in `src/styles/custom.css`. Uses CSS custom properties from Starlight's theming system (`--sl-color-*`).
- **Source material for generated assets**: `.synthedit`/`.skin` project files used to produce a screenshot or audio demo (but not themselves served) go in `source-assets/` at the repo root — never in `public/` (gets deployed as-is) or `src/assets/` (Astro-imported site images only).

## Download Links

- macOS: `https://synthedit.com/release_1_6/SynthEdit-Installer.dmg`
- Windows: `https://synthedit.com/release_1_6/SynthEdit-Setup.exe`
- Linux (experimental editor): `https://synthedit.com/release_1_6/SynthEdit-linux-x64.tar.gz`

SynthEditCL (headless CLI, the engine behind the MCP / AI-assistant guide):

- Windows installer: `https://synthedit.com/release_1_6/SynthEditCL-Installer.exe`
- macOS zip (also bundled inside SynthEdit.app): `https://synthedit.com/release_1_6/SynthEditCL_mac.zip`
- Linux tarball: `https://synthedit.com/release_1_6/SynthEditCL-linux-x64.tar.gz`

## Local Development

```bash
npm install
npm run dev     # starts dev server at localhost:4321
npm run build   # production build to dist/
```

## Deployment

Push to `main` — the `Deploy to synthedit.com` GitHub Actions workflow runs `npm run build` and FTPs `dist/` to `public_html/_site/`. Site lives at `https://synthedit.com/`. The FTP password is stored as the repo secret `FTP_PASSWORD`. No manual steps needed.

### Sharing the domain with the old site

`public_html/` still contains the previous site — a SilverStripe PHP CMS. Both run side by side:

- `public_html/.htaccess` (see `server/root.htaccess`) maps a URL onto `_site/` **only when a matching file exists there**. Everything else falls through to SilverStripe, so the old pages — `/purchase/`, `/demo/`, `/members/`, `/contact/`, `/downloads/`, `/software-development-kit/`, `/modules/` — keep working at their original URLs, unchanged and still dynamic.
- The old home page is at `/old/`. It can't stay at `/` (that's this site now), and SilverStripe 301s `/home/` to `/`, so the rule targets `/home/index/`, which it serves without redirecting.
- Adding a page here **shadows** any old page at the same URL. `/community/` already exists on both; the new one wins.
- A 404 under a new-site path falls through and renders SilverStripe's 404 page, not Astro's `404.html`. That's a side effect of the fallthrough being what keeps the old site alive.
- CI never writes outside `_site/`, so a deploy can't touch the CMS. Edits to `server/root.htaccess` must be uploaded by hand.
