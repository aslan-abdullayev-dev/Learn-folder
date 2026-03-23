// =============================================================================
// TUTORIAL 3 — Categories & The Closure Table
// Run: npx ts-node src/playground/03-categories.ts
// =============================================================================
//
// Work through steps one at a time.
// Comment out the previous step before uncommenting the next.
// =============================================================================
//
// THE PROBLEM
// -----------
// Categories are hierarchical: Electronics → Phones → Smartphones.
// The naive way is a parent_id column — each row points to its parent.
// That works for simple cases but breaks the moment you need to answer:
//   "give me ALL ancestors of Smartphones" or
//   "give me ALL descendants of Electronics"
//
// With parent_id you have to walk up/down the tree row by row in application
// code — one query per level. 5 levels deep = 5 queries. Unpredictable,
// slow, and painful to sort.
//
// The closure table solves this: a second table pre-records EVERY
// ancestor-descendant pair in the tree. Any query that would take N trips
// becomes a single JOIN.
//
// This tutorial builds both approaches so the difference is visceral.
// =============================================================================

// -----------------------------------------------------------------------------
//* STEP 1 — The naive approach: parent_id
//
// Build a small tree with parent_id. Then try to fetch all ancestors of
// a deeply nested node. Notice how many queries it takes.
//
// Tree we'll build:
//   Electronics (root)
//   └── Phones
//       └── Smartphones
//
// Expected output:
//   Electronics  null
//   Phones       <electronics-id>
//   Smartphones  <phones-id>
//
//   Ancestors of Smartphones (naive — 2 separate queries):
//   Step 1: Phones
//   Step 2: Electronics
// -----------------------------------------------------------------------------

// import { DatabaseSync } from 'node:sqlite';
//
// const db = new DatabaseSync(':memory:');
// //
// db.exec(`
//   CREATE TABLE categories (
//     id        TEXT PRIMARY KEY,
//     name      TEXT NOT NULL,
//     parent_id TEXT REFERENCES categories(id)
//   )
// `);
//
// db.exec(`
//   INSERT INTO categories VALUES
//     ('e1', 'Electronics', NULL),
//     ('p1', 'Phones',      'e1'),
//     ('s1', 'Smartphones', 'p1')
// `);

// const categories = db.prepare(`SELECT * FROM categories`).all();
// console.log(categories);
//
// // See the raw table
// const all = db.prepare('SELECT * FROM categories').all();
// all.forEach((r) => console.log(r['name'], r['parent_id'] ?? 'null'));
//
// console.log('"======================" ==>', '======================');

// // Now fetch all ancestors of Smartphones — requires walking up manually
// console.log('\nAncestors of Smartphones (naive — one query per level):');

// let current = db
//   .prepare('SELECT * FROM categories WHERE id = ?')
//   .get('s1') as any;
//
// while (current.parent_id) {
//   current = db
//     .prepare('SELECT * FROM categories WHERE id = ?')
//     .get(current.parent_id) as any;
//   console.log(current.name); // one round-trip per level
// }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 1
//
// Task 1.1 — Add a 4th level
//   Add 'Galaxy S24' as a child of Smartphones.
//   Walk up all ancestors manually. Count how many queries it took.
//   Write the count as a comment.

// db.prepare(`INSERT INTO categories VALUES (?, ?, ?)`).run('g1', 'Galaxy S24', 's1');
// let current: any = db.prepare(`SELECT * FROM categories WHERE id = ?`).get('g1');
// let count = 1;
//
// while (current.parent_id) {
//   count++;
//   current = db.prepare(`SELECT * FROM categories WHERE id = ?`).get(current.parent_id);
// }
//
// console.log('count ==>', count);

// Task 1.2 — Predict the pain
//   If the tree had 10 levels, how many queries would fetching all ancestors
//   require? Write your answer as a comment.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 2 — The closure table: self-reference rows
//
// The closure table stores every ancestor-descendant pair.
// Every node gets a row pointing to itself at depth 0.
// This is the foundation — without the self-row, queries break.
//
// Expected output:
//   ancestor_id  descendant_id  depth
//   e1           e1             0     <- Electronics knows about itself
//   p1           p1             0     <- Phones knows about itself
//   s1           s1             0     <- Smartphones knows about itself
// -----------------------------------------------------------------------------

