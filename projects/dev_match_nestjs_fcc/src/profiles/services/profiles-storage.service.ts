import { Injectable } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { ProfileDomain } from '../interfaces/profile-domain.interface';

const DATA_FILE = join(process.cwd(), 'data', 'profiles.json');

@Injectable()
export class ProfilesStorageService {
  async read(): Promise<ProfileDomain[]> {
    try {
      const raw = await readFile(DATA_FILE, 'utf-8');
      return JSON.parse(raw) as ProfileDomain[];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw err;
    }
  }

  async write(profiles: ProfileDomain[]): Promise<void> {
    await mkdir(dirname(DATA_FILE), { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(profiles, null, 2), 'utf-8');
  }
}
