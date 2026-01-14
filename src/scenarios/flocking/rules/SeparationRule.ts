import Rule from "@/core/shared/Rule"
import Boid from "../Boid"
import type World from "@/core/World"

export default class SeparationRule extends Rule {
  constructor(private readonly radius = 25, private readonly strength = 1) {
    super()
  }

  apply(world: World) {
    const boids = world.getEntitiesOfType(Boid)

    for (const boid of boids) {
      let fx = 0
      let fy = 0
      let count = 0

      for (const other of boids) {
        if (boid === other) continue

        const dx = boid.x - other.x
        const dy = boid.y - other.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0 && distance < this.radius) {
          fx += dx / distance
          fy += dy / distance
          count++
        }
      }

      if (count > 0) {
        boid.applyForce(
          (fx / count) * this.strength,
          (fy / count) * this.strength
        )
      }
    }
  }
}
