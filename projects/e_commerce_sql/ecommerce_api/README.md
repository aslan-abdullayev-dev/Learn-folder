# 🛒 ecommerce-api

A full-featured multi-vendor e-commerce platform API built from scratch with NestJS and raw SQL — no ORM, no shortcuts. Every query is a hand-written prepared statement. Built as a deep-dive into backend architecture and SQL.

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
| Database | PostgreSQL — raw SQL only, no ORM |
| Auth | passport-jwt, bcrypt |
| Real-time | WebSockets |
| Background jobs | BullMQ, cron |
| Cache / Queue | Redis |
| Message broker | RabbitMQ |
| Search | SQL FTS → Meilisearch |
| Port | 8181 |

---

## 🚀 Setup

Being rebuilt from scratch against PostgreSQL — app-level setup (install, run, test) will return here once the NestJS side lands. Database is available now:

1. Copy `.env.example` to `.env` and fill in real values
2. `docker compose up -d` — starts Postgres 16 on `localhost:5432`
3. Connect with DataGrip (or `psql`) using the `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` values from `.env`
4. `docker compose down` stops it (data persists in a named volume); `docker compose down -v` also wipes the volume

### Environment variables

| Var | Purpose |
|---|---|
| `POSTGRES_USER` | Postgres superuser created on first container boot |
| `POSTGRES_PASSWORD` | Password for that user |
| `POSTGRES_DB` | Database created on first container boot |

---

## 🗺️ Build Phases

| # | Module | Status |
|---|---|---|
| 1 | Auth & Users | 📋 Planned |
| 2 | Categories | 📋 Planned |
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

