import { Router } from 'express'
import { handleTodo } from '../controllers/todo.controller.js'
import { verifyAuth } from '../middleware/auth.middleware.js'
const router = Router()

router.use(verifyAuth)

router.route('/create-todo').post(handleTodo)

export default router