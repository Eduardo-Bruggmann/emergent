import type World from "../World"

export default abstract class Rule {
  abstract apply(world: World): void
}
