export type ReduxAuthInitialState = {
  user: ReduxAuthState | undefined;
}

export interface ReduxAuthState {
  accessToken: string
  refreshToken: string
  expirationDate: number
  userId: number
  username: string
  mail: string
  defaultRoleInfo: DefaultRoleInfo
  roles: Role[]
  userType: UserType
  img: string
}

interface DefaultRoleInfo {
  id: number
  name: string
  perms: Perm[]
}

interface Perm {
  permId: number
  show: boolean
  edit: boolean
  delete: boolean
  create: boolean
}

interface Role {
  id: number
  name: string
}

interface UserType {
  id: number
  name: string
}
