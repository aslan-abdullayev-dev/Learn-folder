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
| `npm run db:init` | Create all tables from `database/schema.sql` (safe, skips existing) |
| `npm run db:reset` | Drop all tables and recreate from schema — dev only |
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

