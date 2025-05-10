import { Router } from "express"
import { handleUserRegister, handleUserLogin, handleGetUser } from "../controllers/user.controller.js"
import { verifyAuth } from '../middleware/auth.middleware.js'
const router = Router()


router.route('/register').post(handleUserRegister)
router.route('/login').post(handleUserLogin)
router.route('/get-info').get(verifyAuth, handleGetUser)

export default router