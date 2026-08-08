# Roadmap

Internal planning document. Scope notes for every module not yet started.

**Lifecycle rule:** When a module's phase begins → create both `<name>.md` and `<name>.tech.md`, split this section's content into their respective Planned sections (business features → `<name>.md`, technical items → `<name>.tech.md`), then delete it from this file. When new scope is decided for a module that has no doc yet → add or update its section here.

---
---

## Upcoming Phases

Phases in build order. Each section moves out when that phase starts.

---

### Phase 3 — Inventory

**Scope:** Track stock levels per product variant per vendor. Support reservations during checkout and restock alerts when levels drop below a threshold.

**Business rules:**
- Every product variant has its own stock level, tracked per vendor
- Stock is reserved temporarily when a customer begins checkout *(⚠ contradicts Phase 5 which says cart-add — resolve before starting this phase)* — not confirmed until payment succeeds
- Reservations expire after a timeout if checkout is abandoned; stock is released back
- When stock drops below a configurable threshold, a restock alert event is published via RabbitMQ
- The platform company tracks stock across physical storage locations and shops

**Technical constraints:**
- Reservation must be atomic — race conditions on stock updates must be handled (row-level locking or retry logic)
- Stock changes are append-only events (debit/credit) — current level is derived, not stored directly, or cached via a running total column
- Low-stock threshold is per-variant, not global

---

### Phase 4 — Customer Profiles

**Scope:** Extend user accounts with personal profile data and saved addresses. Profiles are tied to user accounts and soft-deleted with them.

**Business rules:**
- Profile holds: first name, last name, phone number, date of birth
- Customers can save up to 5 addresses; one is marked as default
- Address fields: label (e.g. "Home"), full address lines, city, postcode, country
- Profiles are soft-deleted when the user account is deleted
- Customer data can be anonymized on request (GDPR-style) — PII fields nulled out while keeping order history intact

**Technical constraints:**
- Profile is 1:1 with user — created lazily on first update, not at registration
- Address limit (5) enforced in service logic, not DB constraint
- Anonymization is a separate operation from deletion — must be explicitly requested

---

### Phase 5 — Cart & Orders

**Scope:** Guest and authenticated carts, checkout flow with per-vendor sub-orders, full order lifecycle with cancellation rules.

**Business rules:**
- Guest users can add to cart but must log in to checkout
- Cart persists server-side — tied to session token for guests, user ID for authenticated users
- On checkout, a single Order is created and split into per-vendor sub-orders automatically
- Sub-order statuses: `pending → confirmed → processing → shipped → delivered → closed`
- Cancellable only at `pending` or `confirmed` stages — cancellation requires a reason
- Price, shipping address, applied discount, and tax are snapshotted at the time of purchase — never recalculated after
- Order status transitions are published as events via RabbitMQ

**Discount Codes** *(sub-feature of this phase):*
- Customers apply a discount code at checkout (percentage or fixed amount)
- Codes are usage-limited (total uses cap) and/or expiry-dated
- Applied code and the resulting discount amount are snapshotted on the order
- A single code is applied per order — no stacking

**Technical constraints:**
- Cart-to-order transition must be atomic — all sub-orders created or none
- Stock reservation happens at cart-add, not checkout (see Phase 3)
- Sub-order splitting logic lives in the Orders service, not the Cart service
- Price snapshot must copy current price at moment of checkout, ignoring any later changes

---

### Phase 6 — Payments

**Scope:** Track payment attempts per order. Support refunds with approval flow. Calculate and process vendor payouts on a schedule.

**Business rules:**
- One or more payment attempts are allowed per order — failed payments allow the customer to retry
- Only one payment attempt can succeed per order
- Refunds are tracked separately: linked to the original payment, require a reason, and have an approver
- Vendor payouts are calculated as a percentage of completed order revenue, processed on a scheduled interval
- Payout events are published to RabbitMQ for downstream processing

**Technical constraints:**
- Payment status: `pending → succeeded | failed`
- Refund status: `requested → approved → processed | rejected`
- Payout calculation must account for refunds — refunded amounts are excluded from payout
- Payout schedule runs via cron — frequency configurable

---

### Phase 7 — Shipping & Returns

**Scope:** Shipment tracking per sub-order. Return request flow with vendor approval.

**Business rules:**
- Each sub-order has its own shipment record with a tracking number and carrier
- Shipment statuses: `preparing → dispatched → in-transit → delivered | returned`
- A customer can raise a return request after delivery — linked to the sub-order
- Return requests require vendor approval; approved returns trigger a refund request (Phase 6)
- Return reason is required

**Technical constraints:**
- Shipment is 1:1 with sub-order
- Return request status: `requested → approved | rejected`
- Return approval publishes an event to RabbitMQ for refund processing

---

### Phase 8 — Reviews

**Scope:** Purchase-gated product and vendor reviews. Staff moderation for flagged content.

