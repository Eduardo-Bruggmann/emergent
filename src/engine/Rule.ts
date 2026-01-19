import type World from "./World"

export default interface Rule {
  apply(world: World): void
}
