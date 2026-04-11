-- ─── USERS ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id            TEXT NOT NULL PRIMARY KEY,
  email         TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'active',
  is_deleted    INTEGER NOT NULL DEFAULT 0,
  deleted_at    TEXT,
  created_by    TEXT,
  created_at    TEXT NOT NULL,
  updated_at    TEXT,
  CHECK (status IN ('active', 'inactive', 'suspended', 'banned', 'pending_verification', 'deleted'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_active
ON users (email) WHERE is_deleted = 0;

-- ─── ROLES ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS roles (
  id          TEXT NOT NULL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── PERMISSIONS ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS permissions (
  id          TEXT NOT NULL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  module      TEXT NOT NULL,
  action      TEXT NOT NULL,
  description TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (module, action)
);

-- ─── ROLE PERMISSIONS ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       TEXT NOT NULL REFERENCES roles(id),
  permission_id TEXT NOT NULL REFERENCES permissions(id),
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (role_id, permission_id)
);

-- ─── USER ROLES ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS user_roles (
  user_id    TEXT NOT NULL REFERENCES users(id),
  role_id    TEXT NOT NULL REFERENCES roles(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, role_id)
);

-- ─── REFRESH TOKENS ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id          TEXT NOT NULL PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id),
  token       TEXT NOT NULL UNIQUE,
  is_used     INTEGER NOT NULL DEFAULT 0,
  expires_at  TEXT NOT NULL,
  device_type TEXT,
  user_agent  TEXT,
  created_at  TEXT NOT NULL
);

-- ─── CATEGORIES ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS categories (
  id          TEXT NOT NULL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url   TEXT,
  is_active   INTEGER NOT NULL DEFAULT 0,
  is_deleted  INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL,
  updated_at  TEXT
);

-- ─── CATEGORY ANCESTORS (CLOSURE TABLE) ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS category_ancestors (
  ancestor_id   TEXT NOT NULL REFERENCES categories(id),
  descendant_id TEXT NOT NULL REFERENCES categories(id),
  depth         INTEGER NOT NULL,
  PRIMARY KEY (ancestor_id, descendant_id)
);

-- ─── CATEGORY SLUG REDIRECTS ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS category_slug_redirects (
  old_slug    TEXT NOT NULL PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id),
  created_at  TEXT NOT NULL
);
