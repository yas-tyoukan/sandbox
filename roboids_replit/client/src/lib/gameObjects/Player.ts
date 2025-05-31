export interface Vector2 {
  x: number;
  y: number;
}

export class Player {
  public position: Vector2;
  public velocity: Vector2;
  public size: Vector2;
  public isOnGround: boolean;
  public onTeleportPad: boolean;
  private jumpPower: number;
  private speed: number;

  constructor(x: number, y: number) {
    this.position = {x, y};
    this.velocity = {x: 0, y: 0};
    this.size = {x: 30, y: 30};
    this.isOnGround = false;
    this.onTeleportPad = false;
    this.jumpPower = 16;
    this.speed = 8;
  }

  update(keys: Set<string>, deltaTime: number, audioState?: any) {
    // Horizontal movement
    this.velocity.x = 0;

    if (keys.has("KeyA") || keys.has("ArrowLeft")) {
      this.velocity.x = -this.speed;
    }
    if (keys.has("KeyD") || keys.has("ArrowRight")) {
      this.velocity.x = this.speed;
    }

    // Jumping
    if ((keys.has("KeyW") || keys.has("ArrowUp")) && this.isOnGround) {
      this.velocity.y = -this.jumpPower;
      this.isOnGround = false;
      if (audioState) {
        audioState.playJump();
      }
    }

    // Apply gravity
    this.velocity.y += 0.8; // gravity

    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Reset ground state (will be set by collision detection)
    if (this.velocity.y > 0) {
      this.isOnGround = false;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw player as a white robot with black outline (retro style)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

    // Black outline
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);

    // Robot details in black
    ctx.fillStyle = "#000000";
    // Eyes
    ctx.fillRect(this.position.x + 6, this.position.y + 6, 4, 4);
    ctx.fillRect(this.position.x + 20, this.position.y + 6, 4, 4);
    // Mouth grid
    ctx.fillRect(this.position.x + 8, this.position.y + 16, 2, 2);
    ctx.fillRect(this.position.x + 12, this.position.y + 16, 2, 2);
    ctx.fillRect(this.position.x + 16, this.position.y + 16, 2, 2);
    ctx.fillRect(this.position.x + 20, this.position.y + 16, 2, 2);
    // Body panel
    ctx.fillRect(this.position.x + 10, this.position.y + 22, 10, 2);
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
    this.isOnGround = false;
    this.onTeleportPad = false;
  }
}
