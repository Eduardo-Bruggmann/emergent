import type Rule from "@/engine/Rule"
import type World from "@/engine/World"
import { applyBoidForce, BOID_KIND, type BoidState } from "../Boid"

export default class CohesionRule implements Rule {
  constructor(
    private readonly radius = 50,
    private readonly strength = 0.01,
  ) {}

  apply(world: World) {
    const boids = world.getAgentsByKind<BoidState>(BOID_KIND)

    for (const boid of boids) {
      let centerX = 0
      let centerY = 0
      let count = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)
        if (distance < this.radius) {
          centerX += other.x
          centerY += other.y
          count++
        }
      }

      if (count > 0) {
        const targetX = centerX / count
        const targetY = centerY / count

        applyBoidForce(
          boid,
          (targetX - boid.x) * this.strength,
          (targetY - boid.y) * this.strength,
        )
      }
    }
  }
}
