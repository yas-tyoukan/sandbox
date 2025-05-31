import { Vector2 } from "./Player";

export class TeleportPad {
  public position: Vector2;
  public size: Vector2;
  public targetPosition: Vector2 | null;

  constructor(x: number, y: number, targetX?: number, targetY?: number) {
    this.position = { x, y };
    this.size = { x: 80, y: 15 }; // Smaller height to fit better on platforms
    this.targetPosition = targetX !== undefined && targetY !== undefined 
      ? { x: targetX, y: targetY } 
      : null;
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw teleport pad as white rectangle with black border (retro style)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Black border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Draw "TELEPORT" text in black
    ctx.fillStyle = "#000000";
    ctx.font = "8px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      "TELEPORT", 
      this.position.x + this.size.x / 2, 
      this.position.y + this.size.y / 2 + 3
    );
  }

  getBounds() {
    return {
      left: this.position.x,
      right: this.position.x + this.size.x,
      top: this.position.y,
      bottom: this.position.y + this.size.y
    };
  }

  setTarget(x: number, y: number) {
    this.targetPosition = { x, y };
  }
}
