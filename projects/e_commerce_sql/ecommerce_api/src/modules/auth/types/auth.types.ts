export interface UserWithPassword {
  id: string;
  email: string;
  password_hash: string;
  status: string;
  permissions: string[];
}

export interface RawUserWithPassword {
  id: string;
  email: string;
  password_hash: string;
  status: string;
  permissions: string | null;
}
