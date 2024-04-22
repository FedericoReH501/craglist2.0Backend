import { Request, Response } from "express"
import { NewUserType, UserType } from "../types/user"
import { AuthRequest, DecodedToken } from "../utils/middleware"
import userServices from "../services/userServices"
import { toNewUser } from "../validation/userValidation"
const bcrypt = require("bcrypt")

const { User } = require("../models/userModel")

export const createUser = async (req: Request, res: Response) => {
  const body: Request["body"] = req.body
  try {
    const newUser = toNewUser(body)
    const passwordHash: string = await bcrypt.hash(newUser.password, 10)
    let user: UserType = {
      ...newUser,
      passwordHash,
    }

    const createdUser = new User(user)

    const savedUser = await createdUser.save()

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

export const removeCompletedRoute = async (req: Request, res: Response) => {
  try {
    console.log("removing route......")
    const token = (req as AuthRequest).token as DecodedToken
    const updatedUser = await userServices.removeCompletedRoute(
      token.id,
      req.body
    )
    console.log("completed!! , removed:", updatedUser)
    res.status(200).send(updatedUser)
    /** must validate due to type assertion */
  } catch (error) {
    res.status(400)
  }
}

export const insertWIPRoute = async (req: Request, res: Response) => {
  try {
    const token = (req as AuthRequest).token as DecodedToken
    const updatedUser = await userServices.addWIPRoute(token.id, req.body)
    res.status(200).send(updatedUser)
    /** must validate due to type assertion */
  } catch (error) {
    res.status(400).send(error)
  }
}

export const removeWIPRoute = async (req: Request, res: Response) => {
  try {
    console.log("removing route......")
    const token = (req as AuthRequest).token as DecodedToken
    const updatedUser = await userServices.removeWIPRoute(token.id, req.body)

    res.status(200).send(updatedUser)
    /** must validate due to type assertion */
  } catch (error) {
    res.status(400).send(error)
  }
}
