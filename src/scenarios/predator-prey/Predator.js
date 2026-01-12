import Agent from "../../engine/Agent.js"

export default class Predator extends Agent {
  constructor(x, y) {
    super(x, y)
    this.speed = 2.2
    this.target = null
  }

  decide(world) {
    const preys = world
      .getEntities()
      .filter((e) => e.constructor.name === "Prey")

    if (preys.length === 0) {
      this.target = null
      return
    }

    this.target = preys.reduce((closest, prey) => {
      const d1 = distance(this, prey)
      const d2 = closest ? distance(this, closest) : Infinity
      return d1 < d2 ? prey : closest
    }, null)
  }

  act() {
    if (!this.target) return

    const dx = this.target.x - this.x
    const dy = this.target.y - this.y
    const mag = Math.hypot(dx, dy)

    if (mag === 0) return

    this.x += (dx / mag) * this.speed
    this.y += (dy / mag) * this.speed
  }
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}
