import errInfo from "../constants/errInfo";
import { RoleModelProps } from "../db/models/role";
import { createRole, getAllRoles, getRole, removeRoleById, updateRoleById } from "../services/roles";
import { createErrorResponse, SuccessResponse } from "../utils/Response";

const {
  addRoleFailInfo,
  addRoleNameExistInfo,
  updateRoleFailInfo,
  updateRoleNameExistInfo,
  removeRoleFailInfo
} = errInfo

// 添加角色
export const addRoleController = async (params: RoleModelProps) => {
  const result = await getRole(params.name)
  if (result) {
    return createErrorResponse(addRoleNameExistInfo)
  }
  if (params) {
    try {
      const result = await createRole({
        ...params
      })
      return new SuccessResponse(result)
    } catch (e) {
      console.log(e.message)
      return createErrorResponse(addRoleFailInfo)
    }
  }
}

// 获取全部角色
interface RoleListParams {
  offset: number;
  limit: number;
}
export const getAllRoleController = async ({ offset, limit }: RoleListParams) => {
  try {
    const result = await getAllRoles(offset, limit)
    return new SuccessResponse(result)
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(updateRoleFailInfo)
  }
}

// 编辑角色
export const updateRoleController = async (id: number, data: RoleModelProps) => {
  const result = await getRole(data.name || '')
  if (result && result.id !== id) {
    return createErrorResponse(updateRoleNameExistInfo)
  }
  try {
    await updateRoleById(id, data)
    return new SuccessResponse('null', '角色编辑成功')
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(updateRoleFailInfo)
  }
}

// 删除角色
export const removeRoleController = async (id: number) => {
  try {
    await removeRoleById(id)
    return new SuccessResponse('null', '删除成功')
  } catch(error) {
    console.log(error.message)
    return createErrorResponse(removeRoleFailInfo)
  }
}