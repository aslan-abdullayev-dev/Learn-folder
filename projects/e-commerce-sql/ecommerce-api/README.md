# 🛒 E-commerce Platform — Business Logic

## 🏢 Platform Model
* Multi-vendor marketplace — third-party vendors list and sell their own products
* The platform company is itself a vendor — it owns and sells products directly
* The platform company also manages physical storage locations and retail shops
* Every product belongs to a vendor — there are no platform-level ownerless products
* Orders containing items from multiple vendors are split into per-vendor sub-orders

## 👥 People & Access
* Customers can register, login, and manage their profile
* Staff have different roles (admin, warehouse, support, finance)
* Each role has specific permissions (e.g. warehouse can't see payments)
* Admins can activate/deactivate any account
* All login attempts are logged (success & failure)
* Sessions expire after inactivity

## 🏪 Vendors
* Vendors register and manage their own store profile (name, logo, description, slug)
* Each vendor manages their own products, inventory, pricing, and campaigns
* Vendors receive real-time order notifications via WebSockets
* Vendor payouts are processed automatically via scheduled cron jobs
* Payout events are published to a message broker (RabbitMQ) for processing
* The platform company has its own vendor account representing its direct sales

## 🏷️ Products & Categories
* Every product belongs to a vendor
* Products belong to categories (can be nested, e.g. Electronics → Phones)
* Each product has variants (size, color, etc.)
* Products can be drafted, published, or archived (never hard deleted)
* Product price history is kept for reporting
* Categories define which attributes are relevant (e.g. Phones → RAM, Storage, Battery)
* Attributes and their values are stored dynamically (EAV model) to support faceted filtering
* Filter inputs on browse pages are generated dynamically based on the current category
* Each product can have multiple images, one marked as primary
* Products belong to a brand (brands are a first-class entity with logo, description, slug)

## 📦 Inventory
* Every variant tracks its own stock level per vendor
* Low stock triggers a restock alert (published via message broker)
* Stock is reserved temporarily during checkout
* Platform company tracks stock across its physical storage locations and shops

## 👤 Customer Profiles
* Each customer has a profile linked to their user account
* Profile holds personal info: name, phone, date of birth
* Customers can save up to 5 addresses, one marked as default
* Profiles are soft deleted when the user account is deleted
* Customer data can be anonymized on deletion request

## 💝 Wishlists
* Customers can save products to a wishlist for later
* Wishlist is per customer, no limit on items
* Wishlist feeds into product suggestions and marketing insights

## 🛍️ Shopping & Orders
* Guest users can add items to a cart but must log in to complete checkout
* Customers build a cart before checkout
* Cart items are reserved temporarily during checkout
* An order containing items from multiple vendors is split into per-vendor sub-orders
* Orders go through statuses: `pending → confirmed → processing → shipped → delivered → closed`
* Orders can be cancelled (with a reason) at certain stages only
* Each order captures the price at time of purchase (even if product price changes later)
* Each order captures a snapshot of the shipping address at time of purchase
* Tax is captured on each order and can vary by region
* Discount codes can be applied at checkout (tracked per order)
* Order status changes are published as events via message broker
* Vendors receive real-time notifications when new sub-orders arrive (WebSockets)

## 🎟️ Discount Codes & Coupons
* Customers can apply a discount code at checkout
* Codes have a type (percentage or fixed), usage limit, and expiry date
* A code can be single-use or multi-use
* Applied code and discount amount are captured on the order
* Codes are separate from campaigns — they are entered manually by the customer

## 💳 Payments
* An order can have one or more payment attempts
* Payment statuses: `pending → success / failed / refunded`
* Failed payments allow retry
* Refunds are tracked separately with a reason and approver
* Finance team can run reports on daily/monthly revenue
* Vendor payouts are calculated after successful payments and processed on a schedule

## 🚚 Shipping & Delivery
* Each sub-order gets its own shipment record with a tracking number
* Shipment statuses: `preparing → dispatched → in transit → delivered / returned`
* Customers can report delivery issues
* Returns generate a return request that the relevant vendor must approve
* Platform company ships from its own physical storage locations

## ⭐ Reviews & Feedback
* Customers can review a product only after purchase
* Customers can also review a vendor (overall store experience)
* Reviews can be flagged by staff as inappropriate
* Flagged reviews are hidden pending moderation

## 🔔 Notifications
* Customers get notified on: order confirmed, shipped, delivered, refund processed
* Vendors get notified on: new order, return request, low stock, payout processed
* Staff get notified on: new vendor registration, flagged review, dispute raised
* Notifications track read/unread status
* Real-time notifications delivered via WebSockets
* Notification events flow through message broker (RabbitMQ)

## 🎯 Campaigns & Promotions
* Vendors can create campaigns for their own products
* Campaigns have a start date, end date, and discount type (percentage or fixed amount)
* Original price stays untouched — campaign price is resolved at query time
* Overlapping campaigns on the same product have a defined priority order
* Campaign expiry is handled automatically via cron job
* Campaign effectiveness is measurable (views and purchases during campaign window)

## 📈 Product Analytics
* Every product view, add-to-cart, and purchase is recorded as an event with a timestamp
* Aggregated counters (total views, total purchases) are maintained per product for fast reads
* Activity data feeds product suggestions, trending lists, and campaign reporting
* Authenticated and anonymous activity is both tracked where possible

## 🤖 Product Suggestions
* Products are suggested based on the category the user is currently browsing
* Suggestions are also driven by user activity (viewed, carted, purchased)
* "Users who bought this also bought" patterns derived from order history

## 🔍 Search
* Unified search input returns mixed result types: products, categories, brands, and vendors
* Each result includes a `type` field and `slug` so the frontend knows where to route on click
* Search is typo-tolerant and relevance-ranked
* SQL Full-Text Search (FTS) is implemented first as a learning foundation
* Meilisearch is used as the dedicated search layer for production-grade speed (sub 50ms)
* Meilisearch sits alongside the database as a read layer — SQLite/MySQL remains source of truth
* Searchable attributes: product name, description, brand, category name, vendor name
* Filterable attributes: price, category, brand, vendor, rating
* Sortable attributes: price, popularity, created_at
* DB → Meilisearch sync is handled in NestJS on every create/update

## 📋 Audit & Compliance
* Every data change on sensitive tables is logged (old value → new value)
* Logs record: who made the change, from what IP, and when
* Customers can request account deletion (data anonymized, not deleted)
* Deleted accounts are soft deleted — orders and history are preserved
* Staff activity on orders is tracked: who confirmed, who processed, who approved a refund

## 📊 Reporting (for later advanced SQL practice)
* Sales by product / category / vendor / date range
* Top customers by spend
* Top vendors by revenue
* Most returned products
* Staff activity reports
* Failed payment trends
* Trending products by views and purchases
* Campaign performance reports
* Vendor payout history

## ⚙️ Backend Technology Goals
* **WebSockets** — real-time order and low-stock notifications to vendors and staff
* **Redis** — caching frequently read data (product listings, categories), session store, queue backend
* **Message Broker (RabbitMQ)** — order events, vendor notifications, payout processing, low stock alerts
* **BullMQ** — background job queues for payouts, invoice generation, Meilisearch sync
* **Cron Jobs** — scheduled payout runs, campaign expiry, stock alert digests
* **Webhooks** — notifying vendors of order status changes via their registered endpoints

## 💱 Multi-Currency
* All prices are stored with a currency code alongside the amount
* Orders snapshot the currency and exchange rate at time of purchase
* Vendor payouts include currency context
* Reporting normalizes all amounts to a base currency before aggregating

## 🚫 Out of Scope (Conscious Exclusions)
* Multi-language — platform is single language only for now, translation tables can be added later without breaking existing schema

## Suggested Build Order
1. 🔐 Auth & Access Management ✅
2. 🏷️ Products & Categories
3. 📦 Inventory
4. 👤 Customer Profiles
5. 🛒 Cart & Orders
6. 💳 Payments
7. 🚚 Shipping & Returns
8. ⭐ Reviews
9. 🔔 Notifications
10. 📋 Audit Logs
11. 📊 Reporting queries