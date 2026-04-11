import { DatabaseSync } from 'node:sqlite';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DB_NAME = process.env.DB_NAME;
if (!DB_NAME) {
  throw new Error('DB_NAME is not defined in .env');
}

const DB_PATH = path.resolve(__dirname, '../database', DB_NAME);

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

const ROLES = [
  { name: 'superAdmin', description: 'Full access to everything' },
];

function collectAllPermissions(): string[] {
  const SRC_DIR = path.resolve(__dirname, '../src');
  const permissions: string[] = [];

  function scanDir(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.permissions.ts')) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const module = require(fullPath) as Record<
          string,
          Record<string, string>
        >;
        for (const exported of Object.values(module)) {
          permissions.push(...Object.values(exported));
        }
      }
    }
  }

  scanDir(SRC_DIR);

  return [...new Set(permissions)];
}

function seed() {
  if (!SUPER_ADMIN_EMAIL) {
    throw new Error('SUPER_ADMIN_EMAIL is not defined in .env');
  }

  const ALL_PERMISSIONS = collectAllPermissions();
  const ROLE_PERMISSIONS: Record<string, string[]> = {
    superAdmin: ALL_PERMISSIONS,
  };

  const db = new DatabaseSync(DB_PATH);
  const now = new Date().toISOString();

  console.log('🌱 Seeding permissions...');

  // ─── 1. INSERT MISSING PERMISSIONS ────────────────────────
  for (const name of ALL_PERMISSIONS) {
    const existing = db
      .prepare('SELECT id FROM permissions WHERE name = ?')
      .get(name);

    if (!existing) {
      const [module, action] = name.split(':');
      db.prepare(
        'INSERT INTO permissions (id, name, module, action, created_at) VALUES (?, ?, ?, ?, ?)',
      ).run(uuidv4(), name, module, action, now);
      console.log(`  ✅ Added permission: ${name}`);
    }
  }

  // ─── 2. WARN ABOUT ORPHANED PERMISSIONS ───────────────────
  const dbPermissions = db.prepare('SELECT name FROM permissions').all() as {
    name: string;
  }[];

  for (const { name } of dbPermissions) {
    if (!ALL_PERMISSIONS.includes(name)) {
      console.warn(
        `  ⚠️  Permission "${name}" exists in DB but not in codebase`,
      );
    }
  }

  // ─── 3. INSERT MISSING ROLES ──────────────────────────────
  for (const role of ROLES) {
    const existing = db
      .prepare('SELECT id FROM roles WHERE name = ?')
      .get(role.name);

    if (!existing) {
      db.prepare(
        'INSERT INTO roles (id, name, description, created_at) VALUES (?, ?, ?, ?)',
      ).run(uuidv4(), role.name, role.description, now);
      console.log(`  ✅ Added role: ${role.name}`);
    }
  }

  // ─── 4. ASSIGN PERMISSIONS TO ROLES ──────────────────────
  for (const [roleName, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    const role = db
      .prepare('SELECT id FROM roles WHERE name = ?')
      .get(roleName) as { id: string } | undefined;

    if (!role) continue;

    for (const permName of permissions) {
      const perm = db
        .prepare('SELECT id FROM permissions WHERE name = ?')
        .get(permName) as { id: string } | undefined;

      if (!perm) {
        console.warn(`  ⚠️  Permission not found in DB: ${permName}`);
        continue;
      }

      const existing = db
        .prepare(
          'SELECT 1 FROM role_permissions WHERE role_id = ? AND permission_id = ?',
        )
        .get(role.id, perm.id);

      if (!existing) {
        db.prepare(
          'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
        ).run(role.id, perm.id);
        console.log(`  ✅ Assigned ${permName} → ${roleName}`);
      }
    }
  }

  // ─── 5. ASSIGN SUPERADMIN ROLE TO SUPERADMIN USER ────────
  console.log('🌱 Assigning superAdmin role to superadmin user...');

  const superAdminUser = db
    .prepare('SELECT id FROM users WHERE email = ? AND is_deleted = 0')
    .get(SUPER_ADMIN_EMAIL) as { id: string } | undefined;

  if (!superAdminUser) {
    console.warn(
      `  ⚠️  Superadmin user "${SUPER_ADMIN_EMAIL}" not found in DB — skipping role assignment`,
    );
  } else {
    const superAdminRole = db
      .prepare('SELECT id FROM roles WHERE name = ?')
      .get('superAdmin') as { id: string } | undefined;

    if (!superAdminRole) {
      console.warn(
        '  ⚠️  superAdmin role not found — skipping role assignment',
      );
    } else {
      const existing = db
        .prepare('SELECT 1 FROM user_roles WHERE user_id = ? AND role_id = ?')
        .get(superAdminUser.id, superAdminRole.id);

      if (!existing) {
        db.prepare(
          'INSERT INTO user_roles (user_id, role_id, created_at) VALUES (?, ?, ?)',
        ).run(superAdminUser.id, superAdminRole.id, now);
        console.log(`  ✅ Assigned superAdmin role → ${SUPER_ADMIN_EMAIL}`);
      } else {
        console.log(
          `  ℹ️  superAdmin role already assigned to ${SUPER_ADMIN_EMAIL}`,
        );
      }
    }
  }

  console.log('✅ Seeding complete.');
  db.exec('PRAGMA wal_checkpoint(FULL);');
  db.close();
}

seed();
