import Entity, { EntityBehavior } from "@/engine/Entity"

export const AGGREGATE_KIND = "aggregate"

export function createAggregate(x: number, y: number) {
    return new Entity({
        kind: AGGREGATE_KIND,
        x,
        y,
        radius: 5,
        color: "#e5e7b4",
        state: null,
        behavior: (() => {}) as EntityBehavior<null>
    })
}