# Sprint 6: AJAX cart

Implemented progressive product/quick add, cart quantity/update/removal, order notes, discounts, Shopify-rendered line totals and subtotal, header count refresh and a native modal dialog drawer. Without JavaScript, normal product/cart forms and removal links remain functional. Checkout is the native cart POST with name=checkout; no invented checkout route is used.

Mutations are serialized with controls disabled while pending. Line-item keys are used instead of positional indices. Bundled section markup drives every displayed total. Missing sections trigger a read-only refresh. Ambiguous failures never replay add/update mutations; the cart can be rechecked through the native route. Drawer provides native focus containment, Escape and return focus.

Validation: Theme Check, 56 files, zero offenses. Live Cart API failure paths and checkout require store access.
