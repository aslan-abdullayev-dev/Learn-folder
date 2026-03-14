import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { DatabaseSync } from 'node:sqlite';

@Injectable()
export class DatabaseService {
  private readonly db: DatabaseSync;

  constructor() {
    const dbPath = path.join(process.cwd(), 'database', 'db');
    this.db = new DatabaseSync(dbPath);
    this.db.exec('PRAGMA foreign_keys = ON;');
  }

  getDb(): DatabaseSync {
    return this.db;
  }
}
