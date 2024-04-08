import express from "express"

const userRouter = express.Router()

import { loginController } from "../controllers/loginController"
import {
  createUser,
  insertCompletedRoute,
} from "../controllers/userControllers"
import middleware from "../utils/middleware"

userRouter.post("/login", loginController)

userRouter.post("/createuser", createUser)

userRouter.put(
  "/update/completedRoutes",
  middleware.authenticate,
  insertCompletedRoute
)

export default userRouter
