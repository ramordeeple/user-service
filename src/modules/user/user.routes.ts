import {Router} from "express";
import {UserController} from "./user.controller";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router()
const controller = new UserController()

router.post('/register', controller.register)
router.post('/login', controller.login)

router.patch('/block/:id', authMiddleware, controller.block)

export default router;