import type World from "./World"
import type Rule from "./Rule"

export default class BoundsRule implements Rule {
  constructor(private readonly margin = 10) {}

  apply(world: World): void {
    const maxX = world.width - this.margin
    const maxY = world.height - this.margin

    for (const agent of world.agentsSnapshot) {
      const minX = agent.radius + this.margin
      const minY = agent.radius + this.margin

      const clampedX = Math.min(Math.max(minX, agent.x), maxX)
      const clampedY = Math.min(Math.max(minY, agent.y), maxY)

      agent.setPosition(clampedX, clampedY)
    }
  }
}
