import Rule from "@/engine/Rule"
import World from "@/engine/World"
import { AGGREGATE_KIND, createAggregate } from "../Aggregate"
import { PARTICLE_KIND } from "../Particle"

export default class AggregationRule implements Rule {
  constructor(private readonly stickRadius = 4) {}

  apply(world: World) {
    const aggregates = world.getAgentsByKind(AGGREGATE_KIND)
    const particles = world.getAgentsByKind(PARTICLE_KIND)

    for (const particle of particles) {
      for (const agg of aggregates) {
        if (particle.distanceTo(agg) < this.stickRadius + agg.radius) {
          world.removeEntity(particle)
          world.addEntity(createAggregate(particle.x, particle.y))
          break
        }
      }
    }
  }
}
