import { Request, Response } from "express"
import { NewUserType, UserType } from "../types/user"
import { AuthRequest, DecodedToken } from "../utils/middleware"
import userServices from "../services/userServices"
const bcrypt = require("bcrypt")

const { User } = require("../models/userModel")

export const createUser = async (req: Request, res: Response) => {
  const body: NewUserType = req.body
  try {
    if (!("email" in body)) throw new Error("email malformatted")
    if (!("username" in body)) throw new Error("username malformatted")
    if (!("password" in body)) throw new Error("password malformatted")
    if (body.password.length < 6) throw new Error("password is too short")
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

export const insertCompletedRoute = async (req: Request, res: Response) => {
  try {
    const token = (req as AuthRequest).token as DecodedToken
    const updatedUser = await userServices.addCompletedRoute(token.id, req.body)
    console.log("completed!! , user added:", updatedUser)
    res.status(200).send(updatedUser)
    /** must validate due to type assertion */
  } catch (error) {
    res.status(400)
  }
}
