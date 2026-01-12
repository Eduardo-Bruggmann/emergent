import Rule from "../../../engine/Rule.js"

export default class BoundsRule extends Rule {
  apply(world) {
    for (const e of world.getEntities()) {
      e.x = Math.max(0, Math.min(world.width, e.x))
      e.y = Math.max(0, Math.min(world.height, e.y))
    }
  }
}
