export default class World {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.entities = []
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  removeEntity(entity) {
    this.entities = this.entities.filter((e) => e !== entity)
  }

  getEntities() {
    return this.entities
  }
}
