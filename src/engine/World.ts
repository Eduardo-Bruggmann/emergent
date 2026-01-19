import Agent from "./Agent"

export default class World {
  private readonly _agents: Agent<any>[] = []
  private readonly toAdd: Agent<any>[] = []
  private readonly toRemove: Agent<any>[] = []

  constructor(
    private readonly _width: number,
    private readonly _height: number,
  ) {}

  addEntity<TState>(agent: Agent<TState>) {
    this.toAdd.push(agent)
  }

  removeEntity<TState>(agent: Agent<TState>) {
    this.toRemove.push(agent)
  }

  update() {
    const snapshot = this._agents.slice()

    for (const agent of snapshot) {
      agent.update(this)
    }

    this.flush()
  }

  reset() {
    this._agents.length = 0
    this.toAdd.length = 0
    this.toRemove.length = 0
  }

  flush() {
    for (const e of this.toRemove) {
      const i = this._agents.indexOf(e)
      if (i >= 0) this._agents.splice(i, 1)
    }

    this._agents.push(...this.toAdd)
    this.toAdd.length = 0
    this.toRemove.length = 0
  }

  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }

  get agentsSnapshot(): readonly Agent<any>[] {
    return this._agents.slice()
  }

  getAgentsByKind<TState = unknown>(kind: string): readonly Agent<TState>[] {
    return this._agents.filter((e) => e.kind === kind) as Agent<TState>[]
  }
}
