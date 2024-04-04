import express from "express"
import { NewUserType, UserType } from "../types/user"
const bcrypt = require("bcrypt")

const { User } = require("../models/userModel")

const userRouter = express.Router()

userRouter.post("/newUser", async (req, res) => {
  const body: NewUserType = req.body
  try {
    if (
      body instanceof Object &&
      body.email &&
      body.level &&
      body.name &&
      body.region &&
      body.username &&
      body.password
    ) {
      const { username, password, name, level, email } = body
      if (password.length < 6) {
        res.status(400).json({ error: "Password must be at least 6 caracters" })
      }
      const passwordHash: string = await bcrypt.hash(password, 10)

      let newUser: UserType = {
        username,
        passwordHash,
        name,
        level,
        email,
        region: body.region,
        favoritesCrags: [],
        workInProg: [],
        completedRoutes: [],
        favoritesRegions: [],
      }
      if (body.surname) {
        newUser = { ...newUser, surname: body.surname }
      }
      const user = new User({
        ...newUser,
      })

      const savedUser = await user.save()
      res.status(201).json(savedUser)
    } else {
      throw new Error("malformatted submition for new user")
    }
  } catch (error) {
    if (error instanceof Error) res.send(error.message)
  }
})

export default userRouter