// import { DatabaseSync } from 'node:sqlite';
//
// const db = new DatabaseSync(':memory:');
//
// db.exec(`
//   CREATE TABLE categories (
//     id   TEXT PRIMARY KEY,
//     name TEXT NOT NULL
//   );
//
//   CREATE TABLE category_ancestors (
//     ancestor_id   TEXT NOT NULL REFERENCES categories(id),
//     descendant_id TEXT NOT NULL REFERENCES categories(id),
//     depth         INTEGER NOT NULL,
//     PRIMARY KEY (ancestor_id, descendant_id)
//   );
// `);
//
// // Insert three nodes — no parent relationships yet, just self-rows
// const insertCat = db.prepare('INSERT INTO categories VALUES (?, ?)');
// const insertAnc = db.prepare('INSERT INTO category_ancestors VALUES (?, ?, ?)');
//
// insertCat.run('e1', 'Electronics');
// insertAnc.run('e1', 'e1', 0);
//
// insertCat.run('p1', 'Phones');
// insertAnc.run('p1', 'p1', 0);
//
// insertCat.run('s1', 'Smartphones');
// insertAnc.run('s1', 's1', 0);
//
// const rows = db.prepare('SELECT * FROM category_ancestors').all();
// console.log('ancestor_id  descendant_id  depth');
// rows.forEach((r: any) => console.log(r.ancestor_id, r.descendant_id, r.depth));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 2
//
// Task 2.1 — Add a 4th node
//   Add 'Galaxy S24' to categories and its self-row to category_ancestors.
//   Confirm 4 self-rows exist.
//
// Task 2.2 — Why depth 0 for self?
//   Write a comment explaining: why is the self-reference row at depth 0
//   and not depth 1?
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 3 — Inserting a parent-child relationship
//
// When Phones is placed under Electronics, we need to record:
//   - Electronics → Phones at depth 1  (direct parent)
//   - All of Electronics's own ancestors → Phones (propagate the chain upward)
//
// The pattern: to attach child C under parent P, insert a row for every
// existing ancestor of P pointing to C, with depth + 1.
//
// Tree we'll build:
//   Electronics
//   └── Phones
//       └── Smartphones
//
// Expected output (category_ancestors after full tree):
//   e1 → e1  depth 0  (self)
//   p1 → p1  depth 0  (self)
//   s1 → s1  depth 0  (self)
//   e1 → p1  depth 1  (Electronics is direct parent of Phones)
//   e1 → s1  depth 2  (Electronics is grandparent of Smartphones)
//   p1 → s1  depth 1  (Phones is direct parent of Smartphones)
// -----------------------------------------------------------------------------

// import { DatabaseSync } from 'node:sqlite';
//
// const db = new DatabaseSync(':memory:');
//
// db.exec(`
//   CREATE TABLE categories (
//     id   TEXT PRIMARY KEY,
//     name TEXT NOT NULL
//   );
//   CREATE TABLE category_ancestors (
//     ancestor_id   TEXT NOT NULL REFERENCES categories(id),
//     descendant_id TEXT NOT NULL REFERENCES categories(id),
//     depth         INTEGER NOT NULL,
//     PRIMARY KEY (ancestor_id, descendant_id)
//   );
// `);
//
// const insertCat = db.prepare('INSERT INTO categories VALUES (?, ?)');
// const insertAnc = db.prepare('INSERT INTO category_ancestors VALUES (?, ?, ?)');
//
// // Helper: attach child under parent
// function attachChild(childId: string, parentId: string) {
//   // For every ancestor of the parent (including the parent itself at depth 0),
//   // insert a row pointing to the child with depth + 1
//   const ancestors = db.prepare(`
//     SELECT ancestor_id, depth FROM category_ancestors WHERE descendant_id = ?
//   `).all(parentId) as any[];
//
//   for (const row of ancestors) {
//     insertAnc.run(row.ancestor_id, childId, row.depth + 1);
//   }
// }
//
// // Build the tree
// insertCat.run('e1', 'Electronics'); insertAnc.run('e1', 'e1', 0);
// insertCat.run('p1', 'Phones');      insertAnc.run('p1', 'p1', 0);
// insertCat.run('s1', 'Smartphones'); insertAnc.run('s1', 's1', 0);
//
// attachChild('p1', 'e1'); // Phones under Electronics
// attachChild('s1', 'p1'); // Smartphones under Phones
//
// const rows = db.prepare('SELECT * FROM category_ancestors ORDER BY depth').all();
// console.log('ancestor_id  descendant_id  depth');
// rows.forEach((r: any) => console.log(r['ancestor_id'], '→', r['descendant_id'], ' depth', r['depth']));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 3
//
// Task 3.1 — Add a 4th level
//   Add 'Galaxy S24' under Smartphones. How many rows does category_ancestors
//   have now? Write your count as a comment before running, then verify.
//
// Task 3.2 — Add a sibling
//   Add 'Laptops' as a second child of Electronics.
//   How many new rows get inserted into category_ancestors?
//   Write your prediction first, then verify.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 4 — Querying the tree
//
// Now see the payoff: any tree query is a single SQL statement.
//
// Expected output (for the Electronics → Phones → Smartphones tree):
//   All ancestors of Smartphones: [ 'Phones', 'Electronics' ]
//   Direct children of Electronics: [ 'Phones' ]
//   Full subtree of Electronics: [ 'Phones', 'Smartphones' ]
//   Breadcrumb path: Electronics > Phones > Smartphones
// -----------------------------------------------------------------------------

