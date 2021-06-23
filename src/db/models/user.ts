import {
  Model,
  DataTypes,
  Optional
} from 'sequelize'
import seq from '../seq'

export interface UserModelProps {
  id: number,
  username: string,
  password: string,
  email: string | null,
  mobile: string | null,
  avatar: string,
  isSuper: 0 | 1,
  status: 0 | 1
}

// 注册接口params类型  id和isSuper创建时候可以不用定义自动分配
export type RegisterModel = Omit<UserModelProps, 'id' | 'isSuper'>

interface UserCreationAttributes extends Optional<UserModelProps, "id" | "isSuper" | "status" | "avatar"> {}

interface UserInstance extends Model<UserModelProps, UserCreationAttributes>, UserModelProps {}

// 创建User模型，表名为User
const User = seq.define<UserInstance>('User', {
  id: { // id会自动创建并设为主键、自增
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户名'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码'
  },
  email: {
    type: DataTypes.STRING,
    comment: '用户邮箱'
  },
  mobile: {
    type: DataTypes.STRING,
    comment: '手机号'
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '头像'
  },
  isSuper: {
    type: DataTypes.BOOLEAN,
    comment: '超级管理员 1是 0否',
    defaultValue: 0
  },
  status: {
    type: DataTypes.BOOLEAN,
    comment: '账户状态 1正常 0禁用',
    defaultValue: 1
  }
})

export default User