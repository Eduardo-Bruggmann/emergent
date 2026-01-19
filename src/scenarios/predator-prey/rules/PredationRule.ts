import type Rule from "@/engine/Rule"
import type World from "@/engine/World"
import { PREDATOR_KIND, type PredatorState } from "../Predator"
import { PREY_KIND, type PreyState } from "../Prey"

export default class PredationRule implements Rule {
  constructor(private readonly killRadius = 6) {}

  apply(world: World) {
    const predators = world.getAgentsByKind<PredatorState>(PREDATOR_KIND)
    const preys = world.getAgentsByKind<PreyState>(PREY_KIND)

    for (const predator of predators) {
      for (const prey of preys) {
        if (predator.distanceTo(prey) < this.killRadius) {
          world.removeEntity(prey)
          break
        }
      }
    }
  }
}
