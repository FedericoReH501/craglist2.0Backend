import { Types, HydratedDocument } from "mongoose"
import {
  CompletedRoutesType,
  Credentials,
  UserType,
  WorkInProgType,
} from "../types/user"
import jwt, { Secret } from "jsonwebtoken"
const { User } = require("../models/userModel")
const bcrypt = require("bcrypt")

const login = async (credential: Credentials) => {
  const { username, password } = credential
  try {
    const foundUser: HydratedDocument<UserType> = await User.findOne({
      username,
    })
      .populate({
        path: "completedRoutes",
        populate: { path: "route", model: "Route" },
      })
      .populate({
        path: "workInProg",
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
      level: foundUser.level,
      favoritesRegions: foundUser.favoritesRegions,
      favoritesCrags: foundUser.favoritesCrags,
      workInProg: foundUser.workInProg,
      completedRoutes: foundUser.completedRoutes,
      id: foundUser._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET as Secret)
    return { ...userForToken, token }
  } catch (error) {
    throw error
  }
}

const addCompletedRoute = async (
  filter: Types.ObjectId,
  newRoute: CompletedRoutesType
) => {
  try {
    console.log("completed route service........filter: ", filter)
    const userUpdate = await User.findOneAndUpdate(
      { _id: filter },
      { $push: { completedRoutes: newRoute } },
      {
        new: true,
      }
    )
    console.log("user is updated", userUpdate)
    return userUpdate
  } catch (error) {
    throw new Error(error)
  }
}

const removeCompletedRoute = async (
  filter: Types.ObjectId,
  toRemoveRoute: HydratedDocument<CompletedRoutesType>
) => {
  try {
    console.log("removing...")
    const userUpdate = await User.findOneAndUpdate(
      { _id: filter },
      { $pull: { completedRoutes: { route: toRemoveRoute.route } } },
      {
        new: true,
      }
    )
    return userUpdate
  } catch (error) {
    throw new Error(error)
  }
}

const addWIPRoute = async (
  filter: Types.ObjectId,
  newRoute: HydratedDocument<WorkInProgType>
) => {
  try {
    console.log("completed route service........filter: ", filter)
    const userUpdate = await User.findOneAndUpdate(
      { _id: filter },
      { $push: { completedRoutes: newRoute } },
      {
        new: true,
      }
    )
    console.log("user is updated", userUpdate)
    return userUpdate
  } catch (error) {
    throw new Error(error)
  }
}

const removeWIPRoute = async (
  filter: Types.ObjectId,
  toRemoveRoute: HydratedDocument<WorkInProgType>
) => {
  try {
    console.log("removing...")
    const userUpdate = await User.findOneAndUpdate(
      { _id: filter },
      { $pull: { completedRoutes: { route: toRemoveRoute.route } } },
      {
        new: true,
      }
    )
    return userUpdate
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  login,
  addCompletedRoute,
  removeCompletedRoute,
  addWIPRoute,
  removeWIPRoute,
}
