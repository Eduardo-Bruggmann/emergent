import Rule from "@/core/shared/Rule"
import Boid from "../Boid"
import type World from "@/core/World"

export default class AlignmentRule extends Rule {
  constructor(private readonly radius = 50, private readonly strength = 0.5) {
    super()
  }

  apply(world: World) {
    const boids = world.getEntitiesOfType(Boid)

    for (const boid of boids) {
      let avgVx = 0
      let avgVy = 0
      let count = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)

        if (distance < this.radius) {
          avgVx += other.velocity.x
          avgVy += other.velocity.y
          count++
        }
      }

      if (count > 0) {
        const targetVx = avgVx / count
        const targetVy = avgVy / count

        boid.applyForce(
          (targetVx - boid.velocity.x) * this.strength,
          (targetVy - boid.velocity.y) * this.strength
        )
      }
    }
  }
}
