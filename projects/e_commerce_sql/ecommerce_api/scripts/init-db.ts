import { DatabaseSync } from 'node:sqlite';
import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const isReset = process.argv.includes('--reset');

const dbName = process.env.DB_NAME;
if (!dbName) throw new Error('DB_NAME is not defined in .env');

const dbPath = path.join(process.cwd(), 'database', dbName);
const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys = ON;');

if (isReset) {
  db.exec(`
    DROP TABLE IF EXISTS category_slug_redirects;
    DROP TABLE IF EXISTS category_ancestors;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS user_roles;
    DROP TABLE IF EXISTS role_permissions;
    DROP TABLE IF EXISTS refresh_tokens;
    DROP TABLE IF EXISTS permissions;
    DROP TABLE IF EXISTS roles;
    DROP TABLE IF EXISTS users;
  `);
  console.log('All tables dropped.');
}

db.exec(schema);
db.close();

console.log(`Database ${isReset ? 'reset' : 'initialised'} at: ${dbPath}`);
