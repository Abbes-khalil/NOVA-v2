# NOVA Shopify theme

Personal/demo streetwear portfolio project based on the NOVA CDC v1.1 (October 2026) in the parent directory.

## Current stage

Sprint 2 global storefront is implemented locally: editable announcement bar, logo/menu header, responsive three-level navigation and configurable footer. Sprint 1 foundations remain in place. Theme Check passes; live Shopify rendering and browser verification are pending. Store connection, merchant data and later storefront sprints remain pending. This is not a completed store.

## Development

Requirements: Node.js >=22.12.0 and Git. Run from theme/:

```powershell
npm ci --ignore-scripts --cache .npm-cache
npm run check
npm run dev -- --store YOUR-STORE.myshopify.com
```

The dev command prompts for Shopify authentication and previews a development theme. Use a development store and an account with theme access. Keep credentials outside source files.

Optional: copy shopify.theme.toml.example to shopify.theme.toml, replace the store address, then run npm run dev -- --environment development. Git ignores the local configuration.

npm run check:json produces structured diagnostics. npm run package creates a theme ZIP. No frontend build step is needed: Shopify renders Liquid and serves assets.

## Structure

- assets/: CSS, JavaScript, icons and static assets.
- blocks/: reusable theme blocks with editable schemas.
- config/: global theme settings and values.
- layout/: page wrappers, including theme.liquid.
- locales/: storefront and theme-editor translations.
- sections/: configurable page regions and section groups.
- snippets/: reusable Liquid fragments; product-card is planned here.
- templates/: Online Store 2.0 JSON templates and the gift-card Liquid template.
- docs/: requirements, implementation roadmap and setup evidence.

Reuse existing Skeleton files. Shopify Admin owns merchant data; do not hardcode product or collection handles.

## Source and version

Official source: https://github.com/Shopify/skeleton-theme

Pinned base: a4f32d393b9eadf6c4403318ca39116832e5d1df (February 26, 2026). The October 1 upstream change removed sections and JSON templates; this previous official revision matches the CDC's required architecture. Upstream history and MIT license are preserved. Original README: docs/SKELETON-UPSTREAM.md.

Shopify CLI is installed locally and pinned to 4.9.3. package-lock.json records exact dependencies. Installation skips dependency lifecycle scripts.

## Git workflow

Working branch: feature/sprint-2. Develop later sprints on focused branches and validate before merging into a NOVA main branch. The cloned origin belongs to Shopify; create a personal GitHub repository before pushing NOVA work. No NOVA remote repository or publishing step has been completed.

See docs/ROADMAP.md, docs/SETUP.md, docs/SPRINT-1.md and docs/SPRINT-2.md for source changes and the Theme Editor verification steps.
