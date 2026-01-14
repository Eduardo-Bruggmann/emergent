import Agent from "@/core/Agent"
import Prey from "./Prey"
import type World from "@/core/World"

export default class Predator extends Agent {
  private target: Prey | null = null
  private readonly speed = 2.2

  constructor(x: number, y: number) {
    super(x, y, 8, "#ef4444")
  }

  protected decide(world: World) {
    const preys = world.getEntitiesOfType(Prey)

    if (preys.length === 0) {
      this.target = null
      return
    }

    this.target = preys.reduce<Prey | null>((closest, prey) => {
      const currentDistance = this.distanceTo(prey)
      const closestDistance = closest ? this.distanceTo(closest) : Infinity
      return currentDistance < closestDistance ? prey : closest
    }, null)
  }

  protected act(_world: World) {
    if (!this.target) return

    const dx = this.target.x - this.x
    const dy = this.target.y - this.y
    const magnitude = Math.hypot(dx, dy)

    if (magnitude === 0) return

    this.translate((dx / magnitude) * this.speed, (dy / magnitude) * this.speed)
  }
}
