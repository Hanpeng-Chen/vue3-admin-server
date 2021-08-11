import Router from '@koa/router'
import { RegisterPropsWithRoles } from '../controller/types'
import { allocUserRoleController, getAllUserController, removeUserController, updateUserController } from '../controller/user'

const router = new Router({
  prefix: '/api/user'
})

// 获取用户列表
router.get('/', async ctx => {
  const { pageNum = 0, pageSize = 10, ...query } = ctx.request.query
  ctx.body = await getAllUserController({
    offset: Number(pageNum),
    limit: Number(pageSize),
    query
  })
})

// 编辑用户
router.put('/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await updateUserController(Number(id), ctx.request.body as RegisterPropsWithRoles)
})

// 给用户分配角色
router.post('/role/:id', async ctx => {
  const {id} = ctx.params
  const { roles } = ctx.request.body as any
  ctx.body = await allocUserRoleController(Number(id), roles)
})

// 删除用户
router.delete('/:id', async ctx => {
  const {id} = ctx.params
  ctx.body = await removeUserController(Number(id))
})

export default router