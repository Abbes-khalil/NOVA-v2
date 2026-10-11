# Sprint 0 setup evidence

Date: October 11, 2026.

## Completed

- Read all six pages of NOVA_Cahier_des_Charges_Shopify_Upwork.pdf; extracted text is in CDC-extracted.txt.
- Verified Node.js v24.16.0 and Git 2.53.0.windows.2.
- Downloaded Shopify/skeleton-theme and selected Online Store 2.0 revision a4f32d393b9eadf6c4403318ca39116832e5d1df on feature/sprint-0.
- Installed project-local @shopify/cli 4.9.3 and generated package-lock.json, with dependency lifecycle scripts disabled.
- Verified CLI version 4.9.3.
- Ran npm run check from the real theme root: 41 files inspected, no offenses found.
- Added dev/check/package scripts, store config example, ignore rules, VS Code extension recommendation, README and roadmap.

## Tooling trust decision

@shopify/cli: preferred; Shopify-maintained official GitHub repository, MIT license, npm metadata links to Shopify/cli. Node requirement >=22.12.0 is satisfied. Published package scripts contained no preinstall/install/postinstall hooks. Install stance: project-local only, with --ignore-scripts.

Skeleton: preferred; official Shopify repository with MIT license and source history. Install stance: pinned official revision matching the CDC rather than October's incompatible architecture.

npm audit --omit=optional --audit-level=high completed with exit code 0. It reports four moderate findings in the CLI dependency chain (sprintf-js / roarr / global-agent / @shopify/cli). No high/critical findings were reported in that audit scope. The proposed force fix downgrades the CLI to 3.77.1; no forced downgrade was applied. These are developer tooling dependencies, not storefront scripts.

## Pending

- Supply or create a Shopify development store and authenticate using an account with theme permissions.
- Preview with npm run dev -- --store YOUR-STORE.myshopify.com.
- Configure demo products, collections, navigation and USD in Shopify Admin.
- Create a personal GitHub repository before pushing NOVA changes. The cloned origin remains Shopify's upstream repository.
- Begin Sprint 1 foundations, then build the storefront according to ROADMAP.md.

No live-store upload, Shopify preview, Theme Editor test, checkout test, deployment, storefront screenshot or performance measurement has been completed. No credentials were requested or stored.
