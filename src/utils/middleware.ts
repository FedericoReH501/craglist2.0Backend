import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { Types } from "mongoose"
export interface DecodedToken {
  username: string
  id: Types.ObjectId
}
export interface AuthRequest extends Request {
  token: JwtPayload | string
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

const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    console.log("in authentication middleware.....")
    const authorization = request.header("Authorization")
    if (
      !authorization ||
      !(typeof authorization === "string") ||
      !authorization.startsWith("Bearer ")
    )
      throw new Error()

    const token = authorization.replace("Bearer ", "")
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET as Secret
    ) as DecodedToken
    ;(request as AuthRequest).token = decodedToken as DecodedToken
  } catch (error) {
    response.status(401).send("Please authenticate")
  }

  next()
}

export default { requestLogger, unknownEndpoint, authenticate }
