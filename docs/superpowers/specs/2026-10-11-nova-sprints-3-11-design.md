# NOVA Theme - Sprints 3-11 Implementation Design

**Date**: 2026-10-11  
**Status**: Approved for implementation  
**Branch**: main (will create feature branches per sprint)

---

## Overview

Implement sprints 3-11 sequentially to complete the NOVA streetwear demo storefront. Each sprint builds on the previous, using existing NOVA patterns: custom-section foundation, theme blocks, snippets, CSS variables, native `<details>` for progressive disclosure, and Shopify's native APIs.

**Current state**: Sprints 0-2 complete (foundations, global storefront, responsive navigation). Theme Check passes.

---

## Sprint 3: Homepage Merchandising

### Scope
- Hero section (full-width background, headline, CTA)
- Collection cards section (grid of collection links)
- Featured collection section (collection picker + product grid)
- Reusable product-card snippet
- Updated homepage composition

### Components

| Component | Type | Location |
|-----------|------|----------|
| `hero.liquid` | Section | `sections/hero.liquid` |
| `collection-cards.liquid` | Section | `sections/collection-cards.liquid` |
| `product-card.liquid` | Snippet | `snippets/product-card.liquid` |
| `custom-section.liquid` | Section (extend) | Add `collection` setting + product grid |
| `index.json` | Template (update) | New section order |

### Hero Section Schema
```json
{
  "name": "t:general.hero",
  "settings": [
    { "type": "image_picker", "id": "background_image", "label": "t:labels.background" },
    { "type": "text", "id": "eyebrow", "label": "t:labels.eyebrow" },
    { "type": "text", "id": "heading", "label": "t:labels.heading", "default": "t:defaults.hero_heading" },
    { "type": "richtext", "id": "subtext", "label": "t:labels.subtext" },
    { "type": "text", "id": "cta_label", "label": "t:labels.cta_label", "default": "t:defaults.cta_label" },
    { "type": "url", "id": "cta_link", "label": "t:labels.cta_link" },
    { "type": "select", "id": "color_style", "label": "t:labels.color_style", "options": ["standard", "inverse"], "default": "standard" },
    { "type": "select", "id": "content_align", "label": "t:labels.content_align", "options": ["left", "center", "right"], "default": "left" }
  ],
  "blocks": [{ "type": "@theme" }]
}
```

### Collection Cards Section Schema
```json
{
  "name": "t:general.collection_cards",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "t:labels.eyebrow" },
    { "type": "text", "id": "heading", "label": "t:labels.heading", "default": "t:defaults.collections_heading" },
    { "type": "richtext", "id": "description", "label": "t:labels.description" }
  ],
  "blocks": [
    { "type": "collection_card", "name": "t:general.collection_card", "settings": [
      { "type": "collection", "id": "collection", "label": "t:labels.collection" },
      { "type": "image_picker", "id": "image", "label": "t:labels.image" },
      { "type": "text", "id": "title_override", "label": "t:labels.title_override" }
    ]}
  ]
}
```

### Product Card Snippet
Renders: image (responsive), title, price + compare-at, variant badge (sale), quick-add button (AJAX in Sprint 6). Accepts `product` object and `settings` for style variants.

### Homepage Composition (index.json)
1. Announcement bar (header-group)
2. Header (header-group)
3. Hero section
4. Collection cards section (3-4 blocks)
5. Featured collection section (custom-section with collection picker)
6. NOVA content section (existing)
7. Footer (footer-group)

---

## Sprint 4: Collections Pages

### Scope
- Enhanced collection template with sorting, filtering, pagination, empty state
- Product grid using product-card snippet
- Filter sidebar (mobile drawer, desktop inline)

### Collection Section Enhancements (collection.liquid)
- Collection header: image, title, description
- Sort dropdown: Featured, Best selling, Title A-Z/Z-A, Price low-high/high-low, Date new-old/old-new
- Filter form: Availability (in stock), Price range (slider), Product type, Vendor
- Product grid: 4-col desktop, 2-col tablet, 1-col mobile using product-card snippet
- Pagination: Shopify paginate + custom styled links
- Empty state: Illustration + message + "Shop all" link

### Filter Implementation
- Use Shopify's `filter` object and `filter_values` (Online Store 2.0)
- URL parameters for filter state persistence
- JavaScript for mobile drawer toggle, price range slider
- No-JS fallback: form submits to same URL with filter params

### Schema Additions
```json
{
  "settings": [
    { "type": "select", "id": "default_sort", "label": "t:labels.default_sort", "options": [...], "default": "featured" },
    { "type": "checkbox", "id": "show_filters", "label": "t:labels.show_filters", "default": true },
    { "type": "range", "id": "products_per_page", "label": "t:labels.products_per_page", "min": 12, "max": 48, "step": 12, "default": 20 }
  ]
}
```

---

## Sprint 5: Product Page

### Scope
- Complete product page: gallery, variant picker, quantity, add-to-cart, dynamic updates

