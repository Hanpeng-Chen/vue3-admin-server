import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('vue3-admin', 'root', 'admin123', {
  host: 'localhost',
  dialect: 'mysql', // 什么类型的数据库
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000 // 一个连接池10s内，没有被使用则释放
  }
})

export default sequelize