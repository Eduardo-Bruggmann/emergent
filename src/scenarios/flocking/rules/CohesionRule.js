import Rule from "../../../engine/Rule.js"

export default class CohesionRule extends Rule {
  constructor(radius = 50, strength = 0.01) {
    super()

    this.radius = radius
    this.strength = strength
  }

  apply(world) {
    const entities = world.getEntities()

    for (const a of entities) {
      let centerX = 0
      let centerY = 0
      let count = 0

      for (const b of entities) {
        if (a === b) continue

        const d = Math.hypot(a.x - b.x, a.y - b.y)

        if (d > 0 && d < this.radius) {
          centerX += b.x
          centerY += b.y
          count++
        }
      }

      if (count > 0) {
        centerX /= count
        centerY /= count

        a.applyForce(
          (centerX - a.x) * this.strength,
          (centerY - a.y) * this.strength
        )
      }
    }
  }
}
