import { Vector2 } from "./Player";

export class UnlockPad {
  public position: Vector2;
  public size: Vector2;
  public isActivated: boolean = false;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.size = { x: 80, y: 15 }; // Smaller height to fit better on platforms
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw unlock pad as white rectangle with black border (retro style)
    ctx.fillStyle = this.isActivated ? "#CCCCCC" : "#FFFFFF";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Black border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Draw "UNLOCK" text in black
    ctx.fillStyle = "#000000";
    ctx.font = "8px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      this.isActivated ? "UNLOCKED" : "UNLOCK", 
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

  activate() {
    this.isActivated = true;
  }

  reset() {
    this.isActivated = false;
  }
}