import Entity from "./Entity"

export default class World {
  private readonly _entities: Entity[] = []

  constructor(
    private readonly _width: number,
    private readonly _height: number
  ) {}

  addEntity(entity: Entity) {
    this._entities.push(entity)
  }

  removeEntity(entity: Entity) {
    const index = this._entities.indexOf(entity)
    if (index >= 0) {
      this._entities.splice(index, 1)
    }
  }

  clear() {
    this._entities.length = 0
  }

  getEntitiesByKind<TState = unknown>(kind: string): Entity<TState>[] {
    return this._entities.filter(
      (entity) => entity.kind === kind
    ) as Entity<TState>[]
  }

  get entities(): readonly Entity[] {
    return this._entities
  }

  get entitiesSnapshot(): Entity[] {
    return [...this._entities]
  }

  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }
}
