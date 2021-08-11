import Router from '@koa/router'
import { addRoleController, getAllRoleController, removeRoleController, updateRoleController } from '../controller/roles'

const router = new Router({
  prefix: '/api/role'
})

// 添加角色
router.post('/add', async ctx => {
  ctx.body = await addRoleController(ctx.request.body as any)
})

// 获取角色列表
router.get('/', async ctx => {
  const { pageNum = 0, pageSize = 10 } = ctx.request.body as any
  ctx.body = await getAllRoleController({
    offset: Number(pageNum),
    limit: Number(pageSize)
  })
})

// 编辑角色
router.put('/:id', async ctx => {
  const {id} = ctx.params
  ctx.body = await updateRoleController(Number(id), ctx.request.body as any)
})

// 删除角色
router.delete('/:id', async ctx => {
  const {id} = ctx.params
  ctx.body = await removeRoleController(Number(id))
})

export default router
