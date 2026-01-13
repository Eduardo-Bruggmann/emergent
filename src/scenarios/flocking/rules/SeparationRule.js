import Rule from "../../../engine/Rule.js"

export default class SeparationRule extends Rule {
  constructor(radius = 25, strength = 1) {
    super()

    this.radius = radius
    this.strength = strength
  }

  apply(world) {
    const entities = world.getEntities()

    for (const a of entities) {
      let fx = 0
      let fy = 0
      let count = 0

      for (const b of entities) {
        if (a === b) continue

        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.hypot(dx, dy)

        if (d > 0 && d < this.radius) {
          fx += dx / d
          fy += dy / d
          count++
        }
      }

      if (count > 0) {
        a.applyForce((fx / count) * this.strength, (fy / count) * this.strength)
      }
    }
  }
}
