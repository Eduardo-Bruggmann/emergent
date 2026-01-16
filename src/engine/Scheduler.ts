import type Entity from "./Entity"

export type Scheduler = (entities: readonly Entity[]) => Entity[]
