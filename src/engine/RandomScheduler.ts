import type Entity from "./Entity"
import type { Scheduler } from "./Scheduler"

const randomScheduler: Scheduler = (entities: readonly Entity[]): Entity[] =>
  [...entities].sort(() => Math.random() - 0.5)

export default randomScheduler
