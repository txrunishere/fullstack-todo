import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors({
  origin: "http://localhost:3000"
}))

app.use(cookieParser())

import healthCheckRouter from './routes/healthcheck.routes.js'
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'

app.use('/api/v1/healthcheck', healthCheckRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)

export {
  app
}