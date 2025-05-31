import { Vector2 } from "./Player";

export class Platform {
  public position: Vector2;
  public size: Vector2;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = { x, y };
    this.size = { x: width, y: height };
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw platform as white rectangle with black border (retro style)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Black border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  getBounds() {
    return {
      left: this.position.x,
      right: this.position.x + this.size.x,
      top: this.position.y,
      bottom: this.position.y + this.size.y
    };
  }
}
