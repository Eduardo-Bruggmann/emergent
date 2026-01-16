import type World from "../World"
import type Rule from "./Rule"

export default class BoundsRule implements Rule {
  constructor(private readonly margin = 10) {}

  apply(world: World): void {
    const maxX = world.width - this.margin
    const maxY = world.height - this.margin

    for (const entity of world.entities) {
      const minX = entity.radius + this.margin
      const minY = entity.radius + this.margin

      const clampedX = Math.min(Math.max(minX, entity.x), maxX)
      const clampedY = Math.min(Math.max(minY, entity.y), maxY)

      entity.setPosition(clampedX, clampedY)
    }
  }
}
