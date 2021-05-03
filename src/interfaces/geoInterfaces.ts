export type Position = [longitude: number, latitude: number, elevation?: number]

export interface IPoint {
  type: "Point"
  coordinates: Position
}

export interface IGeoPolygon {
  type: "Polygon",
  coordinates: Position[][][]
}