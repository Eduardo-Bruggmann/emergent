import type Entity from "./Entity"

export default abstract class Scheduler {
  abstract schedule(entities: readonly Entity[]): Entity[]
}
