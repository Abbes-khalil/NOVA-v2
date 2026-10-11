# Sprint 5: Product purchase

Implemented media gallery (images, native video/external video/model rendering), real variant selector, quantity rules, stock state, compare-at pricing, purchase forms, optional accelerated checkout and editable shipping/returns content. Variant changes request a Shopify-rendered section so prices, inventory, selling plans and media follow server data. Rapid reads cancel and discard stale responses. Failed reads fall back to the variant page URL. Native form submission and a no-JavaScript variant reload form remain available. Demo catalogue supports the Liquid variant list (up to 250 variants); high-variant option-value traversal is not claimed.

Validation: Theme Check, 53 files, zero offenses. Live variants, media and purchase routes require store verification.
