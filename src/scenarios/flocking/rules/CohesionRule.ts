import Rule from "@/core/shared/Rule"
import Boid from "../Boid"
import type World from "@/core/World"

export default class CohesionRule extends Rule {
  constructor(private readonly radius = 50, private readonly strength = 0.01) {
    super()
  }

  apply(world: World) {
    const boids = world.getEntitiesOfType(Boid)

    for (const boid of boids) {
      let centerX = 0
      let centerY = 0
      let count = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)

        if (distance > 0 && distance < this.radius) {
          centerX += other.x
          centerY += other.y
          count++
        }
      }

      if (count > 0) {
        const targetX = centerX / count
        const targetY = centerY / count

        boid.applyForce(
          (targetX - boid.x) * this.strength,
          (targetY - boid.y) * this.strength
        )
      }
    }
  }
}
