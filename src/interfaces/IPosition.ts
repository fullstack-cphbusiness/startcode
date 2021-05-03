import { IPoint } from "./geoInterfaces"

export default interface IPosition {
  lastUpdated: Date,
  email: string,
  name: string,
  location: IPoint
}