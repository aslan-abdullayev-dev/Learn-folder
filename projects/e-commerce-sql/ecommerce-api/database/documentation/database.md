# 🗄️ Database Module

---

## What It Does

Provides a single shared SQLite connection to the entire application.
Declared as `@Global()` — imported once in `AppModule`, available everywhere without re-importing.

---

## How It Works

### Connection Setup
```
1. Read DB_NAME from environment variables — throws on startup if missing
2. Resolve full path: {cwd}/database/{DB_NAME}
3. Open DatabaseSync connection
4. Run PRAGMA foreign_keys = ON
```

### Accessing the DB
Every service that needs the database injects `DatabaseService` and calls `getDb()`:

```typescript
constructor(private readonly databaseService: DatabaseService) {
  this.db = databaseService.getDb();
}
```

The same `DatabaseSync` instance is shared across all services.

---

## Technology

### Node.js `DatabaseSync` (native SQLite)
Uses Node's built-in `node:sqlite` module — no external driver, no ORM, no query builder.
All queries are written as raw SQL using prepared statements:

```typescript
this.db.prepare('SELECT * FROM users WHERE id = ?').get(id)
this.db.prepare('INSERT INTO users ...').run(...)
this.db.prepare('SELECT * FROM users').all()
```

| Method | Returns | Use for |
|---|---|---|
| `.get(...)` | Single row or `undefined` | Lookups by id, unique fields |
| `.all(...)` | Array of rows | List queries |
| `.run(...)` | `{ changes, lastInsertRowid }` | INSERT, UPDATE, DELETE |

---

## Databases

### Production — `database/db`
Used when `DB_NAME=db`. The real application data.

### Test — `database/test_db`
Used when `DB_NAME=test_db`. Set via `cross-env` in the test script:
```json
"test": "cross-env DB_NAME=test_db jest"
```

The test database schema is created **inline in each spec file** — no migration files.
Each spec file creates the tables it needs in a `beforeAll` block and drops them in `afterAll`.

---

## PRAGMA foreign_keys = ON

Enabled on every connection at startup. SQLite does not enforce foreign keys by default — this pragma turns enforcement on.

> All FK constraints in the schema are only active because of this pragma. If it were removed, FK violations would silently pass.

---

## File Structure

```
database/
├── database.module.ts      @Global() module — provides and exports DatabaseService
├── database.service.ts     Opens connection, runs PRAGMA, exposes getDb()
├── db                      Production SQLite database file
└── test_db                 Test SQLite database file
```

---

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `DB_NAME` | Yes | Filename inside `database/` folder. App throws on startup if missing. |

---

## Gotchas

### Schema Lives in Spec Files, Not Migration Files
There are no migration files. The production DB schema was set up manually or via scripts. The test DB schema is recreated fresh on every test run inside spec files.

### `DatabaseSync` Is Synchronous
All DB calls are blocking — no `async/await` needed or used anywhere in the codebase. This is intentional for simplicity.

### One Connection, Shared Everywhere
`DatabaseService` is a singleton (NestJS default for providers). All modules share the same connection instance.
