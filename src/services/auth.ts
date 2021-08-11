import { RoleModel, UserRoleModel } from "../db/models"
import UserModel, { RegisterModel, UserModelProps } from "../db/models/user"
import { createMD5 } from "../utils/createMD5"
import { UserInfo, UserWhereProps } from './types'

export const createUser = async ({username, password, email, mobile, status, avatar, description}: RegisterModel) => {
  const result = await UserModel.create({
    username,
    password,
    email,
    mobile,
    status,
    avatar,
    description
  })
  return result.toJSON() as UserModelProps
}

export const getUserInfo = async ({username, password, id}: UserWhereProps): Promise<UserModelProps | null> => {
  const where: UserWhereProps = {
    username
  }
  if (password) {
    where.password = createMD5(password)
  }
  if (typeof id != 'undefined') {
    where.id = id
  }
  const result = await UserModel.findOne({
    attributes: {
      exclude: ['password', 'createAt', 'updateAt']
    },
    where
  })
  if (result == null) return null
  return result.toJSON() as UserModelProps
}

export const getUserInfoAndRoles = async (id: number) =>{
  const result = await UserModel.findOne({
    attributes: ['id', 'username', 'email', 'mobile', 'isSuper', 'status', 'avatar', 'description'],
    where: {
      id
    },
    include: [
      // 联表查询
      {
        model: UserRoleModel,
        attributes: ['id'],
        include: [
          {
            model: RoleModel,
            attributes: ['id', 'name', 'description']
          }
        ]
      }
    ]
  })
  if (!result) return null
  const user = result.toJSON() as UserInfo
  user.roles = user.UserRoles?.map(item => item.Role)
  delete user.UserRoles
  return user
}