### Product Section Enhancements (product.liquid)
- **Media gallery**: Main image + thumbnail strip (mobile: swipe, desktop: hover), video/3D model support
- **Variant picker**: Radio groups for single-option products, dropdown for multi-option; disabled/unavailable variants visually distinct
- **Price display**: Current price + compare-at (strikethrough) + savings badge
- **Quantity selector**: Input with +/- buttons, min 1, max variant.inventory_quantity
- **Add to cart**: Primary button, disabled when variant unavailable, shows loading state
- **Dynamic updates**: JS updates price, media, availability, button state on variant change
- **Product info tabs**: Description, Shipping, Returns, Size Guide (metafield-driven in Sprint 7)

### JavaScript (product.js)
- Variant selection → update URL, price, media, availability, add-to-cart button
- Uses `product.selected_or_first_available_variant` and `variant.id`
- No-JS fallback: form submits to `/cart/add`

### Schema Additions
```json
{
  "settings": [
    { "type": "checkbox", "id": "show_quantity", "label": "t:labels.show_quantity", "default": true },
    { "type": "checkbox", "id": "show_share", "label": "t:labels.show_share", "default": false },
    { "type": "select", "id": "gallery_layout", "label": "t:labels.gallery_layout", "options": ["thumbnails", "stacked"], "default": "thumbnails" }
  ]
}
```

---

## Sprint 6: AJAX Cart

### Scope
- Cart drawer (slide-in) + full cart page
- AJAX add/update/remove
- Header cart count refresh
- Empty state

### Cart Section Enhancements (cart.liquid)
- **Drawer**: `<details class="nova-cart-drawer">` with `<summary>` in header, side panel on desktop, full-screen on mobile
- **Line items**: product-card snippet variant + quantity input (AJAX update), remove button, line total
- **Subtotal**: Dynamic update
- **Checkout button**: Primary, links to `routes.checkout_url`
- **Empty state**: Illustration + "Continue shopping" link
- **Note**: Cart note field

### JavaScript (cart.js)
- `Cart` class with methods: `add(variantId, quantity)`, `update(line, quantity)`, `remove(line)`, `get()`
- Uses fetch to `/cart/add.js`, `/cart/update.js`, `/cart/change.js`, `/cart.js`
- Event dispatch: `cart:updated` for header count, drawer refresh
- Progressive enhancement: form works without JS (page reload)

### Header Integration
- Update `navigation.js` or new `cart-drawer.js` for drawer toggle
- Cart count: fetch `/cart.js` → update `.nova-header__count` after AJAX operations

---

## Sprint 7: Metafields & Metaobjects

### Scope
- Product metafields for enriched content
- Collection metaobjects for lookbooks/campaigns
- Theme blocks referencing metaobjects

### Metafield Definitions (create via Shopify Admin or script)
| Namespace | Key | Type | Description |
|-----------|-----|------|-------------|
| `nova` | `care_instructions` | multi_line_text_field | Care/wash instructions |
| `nova` | `materials` | multi_line_text_field | Materials composition |
| `nova` | `size_guide` | json | Size chart data |
| `nova` | `sustainability` | rich_text_field | Sustainability info |

### Metaobject Definitions
| Type | Fields |
|------|--------|
| `lookbook` | title, description, image, collection_reference, products (list) |
| `campaign` | title, description, background_image, cta_text, cta_link, start_date, end_date |

### Theme Blocks
- `product-tabs.liquid`: Renders tabs from metafields (Description, Care, Shipping, Size Guide)
- `lookbook.liquid`: Renders metaobject lookbook grid
- `campaign-banner.liquid`: Hero-style banner from campaign metaobject

---

## Sprint 8: Search & Experience

### Scope
- Predictive search (AJAX)
- Enhanced search results
- Keyboard navigation audit
- Native customer accounts

### Search Enhancements
- **Predictive search**: Debounced fetch to `/search/suggest?q=...` → render dropdown with products/collections/articles/pages
- **Search results**: Use product-card snippet for products, article cards for articles
- **Empty state**: Helpful suggestions, popular searches, "Shop all" link
- **URL params**: `q`, `type`, `options[prefix]`

### Accessibility Audit
- All interactive elements: focus-visible, ARIA labels, keyboard operable
- Skip links on all templates
- Color contrast: 4.5:1 normal, 3:1 large text
- Form labels, error messages, live regions for cart updates

---

## Sprint 9: Checkout & Commerce

### Scope
- Configuration and testing only (no custom code)

### Shopify Admin Configuration
- **Discounts**: Automatic (volume, buy X get Y) + code-based
- **Shipping**: Rates by weight/price, free shipping threshold, local pickup
- **Taxes**: Configure for test market
- **Payments**: Shopify Payments test mode, accelerated checkouts
- **Test orders**: Bogus gateway + real test transactions

---

## Sprint 10: QA

