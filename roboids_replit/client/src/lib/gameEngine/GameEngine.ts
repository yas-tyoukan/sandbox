import { Player } from "../gameObjects/Player";
import { Enemy } from "../gameObjects/Enemy";
import { RandomEnemy } from "../gameObjects/RandomEnemy";
import { LaserEnemy } from "../gameObjects/LaserEnemy";
import { Platform } from "../gameObjects/Platform";
import { TeleportPad } from "../gameObjects/TeleportPad";
import { UnlockPad } from "../gameObjects/UnlockPad";
import { Barrier } from "../gameObjects/Barrier";
import { GoalMarker } from "../gameObjects/GoalMarker";
import { CollisionDetection } from "./CollisionDetection";
import { KeyboardHandler } from "../utils/KeyboardHandler";
import { useGameState } from "../stores/useGameState";
import { useAudio } from "../stores/useAudio";

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: (Enemy | RandomEnemy | LaserEnemy)[] = [];
  private platforms: Platform[] = [];
  private teleportPads: TeleportPad[] = [];
  private unlockPads: UnlockPad[] = [];
  private barriers: Barrier[] = [];
  private goalMarker: GoalMarker;
  private keyboardHandler: KeyboardHandler;
  private isRunning: boolean = false;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private respawnTimer: number = 0;
  private isRespawning: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.keyboardHandler = new KeyboardHandler();
    
    // Initialize with temporary values
    this.player = new Player(0, 0);
    this.goalMarker = new GoalMarker(0, 0);
    
    // Initialize game objects
    this.setupLevel();
  }

  private setupLevel() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const gameState = useGameState.getState();
    const currentLevel = gameState.level;

    // Create player at bottom left
    this.player = new Player(50, canvasHeight - 150);

    // Create platforms based on level
    this.platforms = this.createPlatformsForLevel(currentLevel, canvasWidth, canvasHeight);
    
    // Create teleport pads based on level
    this.teleportPads = this.createTeleportPadsForLevel(currentLevel, canvasWidth, canvasHeight);
    
    // Create unlock pads and barriers based on level
    this.unlockPads = this.createUnlockPadsForLevel(currentLevel, canvasWidth, canvasHeight);
    this.barriers = this.createBarriersForLevel(currentLevel, canvasWidth, canvasHeight);
    
    // Create goal marker
    this.goalMarker = this.createGoalMarkerForLevel(currentLevel, canvasWidth, canvasHeight);
    
    // Create enemies based on level
    this.enemies = this.createEnemiesForLevel(currentLevel, canvasWidth, canvasHeight);
  }

  private createPlatformsForLevel(level: number, canvasWidth: number, canvasHeight: number): Platform[] {
    const platforms = [
      // Bottom level (always present)
      new Platform(0, canvasHeight - 100, canvasWidth, 100)
    ];

    if (level >= 1) {
      // Level 1-9: Basic three-level structure
      platforms.push(
        new Platform(0, canvasHeight - 300, canvasWidth, 40),
        new Platform(0, canvasHeight - 500, canvasWidth, 40)
      );
    }

    if (level >= 5) {
      // Level 5+: Add more complex platform layouts
      platforms.push(
        new Platform(canvasWidth * 0.3, canvasHeight - 200, canvasWidth * 0.4, 20),
        new Platform(canvasWidth * 0.1, canvasHeight - 400, canvasWidth * 0.3, 20),
        new Platform(canvasWidth * 0.6, canvasHeight - 400, canvasWidth * 0.3, 20)
      );
    }

    return platforms;
  }

  private createTeleportPadsForLevel(level: number, canvasWidth: number, canvasHeight: number): TeleportPad[] {
    const teleportPads: TeleportPad[] = [];

    if (level >= 1) {
      // Basic teleport pads - embedded in platforms
      teleportPads.push(
        new TeleportPad(canvasWidth - 150, canvasHeight - 120, 50, canvasHeight - 340),
        new TeleportPad(50, canvasHeight - 320),
        new TeleportPad(canvasWidth - 150, canvasHeight - 320, 50, canvasHeight - 540),
        new TeleportPad(50, canvasHeight - 520)
      );
    }

    if (level >= 6) {
      // Add more teleport pads for complex levels
      teleportPads.push(
        new TeleportPad(canvasWidth * 0.5, canvasHeight - 220, canvasWidth * 0.7, canvasHeight - 420)
      );
    }

    return teleportPads;
  }

  private createGoalMarkerForLevel(level: number, canvasWidth: number, canvasHeight: number): GoalMarker {
    // Goal marker position varies by level
    if (level <= 3) {
      return new GoalMarker(canvasWidth - 80, canvasHeight - 540);
    } else if (level <= 6) {
      return new GoalMarker(canvasWidth - 80, canvasHeight - 420);
    } else {
      return new GoalMarker(canvasWidth * 0.8, canvasHeight - 540);
    }
  }

  private createEnemiesForLevel(level: number, canvasWidth: number, canvasHeight: number): (Enemy | RandomEnemy | LaserEnemy)[] {
    const enemies: (Enemy | RandomEnemy | LaserEnemy)[] = [];

    if (level >= 1) {
      // Level 1: Basic patrol enemies
      enemies.push(
        new Enemy(200, canvasHeight - 190, 200, canvasWidth - 75), // Adjusted for new enemy size
        new Enemy(150, canvasHeight - 390, 10, canvasWidth - 75),
        new Enemy(200, canvasHeight - 590, 150, canvasWidth - 200)
      );
    }

    if (level >= 2) {
      // Level 2+: Add random movement enemies
      const randomEnemy = new RandomEnemy(300, canvasHeight - 190, 100, canvasWidth - 100);
      enemies.push(randomEnemy);
    }

    if (level >= 3) {
      // Level 3+: Add laser enemies
      const laserEnemy = new LaserEnemy(canvasWidth * 0.7, canvasHeight - 390);
      enemies.push(laserEnemy);
    }

    if (level >= 4) {
      // Level 4+: More complex enemy patterns
      enemies.push(
        new Enemy(50, canvasHeight - 390, 10, canvasWidth * 0.4),
        new RandomEnemy(canvasWidth * 0.6, canvasHeight - 390, canvasWidth * 0.5, canvasWidth - 100)
      );
    }

    if (level >= 7) {
      // Level 7+: Multiple laser enemies
      enemies.push(
        new LaserEnemy(canvasWidth * 0.3, canvasHeight - 590),
        new LaserEnemy(canvasWidth * 0.8, canvasHeight - 190)
      );
    }

    return enemies;
  }

  private createUnlockPadsForLevel(level: number, canvasWidth: number, canvasHeight: number): UnlockPad[] {
    const unlockPads: UnlockPad[] = [];

    if (level >= 4) {
      // Level 4+: Add unlock pads for barriers
      unlockPads.push(
        new UnlockPad(canvasWidth * 0.3, canvasHeight - 320)
      );
    }

    if (level >= 6) {
      // Level 6+: Multiple unlock pads
      unlockPads.push(
        new UnlockPad(canvasWidth * 0.1, canvasHeight - 420)
      );
    }

    return unlockPads;
  }

  private createBarriersForLevel(level: number, canvasWidth: number, canvasHeight: number): Barrier[] {
    const barriers: Barrier[] = [];

    if (level >= 4) {
      // Level 4+: Add barriers blocking goal
      barriers.push(
        new Barrier(canvasWidth - 120, canvasHeight - 540, 20, 100)
      );
    }

    if (level >= 6) {
      // Level 6+: Multiple barriers
      barriers.push(
        new Barrier(canvasWidth * 0.5, canvasHeight - 420, 20, 80)
      );
    }

    return barriers;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.gameLoop();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.keyboardHandler.destroy();
  }

  private gameLoop = () => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number) {
    const keys = this.keyboardHandler.getKeys();
    const gameState = useGameState.getState();
    const audioState = useAudio.getState();

    if (gameState.gamePhase !== "playing") {
      return;
    }

    // Handle respawn timer
    if (this.isRespawning) {
      this.respawnTimer -= deltaTime;
      if (this.respawnTimer <= 0) {
        this.isRespawning = false;
        this.player.reset(50, this.canvas.height - 150);
      }
      return;
    }

    // Update player
    this.player.update(keys, deltaTime, audioState);

    // Handle teleportation
    if (keys.has("Space")) {
      this.handleTeleportation();
      this.handleUnlockPads();
    }

    // Update enemies
    this.enemies.forEach(enemy => {
      if (enemy instanceof LaserEnemy) {
        enemy.update(deltaTime, audioState);
      } else {
        enemy.update(deltaTime);
      }
    });

    // Handle collisions
    this.handleCollisions();

    // Check boundaries
    this.handleBoundaries();
  }

  private handleTeleportation() {
    const playerBounds = this.player.getBounds();
    const audioState = useAudio.getState();
    
    this.teleportPads.forEach(pad => {
      if (CollisionDetection.checkAABB(playerBounds, pad.getBounds()) && pad.targetPosition) {
        this.player.position.x = pad.targetPosition.x;
        this.player.position.y = pad.targetPosition.y;
        this.player.velocity.y = 0;
        console.log("Player teleported!");
        
        // Play teleport sound
        const audio = useAudio.getState();
        audio.playTeleport();
      }
    });
  }

  private handleCollisions() {
    const playerBounds = this.player.getBounds();

    // Platform collisions
    this.platforms.forEach(platform => {
      CollisionDetection.resolveCollision(this.player, platform.getBounds());
    });

    // Barrier collisions
    this.barriers.forEach(barrier => {
      const barrierBounds = barrier.getBounds();
      if (barrierBounds && CollisionDetection.checkAABB(playerBounds, barrierBounds) && !this.isRespawning) {
        this.handlePlayerDeath();
      }
    });

    // Enemy collisions
    this.enemies.forEach(enemy => {
      const enemyBounds = enemy.getBounds();
      
      // Enemy-platform collisions
      this.platforms.forEach(platform => {
        CollisionDetection.resolveCollision(enemy, platform.getBounds());
      });

      // Player-enemy collisions
      if (CollisionDetection.checkAABB(playerBounds, enemyBounds) && !this.isRespawning) {
        this.handlePlayerDeath();
      }

      // Laser collisions (for LaserEnemy)
      if (enemy instanceof LaserEnemy) {
        const laserBounds = enemy.getLaserBounds();
        laserBounds.forEach(laserBound => {
          if (CollisionDetection.checkAABB(playerBounds, laserBound) && !this.isRespawning) {
            this.handlePlayerDeath();
          }
        });
      }
    });

    // Goal collision
    if (CollisionDetection.checkAABB(playerBounds, this.goalMarker.getBounds())) {
      this.handleLevelComplete();
    }
  }

  private handleUnlockPads() {
    const playerBounds = this.player.getBounds();
    const audioState = useAudio.getState();
    
    this.unlockPads.forEach((pad, index) => {
      if (CollisionDetection.checkAABB(playerBounds, pad.getBounds()) && !pad.isActivated) {
        pad.activate();
        audioState.playSuccess();
        
        // Deactivate corresponding barrier
        if (index < this.barriers.length) {
          this.barriers[index].deactivate();
        }
        
        console.log("Barrier unlocked!");
      }
    });
  }

  private handlePlayerDeath() {
    const gameState = useGameState.getState();
    const audioState = useAudio.getState();
    
    console.log("Player died!");
    audioState.playHit();
    gameState.loseLife();
    
    this.isRespawning = true;
    this.respawnTimer = 1.0; // 1 second respawn delay
  }

  private handleLevelComplete() {
    const gameState = useGameState.getState();
    const audioState = useAudio.getState();
    
    console.log("Level completed!");
    audioState.playSuccess();
    
    // Check if this is the final level (level 9)
    if (gameState.level >= 9) {
      gameState.completeLevel();
    } else {
      // Advance to next level
      gameState.nextLevel();
      this.setupLevel(); // Setup next level
    }
  }

  private handleBoundaries() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    // Player boundaries
    if (this.player.position.x < 0) {
      this.player.position.x = 0;
    }
    if (this.player.position.x + this.player.size.x > canvasWidth) {
      this.player.position.x = canvasWidth - this.player.size.x;
    }

    // Death by falling
    if (this.player.position.y > canvasHeight && !this.isRespawning) {
      this.handlePlayerDeath();
    }
  }

  private render() {
    // Clear canvas
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render platforms
    this.platforms.forEach(platform => platform.render(this.ctx));

    // Render teleport pads
    this.teleportPads.forEach(pad => pad.render(this.ctx));

    // Render unlock pads
    this.unlockPads.forEach(pad => pad.render(this.ctx));

    // Render barriers
    this.barriers.forEach(barrier => barrier.render(this.ctx));

    // Render goal marker
    this.goalMarker.render(this.ctx);

    // Render enemies
    this.enemies.forEach(enemy => enemy.render(this.ctx));

    // Render player (unless respawning)
    if (!this.isRespawning) {
      this.player.render(this.ctx);
    } else {
      // Flash effect during respawn
      if (Math.floor(this.respawnTimer * 10) % 2 === 0) {
        this.player.render(this.ctx);
      }
    }
  }

  handleResize() {
    // Reinitialize level with new canvas dimensions
    this.setupLevel();
  }

  reset() {
    this.isRespawning = false;
    this.respawnTimer = 0;
    // Reset unlock pads and barriers
    this.unlockPads.forEach(pad => pad.reset());
    this.barriers.forEach(barrier => barrier.reset());
    this.setupLevel();
  }
}
