# 🛒 E-commerce Platform — Business Logic

## 👥 People & Access
* Customers can register, login, and manage their profile
* Staff have different roles (admin, warehouse, support, finance)
* Each role has specific permissions (e.g. warehouse can't see payments)
* Admins can activate/deactivate any account
* All login attempts are logged (success & failure)
* Sessions expire after inactivity

## 📦 Products & Inventory
* Products belong to categories (can be nested, e.g. Electronics → Phones)
* Each product has variants (size, color, etc.)
* Every variant tracks its own stock level
* Low stock triggers a restock alert
* Products can be drafted, published, or archived (never hard deleted)
* Product price history is kept for reporting

## 🛍️ Shopping & Orders
* Customers build a cart before checkout
* Cart items are reserved temporarily during checkout
* Orders go through statuses: `pending → confirmed → processing → shipped → delivered → closed`
* Orders can be cancelled (with a reason) at certain stages only
* Each order captures the price at time of purchase (even if product price changes later)

## 💳 Payments
* An order can have one or more payment attempts
* Payment statuses: `pending → success / failed / refunded`
* Failed payments allow retry
* Refunds are tracked separately with a reason and approver
* Finance team can run reports on daily/monthly revenue

## 🚚 Shipping & Delivery
* Each order gets a shipment record with a tracking number
* Shipment statuses: `preparing → dispatched → in transit → delivered / returned`
* Customers can report delivery issues
* Returns generate a return request that staff must approve

## ⭐ Reviews & Feedback
* Customers can review a product only after purchase
* Reviews can be flagged by staff as inappropriate
* Flagged reviews are hidden pending moderation

## 🔔 Notifications
* Customers get notified on: order confirmed, shipped, delivered, refund processed
* Staff get notified on: low stock, new return request, flagged review
* Notifications track read/unread status

## 📋 Audit & Compliance
* Every data change on sensitive tables is logged (old value → new value)
* Logs record: who made the change, from what IP, and when
* Customers can request account deletion (data anonymized, not deleted)
* Deleted accounts are soft deleted — orders and history are preserved

## 📊 Reporting (for later advanced SQL practice)
* Sales by product / category / date range
* Top customers by spend
* Most returned products
* Staff activity reports
* Failed payment trends

## Suggested Build Order
1. 🔐 Auth & Access Management
2. 👤 Customer Profiles
3. 🏷️ Products & Categories
4. 📦 Inventory
5. 🛒 Cart & Orders
6. 💳 Payments
7. 🚚 Shipping & Returns
8. ⭐ Reviews
9. 🔔 Notifications
10. 📋 Audit Logs
11. 📊 Reporting queries