import { Types } from "mongoose"
import { UserType } from "../types/user"

const { User } = require("../models/userModel")
const JsonWebTokenError = require("jsonwebtoken")

const requestLogger = (
  request: { method: any; path: any; body: any },
  _response: any,
  next: () => void
) => {
  console.log("Request recieved:")
  console.log("Method", request.method)
  console.log("Path", request.path)
  console.log("Body", request.body)
  console.log("--------")
  next()
}

const unknownEndpoint = (_req: any, response: any) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const tokenExtractor = (request: any, _response: unknown, next: () => void) => {
  const authorization = request.get("Authorization")

  if (authorization instanceof String && typeof authorization === "string") {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      request.token = null
      next()
    }
    request.token = authorization.replace("Bearer ", "")
  }

  next()
}
const userExtractor = async (request: any, response: any, next: () => void) => {
  const decodedToken = JsonWebTokenError.verify(
    request.token,
    process.env.SECRET
  )
  if (decodedToken && "id" in decodedToken && decodedToken.id) {
    const userId: Types.ObjectId = decodedToken.id
    const user: UserType = await User.findById(userId)
    request.user = user
  } else {
    response.status(401).json({ error: "invalid token" })
  }

  next()
}

export default { requestLogger, unknownEndpoint, userExtractor, tokenExtractor }
