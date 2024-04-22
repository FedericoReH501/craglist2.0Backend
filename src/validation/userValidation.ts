import { Request } from "express"
import { CompletedRoutesType, NewUserType } from "../types/user"

export const toNewUser = (body: Request["body"]): NewUserType => {
  const {
    username,
    name,
    level,
    surname,
    email,
    password,
    region,
    favoritesRegions,
  } = body

  // Check if all required fields are present
  if (
    !username ||
    !name ||
    !surname ||
    !email ||
    !password ||
    !region ||
    level
  ) {
    throw new Error("Missing required fields")
  }

  // Check for minimum length of username
  if (typeof username !== "string" || username.length < 5)
    throw new Error("Username must be a string of at least 5 characters long")

  // Check for valid email format (basic regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== "string" || !emailRegex.test(email))
    throw new Error("Invalid email format")

  // You can add more validation checks for other fields as needed
  if (typeof password !== "string" || username.length < 6)
    throw new Error("Password must be at least 6 characters long")

  if (typeof region !== "string") throw new Error("malformatted region")
  if (typeof level !== "number") throw new Error("malformatted level")

  // Create and return the NewUserType object
  return {
    username,
    name,
    surname,
    level,
    email,
    password,
    region,
    favoritesRegions: favoritesRegions || [],
    favoritesCrags: [],
    completedRoutes: [],
    workInProg: [],
  }
}

export const toCompletedRoute = (
  body: Request["body"]
): CompletedRoutesType => {
  // Assuming CompletedRoutesType is the type for your completed route data

  // Add necessary validation and type checks here
  if (
    !("route" in body) ||
    !("crag" in body) ||
    !("sector" in body) ||
    !("completionType" in body) ||
    !("completionDate" in body)
  ) {
    throw new Error("missing route data")
  }
  if (
    typeof body.route !== "string" ||
    typeof body.crag !== "string" ||
    typeof body.sector !== "string"
  ) {
    throw new Error("Invalid route data")
  }

  return {
    route: body.route,
    crag: body.crag,
    sector: body.sector,
    completionType: body.completionType,
    completionDate: body.completionDate || new Date(),
  }
}
