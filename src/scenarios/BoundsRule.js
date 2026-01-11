import Rule from "../engine/Rule.js"

export default class BoundsRule extends Rule {
  apply(world) {
    for (const entity of world.getEntities()) {
      if (entity.x < 0) entity.x = 0
      if (entity.y < 0) entity.y = 0
      if (entity.x > world.width) entity.x = world.width
      if (entity.y > world.height) entity.y = world.height
    }
  }
}
