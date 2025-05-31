import { Vector2 } from "./Player";

export class RandomEnemy {
  public position: Vector2;
  public velocity: Vector2;
  public size: Vector2;
  public leftBound: number;
  public rightBound: number;
  private speed: number;
  private changeDirectionTimer: number;
  private changeDirectionInterval: number;

  constructor(x: number, y: number, leftBound: number, rightBound: number) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.size = { x: 45, y: 60 }; // Same size as regular enemy
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.speed = 1.5;
    this.changeDirectionTimer = 0;
    this.changeDirectionInterval = 2000; // Change direction every 2 seconds
    
    // Start with random direction
    this.velocity.x = Math.random() > 0.5 ? this.speed : -this.speed;
  }

  update(deltaTime: number) {
    this.changeDirectionTimer += deltaTime * 1000;
    
    // Randomly change direction
    if (this.changeDirectionTimer >= this.changeDirectionInterval) {
      const directions = [-this.speed, 0, this.speed];
      this.velocity.x = directions[Math.floor(Math.random() * directions.length)];
      this.changeDirectionTimer = 0;
      this.changeDirectionInterval = 1000 + Math.random() * 2000; // 1-3 seconds
    }
    
    // Update position
    this.position.x += this.velocity.x;
    
    // Check bounds and bounce
    if (this.position.x <= this.leftBound) {
      this.position.x = this.leftBound;
      this.velocity.x = Math.abs(this.velocity.x);
    } else if (this.position.x + this.size.x >= this.rightBound) {
      this.position.x = this.rightBound - this.size.x;
      this.velocity.x = -Math.abs(this.velocity.x);
    }

    // Apply gravity
    this.velocity.y += 0.8;
    this.position.y += this.velocity.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw random enemy as dark gray robot with white outline
    ctx.fillStyle = "#333333";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // White outline
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Robot details in white
    ctx.fillStyle = "#FFFFFF";
    // Eyes (erratic)
    ctx.fillRect(this.position.x + 6, this.position.y + 8, 8, 6);
    ctx.fillRect(this.position.x + 31, this.position.y + 8, 8, 6);
    // Zigzag mouth
    ctx.fillRect(this.position.x + 10, this.position.y + 25, 4, 3);
    ctx.fillRect(this.position.x + 18, this.position.y + 22, 4, 3);
    ctx.fillRect(this.position.x + 26, this.position.y + 25, 4, 3);
    // Body pattern
    ctx.fillRect(this.position.x + 12, this.position.y + 35, 6, 2);
    ctx.fillRect(this.position.x + 24, this.position.y + 35, 6, 2);
    ctx.fillRect(this.position.x + 15, this.position.y + 45, 15, 2);
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
    this.velocity.x = Math.random() > 0.5 ? this.speed : -this.speed;
    this.velocity.y = 0;
    this.changeDirectionTimer = 0;
  }
}