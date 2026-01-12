import Rule from "../../../engine/Rule.js"

export default class PredationRule extends Rule {
  apply(world) {
    const entities = world.getEntities()
    const predators = entities.filter((e) => e.constructor.name === "Predator")
    const preys = entities.filter((e) => e.constructor.name === "Prey")

    for (const predator of predators) {
      for (const prey of preys) {
        const dx = predator.x - prey.x
        const dy = predator.y - prey.y
        const dist = Math.hypot(dx, dy)

        if (dist < 6) {
          world.removeEntity(prey)
        }
      }
    }
  }
}
