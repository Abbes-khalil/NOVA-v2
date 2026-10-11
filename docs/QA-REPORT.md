# NOVA verification report

Date: October 11, 2026. Environment: Windows, Node.js v24.16.0, Shopify CLI 4.9.3. Scope: local Liquid/theme source and Node regression tests. No connected Shopify store or rendered browser session.

## Verified

| Check | Result |
| --- | --- |
| Shopify Theme Check | 64 files, zero offenses |
| Structural validation | 26 section/block schemas, 132 editor references, 13 JSON templates/groups, setting values/ranges, referenced files, one homepage H1 |
| JavaScript syntax | All storefront JavaScript parsed by node --check |
| Regression suite | 12 passing tests |
| Seed preview | Six CDC products, 22 size variants, prices and two optional metaobject definitions; offline, no API calls |
| Local asset budget | 49731 raw bytes / 13805 individually gzip-compressed bytes for all local CSS/JS |
| Default palette calculations | Body 16.01:1; accent 15.06:1; surface 13.98:1 (charcoal text against default backgrounds) |

Regression tests execute production JavaScript with DOM/network stubs. They cover localized add routes, authoritative rendered totals/header count, missing-section recovery, ambiguous failures without mutation replay, stock rejection, concurrent mutation blocking, line-key removal, stale variant/search responses, variant read fallback, predictive failure, selling-plan price synchronization and offline seed contents. They do not validate browser DOM parsing, focus behavior or Shopify endpoint integration.

Source review fixes include selected video/model IDs, stricter quantity stock caps, radio controls for single-option products, cart quantity minimum/increment checks, back-forward cache refresh, localized price validation, escaped metadata and form values, HTTPS social imagery, locale-independent OG numeric price and skip links on gift cards. Supporting content/password/blog/404 pages follow the shared layout and control styles. The existing Shopify CLA workflow remains unchanged; the personal repository may need its owner to configure its CLA_TOKEN if that workflow is used.

## Live verification still required

| Area | Status and required evidence |
| --- | --- |
| Theme Editor | Pending: logo, sections/blocks, collection picks, colors, metafields/metaobjects, translated content |
| Responsive/browser | Pending: Chrome/Firefox/Safari at 320, 390, 768, 990 and 1440px; overflow, gallery crop, dialog/menu behavior, console/network errors |
| Accessibility | Pending: actual keyboard/focus, screen reader, image alternatives, rendered contrast, zoom, form validation, axe/manual checks |
| Performance | Pending: LCP <=2.5s, INP <=200ms, CLS <=0.1 in a documented preview/production environment; image/font/third-party transfer cost |
| Product/cart/checkout | Pending: real inventory, variant IDs, discount allocation, quantity rejection, cart note, no-JS flows, shipping/taxes and test orders |
| Search/accounts/recommendations | Pending: real catalogue result types, account configuration, recommendation API |
| Seed Admin API | Pending: scopes, definitions, draft creation and catalogue publication on a development store |
| SEO deployment | Pending: rendered head, canonical domain, Shopify robots.txt/sitemap.xml, social preview and structured-data validation |
| Portfolio evidence | Pending: real storefront/Editor screenshots and 60–120 second walkthrough video |

Browser inventory returned no apps/browsers. The in-app browser was unavailable in this session. No viewports, screenshots, browser errors or Lighthouse/axe results are fabricated. Local gzip size is a source-cost indicator, not a measured page transfer or performance score. User-selected fonts/media, installed apps and changed colors require fresh validation.

## Release judgment

Source is ready for code review and development-store integration. Do not publish a claim of a completed or production-verified store until the live matrix passes. The demo is designed for the six CDC products, not high-variant products beyond Liquid's 250-variant list limit or combined listings. No live payment, tax or shipping behavior has been configured here.

## Reproduce

Run npm ci --ignore-scripts, then npm run verify and npm run seed:preview from the repository root. npm run package creates the Shopify upload ZIP; documentation/scripts/tests are excluded. Follow COMMERCE-SETUP.md for store preparation and HANDOFF.md for review order.
