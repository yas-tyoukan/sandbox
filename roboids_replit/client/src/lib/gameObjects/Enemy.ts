import { Vector2 } from "./Player";

export class Enemy {
  public position: Vector2;
  public velocity: Vector2;
  public size: Vector2;
  public direction: number; // 1 for right, -1 for left
  public speed: number;
  public leftBound: number;
  public rightBound: number;

  constructor(x: number, y: number, leftBound: number, rightBound: number) {
    this.position = {x, y};
    this.velocity = {x: 0, y: 0};
    this.size = {x: 45, y: 60}; // 1.5x width, 2x height of player (30x30)
    this.direction = 1;
    this.speed = 4;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  update(deltaTime: number) {
    // Move horizontally
    this.velocity.x = this.direction * this.speed;
    this.position.x += this.velocity.x;

    // Check bounds and reverse direction
    if (this.position.x <= this.leftBound) {
      this.position.x = this.leftBound;
      this.direction = 1;
    } else if (this.position.x + this.size.x >= this.rightBound) {
      this.position.x = this.rightBound - this.size.x;
      this.direction = -1;
    }

    // Apply gravity
    this.velocity.y += 0.8;
    this.position.y += this.velocity.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw enemy as a black robot with white outline (retro style)
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

    // White outline
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);

    // Robot details in white
    ctx.fillStyle = "#FFFFFF";
    // Eyes (menacing red glow)
    ctx.fillRect(this.position.x + 8, this.position.y + 8, 6, 6);
    ctx.fillRect(this.position.x + 31, this.position.y + 8, 6, 6);
    // Angular mouth
    ctx.fillRect(this.position.x + 12, this.position.y + 25, 8, 3);
    ctx.fillRect(this.position.x + 25, this.position.y + 25, 8, 3);
    // Body panel lines
    ctx.fillRect(this.position.x + 15, this.position.y + 35, 15, 2);
    ctx.fillRect(this.position.x + 10, this.position.y + 45, 25, 2);
  }

  getBounds() {
    return {
      left: this.position.x,
      right: this.position.x + this.size.x,
      top: this.position.y,
      bottom: this.position.y + this.size.y
    };
  }

  reset(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.direction = 1;
  }
}
