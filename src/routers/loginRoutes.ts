import express from "express"
import { HydratedDocument } from "mongoose"
import { UserType } from "../types/user"
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const { User } = require("../models/userModel")

const loginRouter = express.Router()

export interface LoginRequestBody {
  username: string
  password: string
}

loginRouter.post("/", async (req, res) => {
  const body: LoginRequestBody = req.body
  try {
    if ("username" in body && "password" in body) {
      const { username, password } = body
      console.log(username, password)
      const user: HydratedDocument<UserType> = await User.findOne({
        username,
      }).populate({
        path: "completedRoutes",
        populate: { path: "route", model: "Route" },
      })
      const passwordCorrect: boolean =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash)
      if (!passwordCorrect || !user) {
        throw new Error("incorrect username or password")
      }
      const userForToken = {
        username,
        id: user._id,
      }
      const token: string = jsonwebtoken.sign(userForToken, process.env.SECRET)
      res.status(200).send({ token, ...user })
    } else {
      throw new Error("malformatted body in login request")
    }
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message)
  }
})

export default loginRouter
