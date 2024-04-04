const mongoose = require("mongoose")

const routeSchema = new mongoose.Schema({
  name: { type: String },
  grade: { type: String },
})
routeSchema.set("toJSON", {
  transform: (_document: any, returnedObject: { __v: any }) => {
    delete returnedObject.__v
  },
})
const Route = mongoose.model("Route", routeSchema)

const sectorSchema = new mongoose.Schema({
  sectorName: { type: String },
  vie: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
})

routeSchema.set("toJSON", {
  transform: (_document: any, returnedObject: { __v: any }) => {
    delete returnedObject.__v
  },
})

const Sector = mongoose.model("Sector", sectorSchema)

const cragSchema = mongoose.Schema({
  name: String,
  region: String,
  sectors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sector" }],
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

const Crag = mongoose.model("Crag", cragSchema)

module.exports = { Crag, Route, Sector, sectorSchema, routeSchema }
