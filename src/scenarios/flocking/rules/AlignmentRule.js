import Rule from "../../../engine/Rule.js"

export default class AlignmentRule extends Rule {
  constructor(radius = 50, strength = 0.5) {
    super()

    this.radius = radius
    this.strength = strength
  }

  apply(world) {
    const entities = world.getEntities()

    for (const a of entities) {
      let avgVx = 0
      let avgVy = 0
      let count = 0

      for (const b of entities) {
        if (a === b) continue

        const d = Math.hypot(a.x - b.x, a.y - b.y)

        if (d < this.radius) {
          avgVx += b.vx
          avgVy += b.vy
          count++
        }
      }

      if (count > 0) {
        a.applyForce(
          (avgVx / count - a.vx) * this.strength,
          (avgVy / count - a.vy) * this.strength
        )
      }
    }
  }
}
