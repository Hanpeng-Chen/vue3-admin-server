import Router from '@koa/router'
import { addAccessController, getAccessAllController, removeAccessController, updateAccessController, updateBulkAccessController } from '../controller/access'

const router = new Router({
  prefix: '/api/access'
})

// 添加菜单
router.post('/menu', async (ctx) => {
  ctx.body = await addAccessController(ctx.request.body as any)
})

// 获取菜单
router.get('/menus', async ctx => {
  ctx.body = await getAccessAllController()
})

// 删除某一个菜单
router.delete('/menu/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await removeAccessController(Number(id))
})

// 编辑菜单
router.put('/menu/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await updateAccessController(Number(id), ctx.request.body as any)
})

// 批量更新
router.patch('/menu/update', async ctx => {
  const { access } = ctx.request.body as any
  ctx.body = await updateBulkAccessController(access)
})

export default router