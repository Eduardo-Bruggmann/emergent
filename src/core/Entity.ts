import type World from "./World"

export type Vector2 = { x: number; y: number }

export default abstract class Entity {
  private static nextId = 1

  private readonly _id: number
  protected _x: number
  protected _y: number
  protected _radius: number
  protected _color: string

  protected constructor(x: number, y: number, radius = 10, color = "#ff0000") {
    this._id = Entity.nextId++
    this._x = x
    this._y = y
    this._radius = radius
    this._color = color
  }

  abstract update(world: World): void

  get id(): number {
    return this._id
  }

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  get position(): Vector2 {
    return { x: this._x, y: this._y }
  }

  setPosition(x: number, y: number) {
    this._x = x
    this._y = y
  }

  translate(dx: number, dy: number) {
    this._x += dx
    this._y += dy
  }

  get radius(): number {
    return this._radius
  }

  set radius(value: number) {
    this._radius = value
  }

  get color(): string {
    return this._color
  }

  set color(value: string) {
    this._color = value
  }

  distanceTo(other: Entity): number {
    return Math.hypot(this._x - other._x, this._y - other._y)
  }
}
