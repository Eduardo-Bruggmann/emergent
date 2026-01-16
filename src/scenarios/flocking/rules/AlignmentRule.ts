import type Rule from "@/engine/shared/Rule"
import type World from "@/engine/World"
import {
  applyBoidForce,
  boidVelocity,
  BOID_KIND,
  type BoidState,
} from "../Boid"

export default class AlignmentRule implements Rule {
  constructor(private readonly radius = 50, private readonly strength = 0.5) {}

  apply(world: World) {
    const boids = world.getEntitiesByKind<BoidState>(BOID_KIND)

    for (const boid of boids) {
      let avgVx = 0
      let avgVy = 0
      let count = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)
        if (distance < this.radius) {
          const { x: vx, y: vy } = boidVelocity(other)
          avgVx += vx
          avgVy += vy
          count++
        }
      }

      if (count > 0) {
        const targetVx = avgVx / count
        const targetVy = avgVy / count
        const { x, y } = boidVelocity(boid)

        applyBoidForce(
          boid,
          (targetVx - x) * this.strength,
          (targetVy - y) * this.strength
        )
      }
    }
  }
}
