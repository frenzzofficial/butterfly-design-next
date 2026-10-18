# Butterfly Design Next

A minimalist, production-ready **Next.js 16** starter with a themeable UI kit, typed configuration and a one-command static export for GitHub Pages.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 + React Compiler · Tailwind CSS 4 · TypeScript (strict) · Zod · Bun

## What you get

- **12 design presets**, each with a light and a dark palette, switchable at runtime and remembered per visitor (no flash on reload)
- **Light / dark / system** mode via `next-themes`
- **Typed configuration**: every environment variable is validated with Zod and exposed through one config object
- **Small UI kit** in `src/components/ui` (`Button`, `ButtonLink`, `Container`, `ThemeToggle`, `PresetSwitcher`, `PresetGrid`)
- **SEO**: metadata, Open Graph, Twitter card, `robots.txt` and `sitemap.xml`
- **Static export** and a ready-made **GitHub Pages** workflow
- **Quality gates**: Biome, TypeScript, cspell, knip, size-limit, commitlint, Husky, syncpack, Changesets

## Quick start

```bash
bun install
cp .env.example .env.local   # optional: every value has a default
bun run dev                  # http://localhost:3000
```

Requires Node 20.9+ and Bun 1.2+. Fonts are fetched from Google Fonts at build time, so the first build needs internet access.

## Make it yours

| What | Where |
| --- | --- |
| Site name, links, social handles | `.env.local` (see `.env.example`) |
| All page text | `src/packages/configs/site.config.ts` |
| Default design preset and light/dark mode | `NEXT_PUBLIC_ACTIVE_DESIGN_PRESET`, `NEXT_PUBLIC_ACTIVE_THEME` |
| Logo and favicon | `public/logo.png`, `src/app/favicon.ico` |
| Fonts | `src/packages/configs/fonts.config.ts` |
| Pages in the sitemap | `ROUTES` in `src/packages/scripts/build-seo-files.ts` |

### Add a design preset

1. Add `my-preset.css` to `src/styles/themes/color-themes/` (or `custom-themes/`) containing a `:root { ... }` and a `.dark { ... }` rule. Exports from [tweakcn](https://tweakcn.com) work as they are.
2. Register it in `src/packages/configs/design-preset.config.ts`. The `name` must match the file name.

`bun run dev` and `bun run build` regenerate the scoped CSS automatically (`bun run themes:build` runs it by hand).

### Use the brand font

`src/assets/fonts/custom.ttf` is mounted on every page. Use it with the `font-brand` class, or point `fonts.config.ts` at `georgia.ttf` / `brilliant-performer.otf`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy-pages.yml` builds the static export and publishes it.

The workflow sets `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` for you. For a custom domain, add it under Settings -> Pages and the base path is empty automatically.

To build the export yourself:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo NEXT_PUBLIC_SITE_URL=https://you.github.io/your-repo bun run build:export
bun run preview:export       # serves ./out
```

> **Static export limits.** `output: "export"` has no server, so route handlers that read the request, Server Actions, rewrites, redirects, headers and the default image optimizer are unavailable. Next also cannot combine `output: "export"` with Cache Components, so the export build turns `cacheComponents` and `partialPrefetching` off. A normal `bun run build` keeps them on, for hosts that run Next.js (Vercel, Node, Docker).

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` / `build` / `start` | Develop, build, and run the server build |
| `bun run build:export` | Static export to `./out` |
| `bun run verify` | Biome (with fixes), typecheck, spellcheck, knip |
| `bun run verify:ci` | The same checks without writing changes |
| `bun run size` | Bundle budget for `./out` (builds the export first if it is missing) |
| `bun run knip` | Find unused files, exports and dependencies |
| `bun run deps:check` / `deps:fix` | Keep dependency versions consistent |
| `bun run commit` | Guided conventional commit |

## Project layout

```
src/
  app/                  routes, layout, 404
  components/
    layouts/            Header, Footer, client providers
    providers/          theme and design-preset providers
    ui/                 UI kit (import from "@/components/ui")
  packages/
    configs/            app, site, SEO, fonts, theme, presets
    env/                Zod-validated environment variables
    scripts/            build-time generators (themes, robots, sitemap)
    seo/                Open Graph, Twitter, metadata
    utils/              cn, fonts, asset-path, errors, async-handler
  styles/               globals.css and preset sources
```

Imports use the `@/` alias for `src/`.

## Notes

- `src/styles/.generated`, `public/robots.txt` and `public/sitemap.xml` are generated on every dev and build run and are git-ignored.
- On a sub-path, `next/link` adds the base path automatically. For plain asset URLs use `assetPath()` from `@/packages/utils/asset-path`.
