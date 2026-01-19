import type World from "./World"

export type Position = { x: number; y: number }

export interface AgentContext<TState> {
  world: World
  agent: Agent<TState>
}

export interface AgentBehavior<TState> {
  decide?: (context: AgentContext<TState>) => void
  act?: (context: AgentContext<TState>) => void
  update?: (context: AgentContext<TState>) => void
}

export interface AgentProps<TState> {
  x: number
  y: number
  radius: number
  color: string
  kind: string
  state: TState
  behavior: AgentBehavior<TState>
}

export default class Agent<TState> {
  private static nextId = 1

  private readonly _id: number
  private _x: number
  private _y: number
  private _radius: number
  private _color: string
  private alive = true
  private readonly _kind: string
  private readonly _state: TState
  private readonly behavior: AgentBehavior<TState>

  constructor(props: AgentProps<TState>) {
    this._id = Agent.nextId++
    this._x = props.x
    this._y = props.y
    this._radius = props.radius
    this._color = props.color
    this._kind = props.kind
    this._state = props.state
    this.behavior = props.behavior
  }

  update(world: World) {
    if (!this.alive) return

    const context: AgentContext<TState> = {
      world,
      agent: this,
    }

    const behavior = this.behavior
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

  translate(dx: number, dy: number) {
    this._x += dx
    this._y += dy
  }

  distanceTo(other: Agent<any>): number {
    return Math.hypot(this._x - other._x, this._y - other._y)
  }

  /**
   * TState is mutable by contract.
   * Behaviors should mutate state only here.
   */
  mutateState(mutator: (state: TState) => void) {
    mutator(this._state)
  }

  get id(): number {
    return this._id
  }

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  get position(): Position {
    return { x: this._x, y: this._y }
  }

  setPosition(x: number, y: number) {
    this._x = x
    this._y = y
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

  get isAlive(): boolean {
    return this.alive
  }

  get kind(): string {
    return this._kind
  }

  get state(): Readonly<TState> {
    return this._state
  }
}
