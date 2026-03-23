# Roadmap

Internal planning document. Scope notes for every module not yet started.

**Lifecycle rule:** When a module's phase begins → create both `<name>.md` and `<name>.tech.md`, split this section's content into their respective Planned sections (business features → `<name>.md`, technical items → `<name>.tech.md`), then delete it from this file. When new scope is decided for a module that has no doc yet → add or update its section here.

---
---

## Upcoming Phases

Phases in build order. Each section moves out when that phase starts.

---

### Phase 3 — Inventory

- Every product variant tracks its own stock level per vendor
- Low stock triggers a restock alert via message broker
- Stock is reserved temporarily during checkout
- Platform company tracks stock across physical storage locations and shops

---

### Phase 4 — Customer Profiles

- Profile holds personal info: name, phone, date of birth
- Customers can save up to 5 addresses, one marked as default
- Profiles soft deleted with user account; data can be anonymized on request

---

### Phase 5 — Cart & Orders

- Guest users can cart but must log in to checkout
- Orders split into per-vendor sub-orders
- Statuses: `pending → confirmed → processing → shipped → delivered → closed`
- Cancellable at certain stages only (with reason)
- Price, address, tax, and discount code snapshotted at time of purchase
- Order status changes published as events via RabbitMQ

#### Discount Codes *(sub-feature of this phase)*

- Customers apply codes at checkout (percentage or fixed, usage-limited, expiry dated)
- Applied code and discount amount snapshotted on the order

---

### Phase 6 — Payments

- One or more payment attempts per order; failed payments allow retry
- Refunds tracked separately with reason and approver
- Vendor payouts calculated after successful payments, processed on a schedule

---

### Phase 7 — Shipping & Returns

- Each sub-order gets its own shipment with tracking number
- Statuses: `preparing → dispatched → in transit → delivered / returned`
- Returns generate a vendor-approved return request

---

### Phase 8 — Reviews

- Customers can review a product or vendor only after purchase
- Staff can flag reviews; flagged reviews hidden pending moderation

---

### Phase 9 — Notifications

- Customers: order confirmed, shipped, delivered, refund processed
- Vendors: new order, return request, low stock, payout processed
- Staff: new vendor registration, flagged review, dispute raised
- Real-time via WebSockets; events flow through RabbitMQ

---

### Phase 10 — Audit Logs

- Every sensitive data change logged: old value, new value, who, IP, when
- Staff activity on orders tracked throughout lifecycle
- Data anonymization on customer deletion request

---

### Phase 11 — Reporting

- Sales by product / category / vendor / date range
- Top customers, top vendors, most returned products
- Campaign performance, vendor payout history, failed payment trends

---
---

## Future Modules

Not yet assigned to a phase. Sequencing to be decided after Cart & Orders.

---

### Vendors

- Vendors register and manage their own store profile (name, logo, description, slug)
- Each vendor manages their own products, inventory, pricing, and campaigns
- Vendors receive real-time order notifications via WebSockets
- Vendor payouts processed automatically via scheduled cron and published to RabbitMQ
- The platform company has its own vendor account representing its direct sales

---

### Wishlists

- Customers can save products to a wishlist for later
- Feeds into product suggestions and marketing insights

---

### Campaigns & Promotions

- Vendors create campaigns with start/end dates and discount type (% or fixed)
- Original price untouched — campaign price resolved at query time
- Overlapping campaigns have defined priority; expiry handled via cron

---

### Search

- Unified search returns products, categories, brands, and vendors with `type` and `slug`
- Typo-tolerant and relevance-ranked
- SQL FTS implemented first; Meilisearch as the production layer

---

### Product Analytics

- Views, add-to-cart, and purchases recorded as timestamped events
- Aggregated counters per product for fast reads
- Feeds suggestions, trending lists, and campaign reporting

---

### Product Suggestions

- Based on current browsing category and user activity history
- "Users who bought this also bought" patterns from order history

---

### Multi-Currency

- Prices stored with currency code; exchange rate snapshotted on orders
- Reporting normalizes to base currency before aggregating
