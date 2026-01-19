import Agent from "@/engine/Agent"
import World from "@/engine/World"

export default class CanvasRenderer {
  private readonly ctx: CanvasRenderingContext2D

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly world: World,
  ) {
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Canvas 2D context is not available")
    }

    this.ctx = context
  }

  render() {
    this.clear()

    for (const agent of this.world.agentsSnapshot) {
      this.drawAgent(agent)
    }
  }

  private clear() {
    this.ctx.save()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.fillStyle = "#0f172a"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.restore()
  }

  private drawAgent(agent: Agent<unknown>) {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.arc(agent.x, agent.y, agent.radius, 0, Math.PI * 2)
    this.ctx.fillStyle = agent.color
    this.ctx.fill()

    this.ctx.restore()
  }
}
