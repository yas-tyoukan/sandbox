import { Vector2 } from "./Player";

export interface Laser {
  position: Vector2;
  velocity: Vector2;
  size: Vector2;
  active: boolean;
}

export class LaserEnemy {
  public position: Vector2;
  public velocity: Vector2;
  public size: Vector2;
  public lasers: Laser[] = [];
  private fireTimer: number;
  private fireInterval: number;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.size = { x: 45, y: 60 }; // Same size as regular enemy
    this.fireTimer = 0;
    this.fireInterval = 3000; // Fire every 3 seconds
  }

  update(deltaTime: number, audioState?: any) {
    this.fireTimer += deltaTime * 1000;
    
    // Fire laser
    if (this.fireTimer >= this.fireInterval) {
      this.fireLaser();
      this.fireTimer = 0;
      if (audioState) {
        audioState.playLaser();
      }
    }
    
    // Update lasers
    this.lasers = this.lasers.filter(laser => {
      if (laser.active) {
        laser.position.x += laser.velocity.x;
        laser.position.y += laser.velocity.y;
        
        // Remove lasers that go off screen
        if (laser.position.x < -50 || laser.position.x > 2000 || 
            laser.position.y < -50 || laser.position.y > 2000) {
          return false;
        }
        return true;
      }
      return false;
    });

    // Apply gravity
    this.velocity.y += 0.8;
    this.position.y += this.velocity.y;
  }

  private fireLaser() {
    // Fire laser to the left and right
    const laserSpeed = 8;
    
    this.lasers.push({
      position: { x: this.position.x - 10, y: this.position.y + this.size.y / 2 },
      velocity: { x: -laserSpeed, y: 0 },
      size: { x: 20, y: 4 },
      active: true
    });
    
    this.lasers.push({
      position: { x: this.position.x + this.size.x, y: this.position.y + this.size.y / 2 },
      velocity: { x: laserSpeed, y: 0 },
      size: { x: 20, y: 4 },
      active: true
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw laser enemy as red robot with white outline (retro style)
    ctx.fillStyle = "#666666";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // White outline
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    
    // Robot details in white
    ctx.fillStyle = "#FFFFFF";
    // Eyes (glowing)
    ctx.fillRect(this.position.x + 8, this.position.y + 8, 6, 8);
    ctx.fillRect(this.position.x + 31, this.position.y + 8, 6, 8);
    // Laser cannon mouth
    ctx.fillRect(this.position.x + 15, this.position.y + 25, 15, 6);
    // Body cannons
    ctx.fillRect(this.position.x + 5, this.position.y + 35, 8, 4);
    ctx.fillRect(this.position.x + 32, this.position.y + 35, 8, 4);
    
    // Draw lasers
    ctx.fillStyle = "#FFFFFF";
    this.lasers.forEach(laser => {
      if (laser.active) {
        ctx.fillRect(laser.position.x, laser.position.y, laser.size.x, laser.size.y);
      }
    });
  }

  getBounds() {
    return {
      left: this.position.x,
      right: this.position.x + this.size.x,
      top: this.position.y,
      bottom: this.position.y + this.size.y
    };
  }

  getLaserBounds() {
    return this.lasers.filter(laser => laser.active).map(laser => ({
      left: laser.position.x,
      right: laser.position.x + laser.size.x,
      top: laser.position.y,
      bottom: laser.position.y + laser.size.y
    }));
  }

  reset(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.lasers = [];
    this.fireTimer = 0;
  }
}