import express from "express"

const userRouter = express.Router()

import { loginController } from "../controllers/loginController"
import { createUser } from "../controllers/userControllers"

userRouter.post("/login", loginController)

userRouter.post("/createuser", createUser)

export default userRouter
