import { Schema, model } from "mongoose"

const routeSchema = new Schema({
  name: { type: String },
  grade: { type: String },
})
routeSchema.set("toJSON", {
  transform: (_document: any, returnedObject: { __v: any }) => {
    delete returnedObject.__v
  },
})
const Route = model("Route", routeSchema)

const sectorSchema = new Schema({
  sectorName: { type: String },
  vie: [{ type: Schema.Types.ObjectId, ref: "Route" }],
})

routeSchema.set("toJSON", {
  transform: (_document: any, returnedObject: { __v: any }) => {
    delete returnedObject.__v
  },
})

const Sector = model("Sector", sectorSchema)

const cragSchema = new Schema({
  name: String,
  region: String,
  sectors: [{ type: Schema.Types.ObjectId, ref: "Sector" }],
  distance: Number,
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  access: String,
  exposure: String,
  kind: String,
  parkingLocation: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
})

cragSchema.index({ location: "2dsphere" })
cragSchema.index({ parkingLocation: "2dsphere" })
cragSchema.set("toJSON", {
  transform: (_document: any, returnedObject: { __v: any }) => {
    delete returnedObject.__v
  },
})

const Crag = model("Crag", cragSchema)

module.exports = { Crag, Route, Sector, sectorSchema, routeSchema }
