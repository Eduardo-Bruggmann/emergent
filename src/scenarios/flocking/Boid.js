import Agent from "../../engine/Agent.js"

export default class Boid extends Agent {
  constructor(x, y) {
    super(x, y)

    this.vx = Math.random() * 2 - 1
    this.vy = Math.random() * 2 - 1

    this.maxSpeed = 2
    this.maxForce = 0.05

    this.color = "purple"
  }

  applyForce(fx, fy) {
    this.vx += fx
    this.vy += fy
  }

  limitSpeed() {
    const speed = Math.hypot(this.vx, this.vy)
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed
      this.vy = (this.vy / speed) * this.maxSpeed
    }
  }

  act() {
    this.limitSpeed()
    this.x += this.vx
    this.y += this.vy
  }
}
