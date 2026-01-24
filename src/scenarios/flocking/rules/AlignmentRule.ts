import type Rule from "@/engine/Rule"
import type World from "@/engine/World"
import {
  applyBoidForce,
  boidVelocity,
  BOID_KIND,
  type BoidState,
} from "../Boid"

export default class AlignmentRule implements Rule {
  constructor(
    private readonly visualRange = 75,
    private readonly matchingFactor = 0.05,
  ) {}

  apply(world: World) {
    const boids = world.getAgentsByKind<BoidState>(BOID_KIND)

    for (const boid of boids) {
      let avgVx = 0
      let avgVy = 0
      let numNeighbors = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)
        if (distance < this.visualRange) {
          const { x: vx, y: vy } = boidVelocity(other)
          avgVx += vx
          avgVy += vy
          numNeighbors++
        }
      }

      if (numNeighbors > 0) {
        avgVx /= numNeighbors
        avgVy /= numNeighbors

        const { x: vx, y: vy } = boidVelocity(boid)

        applyBoidForce(
          boid,
          (avgVx - vx) * this.matchingFactor,
          (avgVy - vy) * this.matchingFactor,
        )
      }
    }
  }
}
