# Sprint 1: Liquid, templates, sections and settings

## Scope and design contract

NOVA is a personal streetwear demo for shoppers and merchants. The complete page map remains the existing home, collection, product, cart, search, content, blog, article, password and 404 templates. Sprint 1 establishes composition and global styling; later sprints provide global navigation, homepage merchandising and commerce behavior.

Direction: warm off-white background (#F5F3EE), charcoal text (#181818), neutral form surfaces (#E7E4DD), lime action color (#C7FF42) with charcoal labels. Existing Work Sans font picker remains the source for typography. Squared controls, restrained spacing and large left-aligned headings support the streetwear direction. No animation or new dependencies.

Homepage composition: existing header group, NOVA content section (eyebrow, one H1, description, button theme block), existing footer group. Background imagery is optional and unset; no fake product images or catalogue claims are introduced. First-section imagery is eager-loaded, later content is lazy-loaded. Responsive heading sizes, capped mobile margins and section spacing prevent the desktop settings from dominating small screens.

## Implemented

- config/settings_schema.json: NOVA metadata, palette, surface/accent settings, section spacing, button corners; existing setting IDs preserved.
- snippets/css-variables.liquid: global CSS tokens derived from merchant settings.
- assets/critical.css: typography, button styles, form surfaces, keyboard focus and skip link.
- layout/theme.liquid and layout/password.liquid: one main landmark and translated skip link.
- sections/custom-section.liquid: existing Skeleton section extended with editable eyebrow, heading level, rich text, standard/inverse palette and theme-block composition.
- blocks/button.liquid and snippets/button.liquid: reusable navigation link. A selected link wins; optional catalogue fallback uses routes.all_products_collection_url. Missing destination or label produces no link.
- templates/index.json: replaces the starter hello-world composition with NOVA content and a catalogue action, without hardcoded merchant product or collection handles.
- blocks/text.liquid: escape plain-text merchant content.
- locales/: storefront accessibility text and editor schema labels/defaults. Removed an existing trailing comma in the editor locale JSON.

## Verification

npm run check: 43 files inspected, no offenses found.

git diff --check: passed (Git emitted normal Windows line-ending notices).

Additional structural validation passed: 17 section/block schemas, 11 JSON templates, 11 global settings, all schema translation references, template-to-section and block-to-setting references, one configured homepage H1, and main/skip-link markup in both layouts.

These checks validate source structure. No connected development store is available, so rendered desktop/mobile appearance, Shopify Theme Editor setting changes, navigation and Shopify route behavior remain unverified in the storefront.

## Shopify preview and acceptance steps

From theme/, run npm run dev -- --store YOUR-STORE.myshopify.com and authenticate.

In Theme Editor:

1. Change theme colors, font, page margin, section spacing and corner settings; confirm the corresponding content updates.
2. Edit NOVA content's eyebrow, heading and description; toggle the inverse palette.
3. Keep the homepage primary heading as H1; use H2 for additional sections.
4. Add/reorder/remove Text, Group and Button blocks. Test a selected button URL, the all-products fallback, and an empty label/destination.
5. If you add background imagery, inspect desktop/mobile crop and text readability.
6. Check desktop and mobile widths, keyboard focus and the skip link on storefront and password page.

The existing header/footer remain Skeleton components for Sprint 2. Product, collection, cart and search implementations remain starter functionality; they are not claimed as complete NOVA features.

## Rollback

Working branch: feature/sprint-1. Pre-edit copies of the principal foundations are in ../checkpoints/sprint-1-before/. Additional tracked starter files remain recoverable from the pinned Skeleton Git revision. New Sprint 1 source files are blocks/button.liquid and snippets/button.liquid. Preserve the earlier uncommitted Sprint 0 setup when reverting.
