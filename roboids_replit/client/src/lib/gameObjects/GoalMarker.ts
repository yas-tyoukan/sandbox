import { Vector2 } from "./Player";

export class GoalMarker {
  public position: Vector2;
  public size: Vector2;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.size = { x: 40, y: 40 };
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw goal marker as a white square with black border (retro style)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Add goal symbol (checkmark) in black
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.position.x + 8, this.position.y + 20);
    ctx.lineTo(this.position.x + 16, this.position.y + 28);
    ctx.lineTo(this.position.x + 32, this.position.y + 12);
    ctx.stroke();
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
