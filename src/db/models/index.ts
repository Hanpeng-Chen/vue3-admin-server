import UserModel from './user'
import AccessModel from './access'
import RoleModel from './role'
import RoleAccessModel from './roleAccess'
import UserRoleModel from './userRole'

// 外键关联 建立从属关系
;(() => {
  RoleAccessModel.belongsTo(RoleModel, {
    // 父表delete、update，子表同步delete、update关联记录
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  RoleAccessModel.belongsTo(AccessModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'access_id'
  })
  // 双向关联
  RoleModel.hasMany(RoleAccessModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  AccessModel.hasMany(RoleAccessModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'access_id'
  })

  UserRoleModel.belongsTo(UserModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'user_id'
  })
  UserRoleModel.belongsTo(RoleModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  RoleModel.hasMany(UserRoleModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'role_id'
  })
  UserModel.hasMany(UserRoleModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'user_id'
  })
})()

export {
  UserModel,
  AccessModel,
  RoleModel,
  RoleAccessModel,
  UserRoleModel
}