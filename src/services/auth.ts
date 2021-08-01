import UserModel, { RegisterModel, UserModelProps } from "../db/models/user"
import { createMD5 } from "../utils/createMD5"
import { UserWhereProps } from './types'

export const createUser = async ({username, password, email, mobile, status, avatar}: RegisterModel) => {
  const result = await UserModel.create({
    username,
    password,
    email,
    mobile,
    status,
    avatar
  })
  return result.toJSON()
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