import Koa from 'koa'
import cors from '@koa/cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import authRoutes from './routes/auth'
import jwt from 'koa-jwt'
import { jwtSecret } from './config/auth'

const app = new Koa()

// middlewares
app.use(cors())
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(logger())

// 自定义401错误
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: '未登录/token失效'
      }
    } else {
      ctx.throw(err)
    }
  })
})

// token验证，header中为携带token，直接返回401
app.use(jwt(({ secret: jwtSecret })).unless({
  // 白名单
  path: ['/api/auth/login', '/api/auth/register']
}))

app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

const port = process.env.PORT || '3000'
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})

app.on('error', (err) => {
  console.error('server error', err)
})