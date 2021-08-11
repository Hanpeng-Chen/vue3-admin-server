import Sequelize from "sequelize";
import { AccessModel, RoleAccessModel, RoleModel } from "../db/models";
import { AccessRole } from "./types";

const Op = Sequelize.Op

// 删除与该角色相关联的记录
export const destroyRoleAccessByRoleId = async (id: number) => {
  const result = await RoleAccessModel.destroy({
    where: {
      role_id: id
    }
  })
  return result
}

// 添加与该角色相关联的记录
export const createRoleAccess = async (id: number, access: number[]) => {
  const records = access.map(aid => ({
    role_id: id,
    access_id: aid
  }))
  const result = await RoleAccessModel.bulkCreate(records)
  return result
}

// 获取与该角色相关联记录
export const getRoleAccessByRoleId = async (id: number) => {
  const result = await RoleAccessModel.findAll({
    attributes: ['id', 'role_id', 'access_id'],
    where: {
      role_id: id
    }
  })
  return result
}

export const getAccessByRolesService = async (roles: number[]) => {
  const { rows } = await AccessModel.findAndCountAll({
    distinct: true,
    order: [
      ['sort_id', 'ASC']
    ],
    include: [
      {
        model: RoleAccessModel,
        attributes: ['id'],
        where: {
          role_id: {
            [Op.in]: roles
          }
        },
        include: [
          {
            model: RoleModel,
            attributes: ['id', 'name', 'description']
          }
        ]
      }
    ]
  })
  const access = rows.map(row => {
    const ac = row.toJSON() as AccessRole
    ac.roles = ac.RoleAccess?.map(item => item.Role)
    delete ac.RoleAccess
    return ac
  })
  return {
    access
  }
}