// import { DatabaseSync } from 'node:sqlite';
//
// const db = new DatabaseSync(':memory:');
//
// db.exec(`
//   CREATE TABLE categories (id TEXT PRIMARY KEY, name TEXT NOT NULL);
//   CREATE TABLE category_ancestors (
//     ancestor_id TEXT NOT NULL, descendant_id TEXT NOT NULL, depth INTEGER NOT NULL,
//     PRIMARY KEY (ancestor_id, descendant_id)
//   );
// `);
//
// const ic = db.prepare('INSERT INTO categories VALUES (?, ?)');
// const ia = db.prepare('INSERT INTO category_ancestors VALUES (?, ?, ?)');
//
// function attachChild(childId: string, parentId: string) {
//   const ancestors = db.prepare(
//     'SELECT ancestor_id, depth FROM category_ancestors WHERE descendant_id = ?'
//   ).all(parentId) as any[];
//   for (const row of ancestors) ia.run(row.ancestor_id, childId, row.depth + 1);
// }
//
// ic.run('e1', 'Electronics'); ia.run('e1', 'e1', 0);
// ic.run('p1', 'Phones');      ia.run('p1', 'p1', 0);
// ic.run('s1', 'Smartphones'); ia.run('s1', 's1', 0);
// attachChild('p1', 'e1');
// attachChild('s1', 'p1');
//
// // All ancestors of Smartphones (excluding self)
// const ancestors = db.prepare(`
//   SELECT c.name FROM categories c
//   JOIN category_ancestors ca ON ca.ancestor_id = c.id
//   WHERE ca.descendant_id = 's1' AND ca.depth > 0
//   ORDER BY ca.depth ASC
// `).all() as any[];
// console.log('All ancestors of Smartphones:', ancestors.map(r => r.name));
//
// // Direct children of Electronics (depth = 1)
// const children = db.prepare(`
//   SELECT c.name FROM categories c
//   JOIN category_ancestors ca ON ca.descendant_id = c.id
//   WHERE ca.ancestor_id = 'e1' AND ca.depth = 1
// `).all() as any[];
// console.log('Direct children of Electronics:', children.map(r => r.name));
//
// // Full subtree of Electronics (all descendants, depth > 0)
// const subtree = db.prepare(`
//   SELECT c.name FROM categories c
//   JOIN category_ancestors ca ON ca.descendant_id = c.id
//   WHERE ca.ancestor_id = 'e1' AND ca.depth > 0
// `).all() as any[];
// console.log('Full subtree of Electronics:', subtree.map(r => r.name));
//
// // Breadcrumb: ancestors ordered root-first (ORDER BY depth DESC)
// const breadcrumb = db.prepare(`
//   SELECT c.name FROM categories c
//   JOIN category_ancestors ca ON ca.ancestor_id = c.id
//   WHERE ca.descendant_id = 's1'
//   ORDER BY ca.depth DESC
// `).all() as any[];
// console.log('Breadcrumb path:', breadcrumb.map(r => r.name).join(' > '));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 4
//
// Task 4.1 — Count descendants
//   Without changing any data, write a query that returns the total number of
//   descendants of Electronics (not counting Electronics itself).
//
// Task 4.2 — Find root nodes
//   A root has no ancestors other than itself (depth 0 only).
//   Write a query that returns all root categories.
//   (Hint: roots have no rows in category_ancestors where depth > 0 and
//   they are the descendant)
//
// Task 4.3 — Depth of a node
//   Write a query that returns the depth of Smartphones from the root.
//   (Hint: find the max depth row where Smartphones is the descendant)
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 5 — Break it: inserting without the self-row
//
// The self-row (depth 0) is not optional. Remove it and see queries return
// wrong or empty results.
//
// Expected output:
//   Ancestors of Smartphones: []   <- empty — chain is broken without self-rows
// -----------------------------------------------------------------------------

