# NOVA — Shopify streetwear demo

NOVA is a personal portfolio project built from the CDC v1.1 brief, not a commissioned store. The aim was to make a streetwear catalogue editable by a merchant while keeping purchase behavior grounded in Shopify data.

## Approach

The storefront builds on Shopify Skeleton with Liquid, Online Store 2.0 JSON templates and editor schemas. Reusable product cards connect homepage merchandising, collections and search. Product pages render real variants and update their price, media, availability and selling-plan selection. The cart uses Shopify section responses for totals and handles uncertain network outcomes through read recovery rather than replaying mutations.

Metafields provide product details and size guides; metaobjects provide reusable lookbook and campaign content. Native navigation and forms establish the baseline, with JavaScript adding the cart drawer, predictive search and variant interactions.

## Evidence

Local verification passed 12 regression tests and Theme Check on 64 files with zero offenses. Structural checks validate editor references, templates and JavaScript syntax. Local CSS/JS totals 49,731 raw bytes and 13,805 individually gzip-compressed bytes. These figures describe source cost, not a Lighthouse score or measured page speed.

## Limitations and next evidence

The source is ready for review and development-store integration. Real store setup, browser QA, accessibility testing, checkout orders and performance measurement are pending. No conversion improvement, revenue, client endorsement or production readiness is claimed. Add real storefront and Theme Editor screenshots and the recorded walkthrough only after performing the live checks in QA-REPORT.md.
