import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

const profilesData = [
  {
    id: randomUUID(),
    name: 'Brianna Watts',
    description: 'Looking for someone to merge with my heart.',
  },
  {
    id: randomUUID(),
    name: 'Jasper Quinn',
    description: 'Seeking a partner in crime to compile my heart.',
  },
  {
    id: randomUUID(),
    name: 'Leo Park',
    description: 'You think you know VIM? Try Neovim.',
  },
];

@Injectable()
export class ProfilesService {
  private profiles = profilesData;

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    return this.profiles.find((profile) => profile.id === id);
  }
}
