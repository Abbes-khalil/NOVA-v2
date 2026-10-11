# NOVA Shopify theme

A merchant-editable streetwear demo built on Shopify Skeleton. Version 0.2.0 implements the source work for Sprints 1–11: homepage merchandising, filtered collections, variant-aware product pages, AJAX cart, custom content, search and recommendations.

Source validation passes. Development-store setup, rendered browser QA, test orders and portfolio screenshots/video remain pending; see [verification report](docs/QA-REPORT.md).

## Develop and verify

Use Node.js 24 and run from this repository's theme directory:

~~~powershell
npm ci --ignore-scripts
npm run verify
npm run seed:preview
npm run dev -- --store YOUR-STORE.myshopify.com
npm run package
~~~

Shopify authentication is interactive. Use a development store with theme access. Optional local configuration: copy shopify.theme.toml.example to shopify.theme.toml and fill in the store address. Credentials and local configuration are ignored by Git. No frontend build step is required.

The seed preview is offline. The explicit apply command creates missing demo products as drafts and preserves existing records; read [commerce setup](docs/COMMERCE-SETUP.md) before supplying Admin API credentials.

## Review and customize

- [Handoff and rollback](docs/HANDOFF.md)
- [Roadmap](docs/ROADMAP.md) and [verification evidence](docs/QA-REPORT.md)
- [Metafields/metaobjects](docs/DATA-MODEL.md)
- [Portfolio case study](docs/CASE-STUDY.md) and [walkthrough plan](docs/DEMO-WALKTHROUGH.md)

Sections and blocks expose content in the Theme Editor. Select homepage collections, upload imagery, configure navigation/logo and review product shipping/returns copy. Newsletter signup is optional. Catalogue data, inventory, payment, taxes and shipping belong to Shopify Admin.

## Structure

| Directory | Purpose |
| --- | --- |
| assets | Shared styles and progressive storefront scripts |
| sections / blocks | Editor-configurable page regions and content |
| snippets | Shared cards, purchase forms, filters and cart content |
| templates / layout | Online Store 2.0 pages and document wrappers |
| config / locales | Theme settings and translations |
| scripts / tests | Offline setup, structural checks and regression tests |
| docs | Sprint evidence, setup, QA and handoff |

## Repository and source

Review repository: [Abbes-khalil/NOVA-v2](https://github.com/Abbes-khalil/NOVA-v2), branch feature/sprints-3-11. Sprint milestones are retained in commit history; main is reserved for review and merge.

Based on [Shopify Skeleton](https://github.com/Shopify/skeleton-theme), pinned revision a4f32d393b9eadf6c4403318ca39116832e5d1df. The original source history and MIT license are retained; see [upstream README](docs/SKELETON-UPSTREAM.md). Shopify CLI is pinned to 4.9.3 in the lockfile. NOVA is a personal demo, not a client engagement or a measured commercial result.
