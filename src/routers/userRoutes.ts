import express from "express"

const userRouter = express.Router()

import { loginController } from "../controllers/loginController"
import {
  createUser,
  insertCompletedRoute,
  removeCompletedRoute,
} from "../controllers/userControllers"
import middleware from "../utils/middleware"

userRouter.post("/login", loginController)

userRouter.post("/createuser", createUser)

userRouter.put(
  "/update/completedRoutes/add",
  middleware.authenticate,
  insertCompletedRoute
)
userRouter.put(
  "/update/completedRoutes/remove",
  middleware.authenticate,
  removeCompletedRoute
)

export default userRouter
