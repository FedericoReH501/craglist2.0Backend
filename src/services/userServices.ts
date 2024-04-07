import { Credentials } from "../types/user"
import jwt, { Secret } from "jsonwebtoken"
const { User } = require("../models/userModel")
const bcrypt = require("bcrypt")

const login = async (credential: Credentials) => {
  const { username, password } = credential
  try {
    const foundUser = await User.findOne({
      username,
    }).populate({
      path: "completedRoutes",
      populate: { path: "route", model: "Route" },
    })
    if (!foundUser) {
      throw new Error("incorrect username")
    }

    const passwordCorrect: boolean =
      foundUser === null
        ? false
        : await bcrypt.compare(password, foundUser.passwordHash)

    if (!passwordCorrect) {
      throw new Error("incorrect password")
    }
    const userForToken = {
      username,
      id: foundUser._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET as Secret)
    return { ...userForToken, token }
  } catch (error) {
    throw error
  }
}

export default { login }
