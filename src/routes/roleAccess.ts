import Router from '@koa/router'
import { addRoleAccessController, getAccessByRolesController, getRoleAccessController } from '../controller/roleAccess'

const router = new Router({
  prefix: '/api/roleAccess'
})

// 添加与角色相关的菜单
router.post('/:id', async ctx => {
  const { id } = ctx.params
  const { access } = ctx.request.body as any
  ctx.body = await addRoleAccessController(Number(id), access)
})

// 根据角色id获取关联菜单id
router.get('/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await getRoleAccessController(Number(id))
})

router.post('/role/access', async ctx => {
  const { roles } = ctx.request.body as any
  const ids = (roles as string[]).map(Number)
  ctx.body = await getAccessByRolesController(ids)
})

export default router