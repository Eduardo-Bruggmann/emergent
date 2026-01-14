import Agent from "@/core/Agent"
import type World from "@/core/World"

export default class Prey extends Agent {
  private readonly speed = 1.5
  private direction = Math.random() * Math.PI * 2

  constructor(x: number, y: number) {
    super(x, y, 7, "#22c55e")
  }

  protected decide(_world: World) {
    if (Math.random() < 0.05) {
      this.direction = Math.random() * Math.PI * 2
    }
  }

  protected act(_world: World) {
    this.translate(
      Math.cos(this.direction) * this.speed,
      Math.sin(this.direction) * this.speed
    )
  }
}
