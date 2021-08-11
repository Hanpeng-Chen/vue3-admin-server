import Router from '@koa/router'
import { addAccessController, getAccessAllController, removeAccessController, updateAccessController, updateBulkAccessController } from '../controller/access'

const router = new Router({
  prefix: '/api/access'
})

router.post('/menu', async (ctx) => {
  ctx.body = await addAccessController(ctx.request.body as any)
})

router.get('/menus', async ctx => {
  ctx.body = await getAccessAllController()
})

router.delete('/menu/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await removeAccessController(Number(id))
})

router.put('/menu/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await updateAccessController(Number(id), ctx.request.body as any)
})

router.patch('/menu/update', async ctx => {
  const { access } = ctx.request.body as any
  ctx.body = await updateBulkAccessController(access)
})

export default router