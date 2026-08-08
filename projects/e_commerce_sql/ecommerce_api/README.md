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

Currently being rebuilt from scratch against PostgreSQL. Setup instructions, environment variables, and scripts will return here as that work lands.

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

