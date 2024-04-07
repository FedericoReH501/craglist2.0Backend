import { Request, Response } from "express"
import { NewUserType, UserType } from "../types/user"
const bcrypt = require("bcrypt")

const { User } = require("../models/userModel")

export const createUser = async (req: Request, res: Response) => {
  const body: NewUserType = req.body
  try {
    if (!("email" in body)) throw new Error("email malformatted")
    if (!("username" in body)) throw new Error("username malformatted")
    if (!("password" in body)) throw new Error("password malformatted")
    if (body.password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 caracters" })
    }
    if (!("name" in body)) throw new Error("name malformatted")
    if (!("level" in body)) throw new Error("level malformatted")

    const { username, password, name, level, email } = body

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
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message)
  }
}
