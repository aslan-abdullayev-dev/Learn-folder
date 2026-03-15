import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { DatabaseSync } from 'node:sqlite';

@Injectable()
export class DatabaseService {
  private readonly db: DatabaseSync;

  constructor() {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      throw new Error('DB_NAME is not defined');
    }
    const dbPath = path.join(process.cwd(), 'database', dbName);
    this.db = new DatabaseSync(dbPath);
    this.db.exec('PRAGMA foreign_keys = ON;');
  }

  getDb(): DatabaseSync {
    return this.db;
  }
}
