import errInfo from "../constants/errInfo";
import { AccessModelProps } from "../db/models/access";
import { createAccess, getAllAccess, removeAccessById, updateAccessById, updateBulkAccess } from "../services/access";
import { createErrorResponse, SuccessResponse } from "../utils/Response";

const {
  addAccessFailInfo,
  updateAccessFailInfo,
  removeAccessFailInfo,
  getAccessAllFailInfo
} = errInfo

// 添加菜单
export const addAccessController = async (params: AccessModelProps) => {
  if (params) {
    try {
      const result = await createAccess({
        ...params
      })
      return new SuccessResponse(result)
    } catch (error) {
      console.log(error.message)
      return createErrorResponse(addAccessFailInfo)
    }
  }
}

// 获取所有菜单
export const getAccessAllController = async () => {
  try {
    const result = await getAllAccess()
    return new SuccessResponse(result)
  } catch(error) {
    console.log(error.message)
    return createErrorResponse(getAccessAllFailInfo)
  }
}

// 删除菜单
export const removeAccessController = async (id: number) => {
  try {
    await removeAccessById(id)
    return new SuccessResponse(null, '删除成功')
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(removeAccessFailInfo)
  }
}

// 修改菜单
export const updateAccessController = async (id: number, data: AccessModelProps) => {
  try {
    await updateAccessById(id, data)
    return new SuccessResponse(null, '菜单更新成功')
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(updateAccessFailInfo)
  }
}

// 批量修改
export const updateBulkAccessController = async (data: AccessModelProps[]) => {
  try {
    await updateBulkAccess(data)
    return new SuccessResponse(null, '菜单批量更新成功')
  } catch (error) {
    console.log(error.message)
    return createErrorResponse(updateAccessFailInfo)
  }
}