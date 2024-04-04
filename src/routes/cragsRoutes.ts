import express from "express"
import { CragType } from "../types/crag"
const { Crag } = require("../models/cragsModel")
const cragsRouter = express.Router()

cragsRouter.get("/", async (request, response) => {
  try {
    if (request.query.regions && typeof request.query.regions === "string") {
      const requestedRegions: string[] = request.query.regions.split(",")
      const crags: CragType[] = await Crag.find({
        region: { $in: requestedRegions },
      }).populate({
        path: "sectors",
        populate: {
          path: "vie",
          model: "Route",
        },
      })

      if (crags.length === 0) {
        throw new Error("no region found...")
      }
      response.status(200).json(crags)
    } else {
      throw new Error("Empty or malformatted request")
    }
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).send(error.message)
      console.error("crags not found: ", error.message)
    }
  }
})

export default cragsRouter
