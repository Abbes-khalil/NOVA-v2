# NOVA implementation roadmap

Source: all six pages of CDC v1.1. No prior NOVA code existed in this workspace; the CDC's note about earlier sprint work is not evidence of completion here.

| Sprint | Deliverable | Status |
| --- | --- | --- |
| 0 | CLI, Git, Skeleton, development store, personal GitHub repository | Local setup installed; store and GitHub pending |
| 1 | Liquid foundations, JSON templates, sections, settings | Implemented; Theme Check passed; live Editor/visual verification pending |
| 2 | Announcement bar, header, footer, responsive navigation | Implemented locally; Theme Check passed; live Editor/browser verification pending |
| 3 | Homepage hero, collection cards, featured collection, shared product-card | Planned |
| 4 | Contextual collections, sorting, filters, pagination, empty state | Planned |
| 5 | Product gallery, real variant IDs, price, stock, quantity, add to cart | Planned |
| 6 | AJAX cart updates, removal, totals, empty state | Planned |
| 7 | Metafields and metaobjects | Planned |
| 8 | Search, empty states, optional predictive search and native accounts | Planned |
| 9 | Shopify checkout, test discounts and shipping | Planned |
| 10 | Theme Check, accessibility, SEO, performance, responsive and regression QA | Planned |
| 11 | Documentation, screenshots, video and honest portfolio case study | Planned |

## Acceptance rules

- Use contextual Shopify objects and configurable collection selections; avoid hardcoded catalogue handles.
- Reuse product-card on the homepage and collections.
- Use real variant IDs; update price, media and availability; unavailable variants cannot be purchased.
- Cart quantities and totals must reflect Shopify responses.
- Delegate payment and checkout to Shopify.
- Provide useful empty states for collection, search and cart.
- Keep content merchant-editable through schemas and provide translations.
- Verify keyboard navigation, visible focus, contrast, labels and responsive images.
- Measure LCP <=2.5s, INP <=200ms and CLS <=0.1 in a documented environment; these are targets, not achieved scores.
- Verify product-cart-checkout before calling the store complete.

## Planned Shopify Admin catalogue

USD: Oversized T-Shirt 49; Essential Hoodie 69 (compare-at 89); Relaxed Cargo Pants 79 (99); Zip Jacket 109; Ribbed Tank 39 (49); Everyday Cap 35.

Collections: New Arrivals, Sale, Accessories, Clothing and All Products. Each product needs coherent imagery, description, handle, type, price, status, availability, SKU and relevant variants. These records have not been seeded.