**Business rules:**
- A customer can review a product only if they have a completed, non-refunded order containing that product
- A customer can review a vendor only if they have a completed order from that vendor
- One review per customer per product; one review per customer per vendor
- Reviews have a rating (1–5) and optional text
- Staff can flag a review; flagged reviews are hidden from the storefront pending moderation
- Moderation decision: approve (unhide) or remove (soft-delete)

**Technical constraints:**
- Purchase verification query joins orders → sub-orders → order items
- Flagging does not delete the review — sets a `is_flagged` column
- Moderation action sets `is_flagged = 0` (approve) or `is_deleted = 1` (remove)

---

### Phase 9 — Notifications

**Scope:** Event-driven notifications to customers, vendors, and staff via WebSockets. All events flow through RabbitMQ.

**Business rules:**
- **Customers:** order confirmed, order shipped, order delivered, refund processed
- **Vendors:** new order received, return request raised, low stock alert, payout processed
- **Staff:** new vendor registration pending, review flagged, dispute raised
- Notifications are delivered in real-time via WebSockets where the recipient is connected
- Undelivered notifications are persisted and shown on next login

**Technical constraints:**
- WebSocket gateway subscribes to RabbitMQ topics and pushes to connected clients
- Notification persistence table: `notifications(id, user_id, type, payload, is_read, created_at)`
- Each event type maps to exactly one RabbitMQ routing key
- WebSocket connections are user-scoped — authenticated via JWT on handshake

---

### Phase 10 — Audit Logs

**Scope:** Immutable log of sensitive data changes and staff actions throughout the order lifecycle.

**Business rules:**
- Every change to sensitive data is logged: old value, new value, who made it, their IP address, and when
- Staff actions on orders are tracked at every status transition
- Data anonymization requests (Phase 4) are themselves logged
- Audit logs are never soft-deleted — they are read-only once written

**Technical constraints:**
- `audit_logs(id, entity_type, entity_id, action, old_value JSON, new_value JSON, actor_id, ip, created_at)`
- Writes happen in the same transaction as the data change — log and change are atomic
- No update or delete operations on `audit_logs` ever — append only

---

### Phase 11 — Reporting

**Scope:** Aggregated business intelligence queries for staff and vendors.

**Business rules:**
- Sales reports: revenue by product / category / vendor / date range
- Customer reports: top customers by spend, churn indicators
- Vendor reports: top vendors, most returned products, payout history
- Campaign reports: redemption rate, revenue impact per discount code
- Failed payment trends: frequency, reasons, retry success rate

**Technical constraints:**
- Reports are read-only queries — no writes
- All date-range queries must be index-friendly (created_at indexed on orders, payments, etc.)
- Heavy aggregations should be paginated or cached — not run on every request
- Currency normalization to base currency before aggregating (see Multi-Currency future module)

---
---

## Future Modules

Not yet assigned to a phase. Sequencing to be decided after Cart & Orders.

---

### Vendors

- Vendors register and submit their store profile for approval (name, logo, description, slug)
- Each vendor manages their own products, inventory, pricing, and campaigns independently
- The platform company has its own vendor account representing its direct sales
- Vendor payouts are calculated after successful payments and processed on a schedule via cron
- Payout events published to RabbitMQ for downstream processing
- Vendors receive real-time order and stock notifications via WebSockets

---

### Wishlists

- Customers save products to a named wishlist for later
- Wishlist data feeds into product suggestion algorithms and marketing campaign targeting
- A product can be on multiple wishlists; a customer can have multiple wishlists

---

### Campaigns & Promotions

- Vendors create time-boxed campaigns with a start/end date and discount type (percentage or fixed amount)
- Original product price is never modified — campaign price is resolved at query time by joining active campaigns
- Overlapping campaigns on the same product have a defined priority (highest discount wins, or explicit priority field)
- Expired campaigns are cleaned up via cron — no manual intervention required

---

### Search

- Unified search returns products, categories, brands, and vendors in a single response with a `type` and `slug` per result
- Results are typo-tolerant and relevance-ranked
- Implementation path: SQL FTS first (for development), Meilisearch as the production layer when the product set grows
- Search events (queries with no results) feed back into content gap reporting

---

### Product Analytics

- Every product view, add-to-cart, and purchase is recorded as a timestamped event
- Aggregated counters per product (total views, total purchases) for fast reads on product listings
- Raw events feed trending lists, suggestion algorithms, and campaign performance reports

---

### Product Suggestions

- "You might also like" based on the current browsing category
- "Users who bought this also bought" derived from co-purchase patterns in order history
- Suggestion freshness controlled by recency weighting — older purchase patterns decay

---

### Multi-Currency

- All prices stored with a currency code alongside the amount
- Exchange rates snapshotted on orders at checkout — never recalculated retroactively
- Reporting normalizes all amounts to a base currency before aggregating totals
