import {Router} from "express"
import {UserController} from "./user.controller"
import {authMiddleware} from "../../middleware/auth.middleware"

const router = Router()
const controller = new UserController()

router.post('/register', controller.register)
router.post('/login', controller.login)

router.get('/:id', authMiddleware, controller.getById)
router.get('/', authMiddleware, controller.getAll)

router.patch('/block/:id', authMiddleware, controller.block)
router.patch('/unblock/:id', authMiddleware, controller.unblock)


export default router