### Checklist
| Area | Criteria |
|------|----------|
| Theme Check | Zero offenses |
| Accessibility | WCAG 2.2 AA: contrast, focus, keyboard, labels, alt |
| Performance | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (dev store measurement) |
| Responsive | 320, 390, 768, 990, 1440px - no overflow, usable |
| Regression | product → variant → cart → checkout flow |
| Browser | Chrome, Firefox, Safari (latest) |

### Tools
- `npm run check` (Theme Check)
- Lighthouse CI (performance)
- axe-core (accessibility)
- Manual keyboard testing

---

## Sprint 11: Documentation & Portfolio

### Deliverables
1. **README.md**: Architecture overview, component library, setup, deployment, customization guide
2. **Screenshots**: Desktop + mobile for Homepage, Collection, Product, Cart, Search
3. **Video**: 60-120s walkthrough (collection → filter → product → variant → cart → checkout)
4. **Theme Editor screenshots**: Section customization demo
5. **Case study**: Problem → Solution → Results (for Upwork portfolio)
6. **QA report**: Test results, known limitations, performance metrics

---

## Seed Scripts

### Product Data (from CDC)
| Product | Price | Compare-at | Variants |
|---------|-------|------------|----------|
| Oversized T-Shirt | $49 | — | S, M, L, XL |
| Essential Hoodie | $69 | $89 | S, M, L, XL |
| Relaxed Cargo Pants | $79 | $99 | 28, 30, 32, 34, 36 |
| Zip Jacket | $109 | — | S, M, L, XL |
| Ribbed Tank | $39 | $49 | S, M, L, XL |
| Everyday Cap | $35 | — | One Size |

### Collections
- New Arrivals (automatic: tag "new-arrivals")
- Sale (automatic: compare-at > price)
- Accessories (manual: Cap)
- Clothing (manual: T-Shirt, Hoodie, Pants, Jacket, Tank)
- All Products (automatic: all)

### Script: `scripts/seed-products.js`
- Uses `@shopify/admin-api-client` (GraphQL)
- Creates products, variants, media (placeholder images), metafields
- Creates collections (manual + automatic)
- Idempotent: upserts by handle

---

## Technical Conventions

### File Naming
- Sections: `kebab-case.liquid` (hero, collection-cards)
- Snippets: `kebab-case.liquid` (product-card, image)
- Blocks: `kebab-case.liquid` (collection-card, product-tabs)
- JS: `kebab-case.js` (product, cart, navigation)
- CSS: Inline `{% stylesheet %}` in sections, shared in `critical.css`/`storefront.css`

### CSS Variables (from config/settings_schema.json)
```css
--color-background: #F5F3EE;
--color-foreground: #181818;
--color-surface: #E7E4DD;
--color-accent: #C7FF42;
--color-accent-foreground: #181818;
--font-primary--family: 'Work Sans', sans-serif;
--style-border-radius-buttons: 0px;
--style-border-radius-inputs: 0px;
--page-width: 90rem;
--page-margin: 20px;
--section-spacing: 64px;
```

### JavaScript Patterns
- ES modules where possible, IIFE for inline scripts
- Custom elements for complex components (`<nova-navigation>`, `<nova-cart-drawer>`)
- Event-driven: `dispatchEvent(new CustomEvent('cart:updated', { detail: cart }))`
- Progressive enhancement: native HTML works without JS

### Accessibility
- All interactive: `:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }`
- Skip link on every page
- ARIA labels on icon-only buttons
- `aria-live="polite"` for cart count, form errors
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`

---

## Git Workflow

```
main (protected)
  ├── feature/sprint-3-homepage
  ├── feature/sprint-4-collections
  ├── feature/sprint-5-product
  ├── feature/sprint-6-cart
  ├── feature/sprint-7-metafields
  ├── feature/sprint-8-search
  ├── feature/sprint-9-checkout
  ├── feature/sprint-10-qa
  └── feature/sprint-11-docs
```

Each sprint: branch → implement → `npm run check` → test in dev store → PR → review → merge to main.

---

## Dependencies

| Sprint | Depends On |
|--------|------------|
| 3 | Sprints 0-2 (complete) |
| 4 | Sprint 3 (product-card snippet) |
| 5 | Sprint 3 (product-card), Sprint 6 (add-to-cart) |
| 6 | Sprint 5 (variant IDs), Sprint 3 (header cart count) |
| 7 | Sprint 5 (product tabs) |
| 8 | Sprint 4 (search results), Sprint 6 (cart) |
| 9 | Sprint 6 (cart→checkout) |
| 10 | All previous |
| 11 | Sprint 10 (QA complete) |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Shopify API changes | Pin CLI version, test on dev store each sprint |
| Performance regression | Measure LCP/INP/CLS each sprint, optimize images |
| Theme Editor UX | Test schema changes in editor every sprint |
| Scope creep | Strict sprint boundaries, defer nice-to-haves to backlog |

---

## Approval

- [x] Design presented and approved
- [x] Spec self-review complete
- [ ] User review complete
- [ ] Implementation plan created (next step: writing-plans skill)