import Scheduler from "./Scheduler"
import type Entity from "./Entity"

export default class RandomScheduler extends Scheduler {
  schedule(entities: readonly Entity[]): Entity[] {
    return [...entities].sort(() => Math.random() - 0.5)
  }
}
