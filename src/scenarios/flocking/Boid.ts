import Agent from "@/core/Agent"
import type World from "@/core/World"
import type { Vector2 } from "@/core/Entity"

export default class Boid extends Agent {
  private vx: number
  private vy: number
  private readonly maxSpeed = 2

  constructor(x: number, y: number) {
    super(x, y, 6, "purple")

    this.vx = Math.random() * 2 - 1
    this.vy = Math.random() * 2 - 1
  }

  get velocity(): Vector2 {
    return { x: this.vx, y: this.vy }
  }

  applyForce(fx: number, fy: number) {
    this.vx += fx
    this.vy += fy
  }

  protected decide(_world: World) {
    // Rules update velocity; boid keeps current heading here.
  }

  protected act(_world: World) {
    this.limitSpeed()
    this.translate(this.vx, this.vy)
  }

  private limitSpeed() {
    const speed = Math.hypot(this.vx, this.vy)
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed
      this.vy = (this.vy / speed) * this.maxSpeed
    }
  }
}
