import type Rule from "@/engine/Rule"
import type World from "@/engine/World"
import { applyBoidForce, BOID_KIND, type BoidState } from "../Boid"

export default class CohesionRule implements Rule {
  constructor(
    private readonly visualRange = 75,
    private readonly centeringFactor = 0.005,
  ) {}

  apply(world: World) {
    const boids = world.getAgentsByKind<BoidState>(BOID_KIND)

    for (const boid of boids) {
      let centerX = 0
      let centerY = 0
      let numNeighbors = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)
        if (distance < this.visualRange) {
          centerX += other.x
          centerY += other.y
          numNeighbors++
        }
      }

      if (numNeighbors > 0) {
        centerX /= numNeighbors
        centerY /= numNeighbors

        applyBoidForce(
          boid,
          (centerX - boid.x) * this.centeringFactor,
          (centerY - boid.y) * this.centeringFactor,
        )
      }
    }
  }
}
