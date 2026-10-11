# NOVA handoff

Version 0.2.0, October 11, 2026. Review branch: feature/sprints-3-11 in Abbes-khalil/NOVA-v2. Main remains available for review before merging.

## Review order

1. Read QA-REPORT.md for source evidence and remaining live checks.
2. Inspect homepage, collection, product and cart sections, shared snippets and assets/product.js, assets/cart.js and assets/search.js.
3. Run npm ci --ignore-scripts and npm run verify. Run npm run seed:preview to inspect the six-product demo without API calls.
4. Connect a development store using npm run dev -- --store YOUR-STORE.myshopify.com.
5. Follow COMMERCE-SETUP.md and DATA-MODEL.md. Select collections, upload real demo media and configure navigation/content in the Theme Editor.
6. Complete the live QA matrix, collect the walkthrough evidence, then review the pull request for merge.

## Delivered behavior

The homepage uses configurable collections and shared product cards. Collections use Shopify filters, sorting and pagination. Product forms use real variant IDs, stock limits, media selection and selling plans. Cart mutations are serialized and totals come from Shopify-rendered sections; ambiguous failures trigger read recovery without replaying a purchase mutation. Native forms and links provide progressive fallbacks. Metafield details, scheduled metaobject content, optional newsletter signup, search and recommendations extend the storefront.

The test suite covers failure recovery and stale requests with DOM/network stubs. The source checks report 64 files with zero Theme Check offenses and 12 passing tests. Browser rendering, focus, performance and checkout still require the connected store.

## Package and CI

npm run package creates NOVA-0.2.0.zip for Shopify upload. Scripts, tests, documentation and dependencies are excluded. CI installs the pinned lockfile and runs npm run verify. The inherited CLA workflow is unchanged and may require owner configuration of CLA_TOKEN.

## Rollback

Local commit 15a3dcd is the clean pre-Sprint-3 baseline. Sprint commits provide smaller review points. Use Git revert on selected commits or open the baseline in a separate checkout; preserve uncommitted work before any rollback. Keep the prior Shopify theme as an unpublished duplicate before uploading this ZIP. Switch themes through Shopify Admin only after confirming which store/theme is affected.

## Remaining external work

No Shopify credentials, store or browser surface were connected during implementation. Seed application, catalogue publication, real stock/images, test shipping/taxes/discounts/payment, test orders, responsive/accessibility/performance checks and screenshots/video are pending. No live payment or production theme was changed.
