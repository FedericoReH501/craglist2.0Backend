import { Document } from "mongoose"
import { UserType } from "../types/user"
import { NextFunction, Request, Response } from "express"

export interface RequestWToken extends Request {
  token: string
}
export interface RequestWUser extends RequestWToken {
  user: Document<UserType>
}
const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  console.log("Request recieved:")
  console.log("Method", request.method)
  console.log("Path", request.path)
  console.log("Body", request.body)
  console.log("--------")
  next()
}

const unknownEndpoint = (_req: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get("Authorization")

  if (typeof authorization === "string") {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      next()
    }
    ;(request as RequestWToken).token = authorization.replace("Bearer ", "")
  }

  next()
}

export default { requestLogger, unknownEndpoint, tokenExtractor }
