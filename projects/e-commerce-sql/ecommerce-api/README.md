# 🛒 ecommerce-api

A full-featured multi-vendor e-commerce platform API built from scratch with NestJS and raw SQLite — no ORM, no shortcuts. Every query is a hand-written prepared statement. Built as a deep-dive into backend architecture and SQL.

---

## 🌟 What It Will Be

A production-grade marketplace where:

- 🏪 **Multiple vendors** list and sell their own products alongside the platform's own inventory
- 👤 **Customers** register, browse, cart, checkout, pay, and track deliveries
- 🛡️ **Staff** manage operations with role-based access (admin, warehouse, support, finance)
- ⚡ **Real-time** order and stock notifications delivered via WebSockets
- ⚙️ **Background jobs** handle payouts, campaign expiry, and search sync via BullMQ + cron
- 🔍 **Search** powered by SQL FTS first, then Meilisearch for sub-50ms production-grade results
- 📡 **Every significant event** flows through RabbitMQ for async processing and vendor webhooks

---

## 🧱 Tech Stack

| Concern | Choice |
|---|---|
| Framework | NestJS 11, TypeScript |
| Database | SQLite via Node's built-in `DatabaseSync` — raw SQL only |
| Auth | passport-jwt, bcrypt |
| Real-time | WebSockets |
| Background jobs | BullMQ, cron |
| Cache / Queue | Redis |
| Message broker | RabbitMQ |
| Search | SQL FTS → Meilisearch |
| Port | 8181 |

---

## 🚀 Setup

```bash
npm install
```

Create a `.env` file in the project root:

```env
JWT_SECRET=your_jwt_secret
SUPER_ADMIN_EMAIL=your_admin_email@example.com
DB_NAME=db
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `JWT_SECRET` | Yes | Signs JWT access tokens. App throws on startup if missing. |
| `SUPER_ADMIN_EMAIL` | Yes | Receives superAdmin role when running the seed script. |
| `DB_NAME` | No | Database filename under `database/`. Defaults to `db`. Use `test_db` for tests. |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Start with file watching |
| `npm run start:prod` | Run compiled output |
| `npm run build` | Compile TypeScript |
| `npm test` | Run all tests against `test_db` |
| `npm run test:watch` | Tests in watch mode |
| `npm run seed:permissions` | Seed permissions and assign superAdmin to `SUPER_ADMIN_EMAIL` |
| `npm run format` | Prettier format |
| `npm run lint` | ESLint fix |

---

## 🗺️ Build Phases

| # | Module | Status |
|---|---|---|
| 1 | Auth & Users | ✅ Complete |
| 2 | Categories | 🔄 In Progress |
| 3 | Inventory | 📋 Planned |
| 4 | Customer Profiles | 📋 Planned |
| 5 | Cart & Orders | 📋 Planned |
| 6 | Payments | 📋 Planned |
| 7 | Shipping & Returns | 📋 Planned |
| 8 | Reviews | 📋 Planned |
| 9 | Notifications | 📋 Planned |
| 10 | Audit Logs | 📋 Planned |
| 11 | Reporting | 📋 Planned |
| — | Vendors, Campaigns, Search, Analytics | 🔮 Future |

---

## 📦 Planned Modules — Scope

### 🏪 Vendors
- Vendors register and manage their own store profile (name, logo, description, slug)
- Each vendor manages their own products, inventory, pricing, and campaigns
- Vendors receive real-time order notifications via WebSockets
- Vendor payouts processed automatically via scheduled cron and published to RabbitMQ
- The platform company has its own vendor account representing its direct sales

### 📦 Inventory
- Every product variant tracks its own stock level per vendor
- Low stock triggers a restock alert via message broker
- Stock is reserved temporarily during checkout
- Platform company tracks stock across physical storage locations and shops

### 👤 Customer Profiles
- Profile holds personal info: name, phone, date of birth
- Customers can save up to 5 addresses, one marked as default
- Profiles soft deleted with user account; data can be anonymized on request

### 💝 Wishlists
- Customers can save products to a wishlist for later
- Feeds into product suggestions and marketing insights

### 🛍️ Cart & Orders
- Guest users can cart but must log in to checkout
- Orders split into per-vendor sub-orders
- Statuses: `pending → confirmed → processing → shipped → delivered → closed`
- Cancellable at certain stages only (with reason)
- Price, address, tax, and discount code snapshotted at time of purchase
- Order status changes published as events via RabbitMQ

### 🎟️ Discount Codes
- Customers apply codes at checkout (percentage or fixed, usage-limited, expiry dated)
- Applied code and discount amount snapshotted on the order

### 💳 Payments
- One or more payment attempts per order; failed payments allow retry
- Refunds tracked separately with reason and approver
- Vendor payouts calculated after successful payments, processed on a schedule

### 🚚 Shipping & Returns
- Each sub-order gets its own shipment with tracking number
- Statuses: `preparing → dispatched → in transit → delivered / returned`
- Returns generate a vendor-approved return request

### ⭐ Reviews
- Customers can review a product or vendor only after purchase
- Staff can flag reviews; flagged reviews hidden pending moderation

### 🔔 Notifications
- Customers: order confirmed, shipped, delivered, refund processed
- Vendors: new order, return request, low stock, payout processed
- Staff: new vendor registration, flagged review, dispute raised
- Real-time via WebSockets; events flow through RabbitMQ

### 🎯 Campaigns & Promotions
- Vendors create campaigns with start/end dates and discount type (% or fixed)
- Original price untouched — campaign price resolved at query time
- Overlapping campaigns have defined priority; expiry handled via cron

### 🔍 Search
- Unified search returns products, categories, brands, and vendors with `type` and `slug`
- Typo-tolerant and relevance-ranked
- SQL FTS implemented first; Meilisearch as the production layer

### 📈 Product Analytics
- Views, add-to-cart, and purchases recorded as timestamped events
- Aggregated counters per product for fast reads
- Feeds suggestions, trending lists, and campaign reporting

### 🤖 Product Suggestions
- Based on current browsing category and user activity history
- "Users who bought this also bought" patterns from order history

### 📋 Audit & Compliance
- Every sensitive data change logged: old value, new value, who, IP, when
- Staff activity on orders tracked throughout lifecycle
- Data anonymization on customer deletion request

### 📊 Reporting
- Sales by product / category / vendor / date range
- Top customers, top vendors, most returned products
- Campaign performance, vendor payout history, failed payment trends

### 💱 Multi-Currency
- Prices stored with currency code; exchange rate snapshotted on orders
- Reporting normalizes to base currency before aggregating
