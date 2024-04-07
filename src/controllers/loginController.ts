import { Request, Response } from "express"
import userServices from "../services/userServices"

export interface LoginRequestBody {
  username: string
  password: string
}

export const loginController = async (req: Request, res: Response) => {
  const body: LoginRequestBody = req.body

  try {
    const loggedUser = await userServices.login(body)
    res.status(200).send(loggedUser)
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message)
  }
}
