import type Rule from "@/engine/shared/Rule"
import type World from "@/engine/World"
import { applyBoidForce, BOID_KIND, type BoidState } from "../Boid"

export default class SeparationRule implements Rule {
  constructor(private readonly radius = 25, private readonly strength = 1) {}

  apply(world: World) {
    const boids = world.getEntitiesByKind<BoidState>(BOID_KIND)

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
        applyBoidForce(
          boid,
          (fx / count) * this.strength,
          (fy / count) * this.strength
        )
      }
    }
  }
}
