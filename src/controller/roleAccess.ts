import errInfo from "../constants/errInfo"
import { createRoleAccess, destroyRoleAccessByRoleId, getAccessByRolesService, getRoleAccessByRoleId } from "../services/roleAccess"
import { createErrorResponse, SuccessResponse } from "../utils/Response"

const {
  getRoleAccessFailInfo,
  allocRoleAccessFailInfo
} = errInfo

export const addRoleAccessController = async (id: number, access: number[]) => {
  // 先移除之前关联的记录
  await destroyRoleAccessByRoleId(id)
  try {
    // 批量插入记录
    await createRoleAccess(id, access)
    return new SuccessResponse(null, '权限分配成功')
  } catch(error) {
    console.log(error.message)
    return createErrorResponse(allocRoleAccessFailInfo)
  }
}

export const getRoleAccessController = async (id: number) => {
  try {
    const result = await getRoleAccessByRoleId(id)
    return new SuccessResponse(result)
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(getRoleAccessFailInfo)
  }
}

export const getAccessByRolesController = async (roles: number[]) => {
  try {
    const result = await getAccessByRolesService(roles)
    return new SuccessResponse(result)
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(getRoleAccessFailInfo)
  }
}