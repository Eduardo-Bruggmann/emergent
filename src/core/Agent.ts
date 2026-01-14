import Entity from "./Entity"
import type World from "./World"

export default abstract class Agent extends Entity {
  private alive = true

  protected abstract decide(world: World): void

  protected abstract act(world: World): void

  update(world: World) {
    if (!this.alive) return

    this.decide(world)
    this.act(world)
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
}
