import Entity from "./Entity.js"

export default class Agent extends Entity {
  constructor(x, y) {
    super(x, y)
    this.alive = true
  }

  decide(world) {
    // TODO
  }

  act(world) {
    // TODO
  }

  update(world) {
    if (!this.alive) return

    this.decide(world)
    this.act(world)
  }
}
