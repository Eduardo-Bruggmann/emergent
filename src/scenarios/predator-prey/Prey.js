import Agent from "../../engine/Agent.js"

export default class Prey extends Agent {
  constructor(x, y) {
    super(x, y)
    this.speed = 1.5
    this.direction = Math.random() * Math.PI * 2
  }

  decide() {
    if (Math.random() < 0.05) {
      this.direction = Math.random() * Math.PI * 2
    }
  }

  act() {
    this.x += Math.cos(this.direction) * this.speed
    this.y += Math.sin(this.direction) * this.speed
  }
}
