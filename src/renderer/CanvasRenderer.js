export default class CanvasRenderer {
  constructor(canvas, world) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.world = world
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  render() {
    this.clear()

    for (const entity of this.world.getEntities()) {
      this.drawEntity(entity)
    }
  }

  drawEntity(entity) {
    this.ctx.fillStyle = "pink"
    this.ctx.beginPath()
    this.ctx.arc(entity.x, entity.y, 5, 0, Math.PI * 2)
    this.ctx.fill()
  }
}
