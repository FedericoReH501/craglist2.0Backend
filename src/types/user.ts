import { Model, Types } from "mongoose"

export interface CompletedRoutesType {
  crag: string
  sector: string
  route: string
  completionType: "onSight" | "flash" | "normal"
  completionDate: string
}

export type WorkInProgType = Pick<
  CompletedRoutesType,
  "sector" | "completionDate" | "completionType"
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

export type UserModel = Model<UserType>

export type NewUserType = Omit<
  UserType,
  | "passwordHash"
  | "workInProg"
  | "completedRoutes"
  | "favoritesCrags"
  | "favoritesRegions"
> & { password: string }
