import { RegisterModel } from "../db/models/user";

export type RegisterPropsWithRoles = RegisterModel & {
  roleIds?: number[]
}

export interface UserTokenInfo {
  id: number;
  username: string;
}