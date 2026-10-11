# Merchant data model

Create product metafield definitions in Shopify Admin, namespace nova:

| Key | Shopify type | Use |
| --- | --- | --- |
| care_instructions | multi_line_text_field | Care disclosure |
| materials | multi_line_text_field | Materials disclosure |
| size_guide | json | Accessible size table |
| sustainability | rich_text_field | Merchant-supplied product information |

Size-guide value example (units belong in the headers):

```json
{"headers":["Size","Chest (cm)","Length (cm)"],"rows":[["S","104","68"],["M","110","70"],["L","116","72"]]}
```

Metaobject types must be visible to the storefront (published entries / storefront access enabled):

| Type | Fields |
| --- | --- |
| lookbook | title: single_line_text_field; description: rich_text_field; image: file_reference (images); collection_reference: collection_reference; products: list.product_reference |
| campaign | title: single_line_text_field; description: rich_text_field; background_image: file_reference (images); cta_text: single_line_text_field; cta_link: url; start_date: date; end_date: date |

Add Lookbook/Campaign banner blocks to a NOVA content section and select an entry. Product details from metafields is installed by default on the product template. Empty fields are hidden. Campaign dates are inclusive UTC calendar boundaries evaluated during Shopify rendering; cache propagation can delay a precise transition. The development data script creates product definitions without unverified content; metaobject definitions can be provisioned with its --definitions flag. Entry imagery and publication remain merchant work.

No unsupported sustainability claims are seeded. Newsletter is an optional native Shopify customer form in the footer, with a required explicit opt-in; enable it in Theme Editor only when merchant messaging is configured.
