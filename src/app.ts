import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import middleware from "./utils/middleware"
import cragsRouter from "./routers/cragsRoutes"
import pingRouter from "./routers/pingRoutes"
import loginRouter from "./routers/loginRoutes"
require("dotenv").config()

const app = express()
const mongoUrl = process.env.MONGO_URI

if (!mongoUrl || typeof mongoUrl !== "string") {
  console.log("mongoUrl: ", mongoUrl)
  throw new Error("Mogo's Url problem, impossible to fetch datas from database")
}
mongoose.set("strictQuery", false)
mongoose
  .connect(mongoUrl)
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/ping", pingRouter)
app.use("/crags", cragsRouter)
app.use("/crags/login", loginRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
