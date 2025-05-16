import { Router } from 'express'
import { handleTodo, handleCompleteTodo, handleDeleteTodo } from '../controllers/todo.controller.js'
import { verifyAuth } from '../middleware/auth.middleware.js'
const router = Router()

router.use(verifyAuth)

router.route('/create-todo').post(handleTodo)
router.route('/complete/:todoId').patch(handleCompleteTodo)
router.route('/delete/:todoId').delete(handleDeleteTodo)

export default router