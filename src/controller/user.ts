import errInfo from "../constants/errInfo"
import { RegisterModel } from "../db/models/user"
import { getUserInfo } from "../services/auth"
import { allocUserRoleService, destroyUserRoleByUserID, getAllUserService, removeUserService, updateUserService } from "../services/user"
import { createErrorResponse, SuccessResponse } from "../utils/Response"
import { RegisterPropsWithRoles } from "./types"

const {
  updateUserExistFailInfo,
  getUserListFailInfo,
  allocUserRoleFailInfo,
  deleteUserInfoFailInfo
} = errInfo

export interface WhereQuery {
  name: string,
  status: number,
  mobile: string
}

export interface UserListParams {
  offset: number,
  limit: number,
  query: Record<string, any>
}

// 获取全部用户列表
export const getAllUserController = async ({ offset, limit, query }: UserListParams) => {
  try {
    const result = await getAllUserService(offset, limit, query)
    return new SuccessResponse(result)
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(getUserListFailInfo)
  }
}

// 更改用户信息
export const updateUserController = async (id: number, data: RegisterPropsWithRoles) => {
  const {
    username,
    email,
    mobile,
    description,
    status,
    roleIds
  } = data
  console.log('roleIds', roleIds)

  // 判断修改后的用户名是否唯一
  const userInfo = await getUserInfo({ username })
  if (userInfo && userInfo.id !== id) {
    return createErrorResponse(updateUserExistFailInfo)
  }
  try {
    await updateUserService(id, {
      username,
      email,
      mobile,
      description,
      status
    } as RegisterModel)
    await allocUserRoleController(id, roleIds)
    return new SuccessResponse(null, '用户信息修改成功')
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(getUserListFailInfo)
  }
}

export const allocUserRoleController = async (id: number, roles: number[] = []) => {
  // 移除之前该用户与角色记录
  await destroyUserRoleByUserID(id)
  try {
    await allocUserRoleService(id, roles)
    return new SuccessResponse(null, '用户角色分配成功')
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(allocUserRoleFailInfo)
  }
}

// 删除用户信息
export const removeUserController = async (id: number) => {
  try {
    await removeUserService(id)
    return new SuccessResponse(null, '用户删除成功')
  } catch(error) {
    console.log(error.message)
    return createErrorResponse(deleteUserInfoFailInfo)
  }
}