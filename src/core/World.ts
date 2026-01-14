import Entity from "./Entity"

type EntityConstructor<T extends Entity> = new (...args: any[]) => T

export default class World {
  private readonly entities: Entity[] = []

  constructor(
    private readonly _width: number,
    private readonly _height: number
  ) {}

  addEntity(entity: Entity) {
    this.entities.push(entity)
  }

  removeEntity(entity: Entity) {
    const index = this.entities.indexOf(entity)
    if (index >= 0) {
      this.entities.splice(index, 1)
    }
  }

  clear() {
    this.entities.length = 0
  }

  getEntities(): readonly Entity[] {
    return this.entities
  }

  getEntitiesSnapshot(): Entity[] {
    return [...this.entities]
  }

  getEntitiesOfType<T extends Entity>(ctor: EntityConstructor<T>): T[] {
    return this.entities.filter((entity): entity is T => entity instanceof ctor)
  }

  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }
}
