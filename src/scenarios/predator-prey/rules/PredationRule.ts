import Rule from "@/core/shared/Rule"
import Predator from "../Predator"
import Prey from "../Prey"
import type World from "@/core/World"

export default class PredationRule extends Rule {
  constructor(private readonly killRadius = 6) {
    super()
  }

  apply(world: World) {
    const predators = world.getEntitiesOfType(Predator)
    const preys = world.getEntitiesOfType(Prey)

    for (const predator of predators) {
      for (const prey of preys) {
        if (predator.distanceTo(prey) < this.killRadius) {
          world.removeEntity(prey)
        }
      }
    }
  }
}
