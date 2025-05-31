import { Vector2 } from "./Player";

export class Barrier {
  public position: Vector2;
  public size: Vector2;
  public isActive: boolean = true;

  constructor(x: number, y: number, width: number = 20, height: number = 100) {
    this.position = { x, y };
    this.size = { x: width, y: height };
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.isActive) return;
    
    // Draw barrier as animated electric field (retro style)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Black border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Electric field pattern
    ctx.fillStyle = "#000000";
    const time = Date.now() * 0.01;
    for (let i = 0; i < this.size.y; i += 8) {
      const offset = Math.sin(time + i * 0.1) * 3;
      ctx.fillRect(this.position.x + 6 + offset, this.position.y + i, 8, 4);
    }
  }

  getBounds() {
    return this.isActive ? {
      left: this.position.x,
      right: this.position.x + this.size.x,
      top: this.position.y,
      bottom: this.position.y + this.size.y
    } : null;
  }

  deactivate() {
    this.isActive = false;
  }

  reset() {
    this.isActive = true;
  }
}