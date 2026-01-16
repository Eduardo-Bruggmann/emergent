import Entity, { type EntityProps } from "./Entity"

// Factory kept for backward compatibility; prefer using Entity directly.
export default function createAgent<TState>(props: EntityProps<TState>) {
  return new Entity(props)
}
