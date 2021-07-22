import Router from '@koa/router'
import { loginController, registerController } from '../controller/auth'
import { RegisterModel } from '../db/models/user'

const router = new Router({
  prefix: '/api/auth'
})

/**
 * 用户注册接口
 * /auth/register
 */
router.post('/register', async ctx => {
  ctx.body = await registerController(ctx.request.body as RegisterModel)
})

// 登录接口
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  ctx.body = await loginController({ username, password })
})

export default router