import Koa from 'koa'
import cors from '@koa/cors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import authRoutes from './routes/auth'

const app = new Koa()

// middlewares
app.use(cors())
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(logger())

app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

const port = process.env.PORT || '3000'
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})

app.on('error', (err) => {
  console.error('server error', err)
})