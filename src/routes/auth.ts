import Router from '@koa/router'

const router = new Router({
  prefix: '/auth'
})

router.get('/test', async ctx => {
  ctx.body = 'auth test router'
})

export default router