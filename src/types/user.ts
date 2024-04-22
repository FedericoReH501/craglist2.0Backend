import { Model, Types } from "mongoose"

export interface CompletedRoutesType {
  crag: Types.ObjectId
  sector: Types.ObjectId
  route: Types.ObjectId
  completionType: "onSight" | "flash" | "normal"
  completionDate: string
}

export type WorkInProgType = Pick<
  CompletedRoutesType,
  "sector" | "completionDate" | "crag" | "route"
>

export interface UserType {
  username: string
  name: string
  surname?: string
  email: string
  passwordHash: string
  region: string
  level: number
  favoritesRegions: string[]
  favoritesCrags: Types.ObjectId[]
  completedRoutes: Types.ObjectId[]
  workInProg: Types.ObjectId[]
}

export interface Credentials {
  username: string
  password: string
}

export type UserModel = Model<UserType>

export type NewUserType = Omit<UserType, "passwordHash"> & { password: string }
