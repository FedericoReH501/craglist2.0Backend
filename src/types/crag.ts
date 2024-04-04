export interface Route {
  name: string
  grade: string
}
export interface Sector {
  sectorName: string
  vie: Route[]
}
interface Location {
  type: string
  coordinates: number[]
}

export interface CragType {
  name: string
  region: string
  sectors: Sector[]
  distance: number
  location: Location
  access: String
  exposure: String
  kind: String
  parkingLocation: Location
}
