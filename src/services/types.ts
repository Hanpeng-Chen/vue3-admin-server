import { AccessModelProps } from '../db/models/access'
import { UserModelProps } from '../db/models/user'

export interface UserWhereProps {
  username: string;
  password?: string;
  id?: number;
}

interface Role {
  id: number;
  name: string;
  description: string;
}
interface UserRole {
  id: number,
  Role: Role
}

// 根据用户id 获取用户以及角色信息
export type UserInfo = UserModelProps & {
  UserRoles?: UserRole[];
  roles?: Role[];
}

export type AccessRole = AccessModelProps & {
  RoleAccess?: UserRole[];
  roles?: Role[]
}

