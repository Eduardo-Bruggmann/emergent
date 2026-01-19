import Agent, { AgentBehavior } from "@/engine/Agent"

export const AGGREGATE_KIND = "aggregate"

const STATIC_BEHAVIOR: AgentBehavior<null> = {}

export function createAggregate(x: number, y: number) {
  return new Agent({
    kind: AGGREGATE_KIND,
    x,
    y,
    radius: 5,
    color: "#e5e7b4",
    state: null,
    behavior: STATIC_BEHAVIOR,
  })
}
