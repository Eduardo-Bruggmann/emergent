import Rule from "./Rule.js"

export default class BoundsRule extends Rule {
  apply(world) {
    for (const e of world.getEntities()) {
      const buffer = e.radius + 1
      const maxX = Math.max(buffer, world.width - buffer)
      const maxY = Math.max(buffer, world.height - buffer)

      e.x = Math.max(buffer, Math.min(maxX, e.x))
      e.y = Math.max(buffer, Math.min(maxY, e.y))
    }
  }
}
