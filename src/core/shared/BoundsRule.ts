import Rule from "./Rule"
import type World from "../World"

export default class BoundsRule extends Rule {
  constructor(private readonly margin = 1) {
    super()
  }

  apply(world: World): void {
    const maxX = world.width - this.margin
    const maxY = world.height - this.margin

    for (const entity of world.getEntities()) {
      const minX = entity.radius + this.margin
      const minY = entity.radius + this.margin

      const clampedX = Math.min(Math.max(minX, entity.x), maxX)
      const clampedY = Math.min(Math.max(minY, entity.y), maxY)

      entity.setPosition(clampedX, clampedY)
    }
  }
}
