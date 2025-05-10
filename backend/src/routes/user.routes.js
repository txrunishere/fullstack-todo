import { Router } from "express"
import { handleUserRegister } from "../controllers/user.controller.js" 
const router = Router()


router.route('/register').post(handleUserRegister)


export default router