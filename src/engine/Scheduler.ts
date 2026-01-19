import type Agent from "./Agent"

export type Scheduler = (
  agents: readonly Agent<unknown>[],
) => readonly Agent<unknown>[]
