# Sprint 2: Global storefront and responsive navigation

## Implemented

Announcement bar, header, footer and responsive navigation are implemented locally on feature/sprint-2. Sprint 0 and 1 uncommitted work was preserved. No theme was uploaded or published.

The existing off-white, charcoal and lime palette and global typography remain the design contract. Header branding uses the merchant logo or shop name. Desktop navigation wraps; below 990px the menu becomes an inline native details disclosure. Dropdowns stay within the desktop navigation area. Footer content becomes two columns below 990px and one below 480px. No animation or dependencies were added.

- sections/announcement-bar.liquid: merchant-editable text and optional URL; empty text renders no banner. Added before the header in header-group.json. The default introduces the demo brand without unverified discounts or delivery promises.
- sections/header.liquid: configurable logo and Shopify menu, translated search/account/cart links, server-rendered cart count, and catalogue fallback when the menu is empty. Account link appears only when customer accounts are enabled and uses Shopify's native account route. The starter customer_account_menu setting is replaced by the native account link; an account popover is not part of this implementation.
- snippets/navigation-links.liquid: shared three-level navigation, native details submenus, parent destination links and current-page indicators. Parent links remain reachable alongside their child menus.
- assets/navigation.js: progressive enhancement for Escape dismissal and focus return, sibling dismissal, outside click, focus leaving navigation, breakpoint changes and Theme Editor section reconnection. Native details controls work without JavaScript. Menus are inline/disclosures rather than modal dialogs, so focus remains in normal document order.
- sections/footer.liquid: editable description and menu heading, three-level menu links, conditional real Shopify policies, optional payment icons and Powered by Shopify. Empty policies/payment lists render no empty headings or groups. Existing footer menu and payment setting IDs were retained.
- assets/storefront.css and layout/theme.liquid: scoped shared storefront styles; global skip link and main landmark remain intact.
- locales/: new storefront and Theme Editor translations.

The cart count reflects the page's Shopify cart object. AJAX count refresh belongs to Sprint 6. Newsletter signup, homepage merchandising and predictive search remain later work.

## Verification

- Shopify Theme Check via the installed CLI: 45 files inspected, no offenses found.
- node --check assets/navigation.js: passed.
- git diff --check: passed; normal Windows line-ending notices only.
- Structural check: 18 section/block schemas parsed; 72 schema translation references resolved; storefront section translation references resolved; announcement/header group order and section files resolved.
- Source review covered empty menus, optional logo, all menu levels, parent/current links, account visibility, policy/payment empty states, section reconnection and dropdown containment.

A local HTML fixture was prepared in ../checkpoints/sprint-2-qa/fixture.html, using the production header markup with sample Shopify data and the shared CSS/script. It is a fixture, not a Shopify-rendered preview. Browser inspection could not run: no browser surfaces were available and creating an in-app browser tab returned “Browser is not available: iab”. Playwright imports also failed in this runtime. No screenshot, rendered viewport check, browser interaction test, console/network check or accessibility compliance claim is recorded.

No development store is connected. Live Shopify rendering, Theme Editor setting changes and Shopify route behavior remain unverified.

## Live acceptance steps

From theme/, run npm run dev -- --store YOUR-STORE.myshopify.com and authenticate with theme access.

1. In Shopify Admin, create a main menu with New Arrivals, Clothing, Accessories and Sale using actual configured destinations; add children and grandchildren to Clothing. Select the main and footer menus in Theme Editor. The existing footer-group explicitly has an empty menu until selected.
2. Change announcement text and URL; clear the text, then disable/remove the section. Test that links work and no empty band remains.
3. Upload portrait and wide logo images, then clear the logo. Check its size and the shop-name fallback with a long store name.
4. Check 320, 390, 768, 990 and 1440px viewports with short and long menu labels. Confirm no horizontal overflow, clipped links, overlapping dropdowns or footer collisions.
5. Use Tab, Shift+Tab, Enter, Space and Escape on the menu and every submenu. Confirm disclosure state, focus return, parent destinations, sibling dismissal, outside click, focus leaving the header and resizing across 990px.
6. Disable JavaScript and verify mobile and nested menus still operate through native details controls.
7. Follow search and cart links. With accounts enabled and disabled, verify the account link's visibility and native Shopify destination. Verify cart counts of 0, 1 and many items after page navigation/reload.
8. Create and clear policies; enable/disable policy, payment and Shopify attribution settings. Ensure the footer displays only configured content and actual payment methods.
9. Reload/reorder the header section in Theme Editor and confirm menus still work without duplicate listeners. Check current-page indicators and the skip link.
10. Inspect rendered contrast, keyboard focus, console/network errors and image loading before accepting the sprint as verified on a store.

## Rollback

Pre-edit copies of every existing file modified in Sprint 2 are in ../checkpoints/sprint-2-before/ with their theme-relative paths. Copy those individual files back only when rollback is requested. New Sprint 2 source files: sections/announcement-bar.liquid, snippets/navigation-links.liquid, assets/navigation.js, assets/storefront.css and docs/SPRINT-2.md. The fixture is outside the theme. Switching branches alone does not undo uncommitted changes; do not reset the earlier Sprint 0/1 work.

Reference: Shopify navigation documentation (https://shopify.dev/docs/storefronts/themes/navigation-search/navigation) and Liquid routes (https://shopify.dev/docs/api/liquid/objects/routes).