// import { DatabaseSync } from 'node:sqlite';
//
// const db = new DatabaseSync(':memory:');
//
// db.exec(`
//   CREATE TABLE categories (id TEXT PRIMARY KEY, name TEXT NOT NULL);
//   CREATE TABLE category_ancestors (
//     ancestor_id TEXT NOT NULL, descendant_id TEXT NOT NULL, depth INTEGER NOT NULL,
//     PRIMARY KEY (ancestor_id, descendant_id)
//   );
// `);
//
// const ic = db.prepare('INSERT INTO categories VALUES (?, ?)');
// const ia = db.prepare('INSERT INTO category_ancestors VALUES (?, ?, ?)');
//
// // Intentionally skip self-rows
// ic.run('e1', 'Electronics');
// ic.run('p1', 'Phones');
// ic.run('s1', 'Smartphones');
//
// // Try to attach without self-rows — attachChild queries ancestors of parent,
// // finds nothing, so inserts nothing
// function attachChild(childId: string, parentId: string) {
//   const ancestors = db.prepare(
//     'SELECT ancestor_id, depth FROM category_ancestors WHERE descendant_id = ?'
//   ).all(parentId) as any[];
//   for (const row of ancestors) ia.run(row.ancestor_id, childId, row.depth + 1);
// }
//
// attachChild('p1', 'e1');
// attachChild('s1', 'p1');
//
// const ancestors = db.prepare(`
//   SELECT c.name FROM categories c
//   JOIN category_ancestors ca ON ca.ancestor_id = c.id
//   WHERE ca.descendant_id = 's1' AND ca.depth > 0
// `).all() as any[];
// console.log('Ancestors of Smartphones:', ancestors.map((r: any) => r.name));
// // [] — nothing was inserted because attachChild found no parent ancestors

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 5
//
// Task 5.1 — Explain in a comment
//   Why does attachChild insert nothing when self-rows are missing?
//   Trace through the function with 'e1' as parentId step by step.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 6 — Connect to real code (no code to run — read and understand)
//
// Open: src/modules/categories/categories.service.ts
//
//   createCategory():
//     INSERT into categories
//     INSERT self-row: (id, id, 0)
//     Currently root-only — parent assignment comes via PATCH
//
// Open: src/modules/categories/documentation/categories.md
//   → Technical → Re-Parent Logic
//
//   Re-parenting is the reverse of attachChild:
//   1. DELETE ancestor rows where descendant = M or M's descendants
//      AND the ancestor is outside M's subtree
//   2. INSERT new rows connecting M and all descendants
//      through the new parent's full ancestor chain
//   3. Internal subtree rows are untouched
//   4. Single transaction
//
// Full picture:
//   POST /categories  →  creates root node + self-row
//   PATCH /categories/:id (parentId)  →  runs re-parent logic
//   Any tree query  →  single JOIN on category_ancestors
//* -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// MINI QUIZ — answer in comments, then move to Tutorial 4
//
// Q1. Why is a self-reference row (depth 0) required for every node?
// A:
//
// Q2. You have a 4-level tree. How many queries does it take to fetch all
//     ancestors of the deepest node using the closure table? What about parent_id?
// A:
//
// Q3. What two tables does attachChild read and write to?
// A:
//
// Q4. Why does re-parenting leave internal subtree rows untouched?
// A:
//
// Q5. The visibility rule says a category is visible only if all its ancestors
//     are active. How would you query this using category_ancestors?
// A:
// -----------------------------------------------------------------------------