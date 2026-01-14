import Entity from "@/core/Entity"
import World from "@/core/World"

export default class CanvasRenderer {
  private readonly ctx: CanvasRenderingContext2D

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly world: World
  ) {
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Canvas 2D context is not available")
    }

    this.ctx = context
  }

  render() {
    this.clear()

    for (const entity of this.world.getEntities()) {
      this.drawEntity(entity)
    }
  }

  private clear() {
    this.ctx.fillStyle = "#0f172a"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawEntity(entity: Entity) {
    this.ctx.beginPath()
    this.ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = entity.color
    this.ctx.fill()
  }
}
