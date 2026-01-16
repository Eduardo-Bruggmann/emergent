import type World from "./World"

export type Vector2 = { x: number; y: number }

export type EntityContext<TState> = {
  world: World
  entity: Entity<TState>
  state: TState
}

export type EntityBehavior<TState> = {
  decide?: (context: EntityContext<TState>) => void
  act?: (context: EntityContext<TState>) => void
  update?: (context: EntityContext<TState>) => void
}

export type EntityProps<TState> = {
  kind: string
  x: number
  y: number
  radius?: number
  color?: string
  state: TState
  behavior: EntityBehavior<TState>
}

export default class Entity<TState = unknown> {
  private static nextId = 1

  private readonly _id: number
  private _x: number
  private _y: number
  private _radius: number
  private _color: string
  private alive = true
  private readonly behavior: EntityBehavior<any>
  private readonly _kind: string
  private readonly stateData: any

  constructor({
    x,
    y,
    radius = 10,
    color = "#ff0000",
    state,
    behavior,
    kind,
  }: EntityProps<TState>) {
    this._id = Entity.nextId++
    this._x = x
    this._y = y
    this._radius = radius
    this._color = color
    this.behavior = behavior as EntityBehavior<any>
    this._kind = kind
    this.stateData = state
  }

  update(world: World) {
    if (!this.alive) return

    const context: EntityContext<TState> = {
      world,
      entity: this as Entity<TState>,
      state: this.stateData as TState,
    }

    const behavior = this.behavior as EntityBehavior<TState>
    behavior.decide?.(context)
    behavior.act?.(context)
    behavior.update?.(context)
  }

  kill() {
    this.alive = false
  }

  revive() {
    this.alive = true
  }

  get isAlive(): boolean {
    return this.alive
  }

  get id(): number {
    return this._id
  }

  get kind(): string {
    return this._kind
  }

  get state(): TState {
    return this.stateData as TState
  }

  mutateState(mutator: (state: TState) => void) {
    mutator(this.stateData as TState)
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
