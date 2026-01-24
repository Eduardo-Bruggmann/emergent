import type Rule from "@/engine/Rule"
import type World from "@/engine/World"
import { BOID_KIND, type BoidState } from "../Boid"
import type Agent from "@/engine/Agent"

export default class SeparationRule implements Rule {
  constructor(
    private readonly minDistance = 30,
    private readonly avoidFactor = 0.05,
  ) {}

  apply(world: World) {
    const boids = world.getAgentsByKind<BoidState>(BOID_KIND)

    for (const boid of boids) {
      let moveX = 0
      let moveY = 0

      for (const other of boids) {
        if (boid === other) continue

        const distance = boid.distanceTo(other)

        if (distance < this.minDistance && distance > 0) {
          // Stronger repulsion when closer (inverse of distance)
          const strength = (this.minDistance - distance) / distance
          moveX += (boid.x - other.x) * strength
          moveY += (boid.y - other.y) * strength
        }
      }

      // Apply directly to velocity (bypassing maxForce limit for hard collision avoidance)
      if (moveX !== 0 || moveY !== 0) {
        this.applyHardSeparation(boid, moveX * this.avoidFactor, moveY * this.avoidFactor)
      }
    }
  }

  private applyHardSeparation(boid: Agent<BoidState>, fx: number, fy: number) {
    boid.mutateState((state) => {
      state.vx += fx
      state.vy += fy
    })
  }
}
