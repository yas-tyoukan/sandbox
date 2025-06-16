import { Assets, type Spritesheet } from 'pixi.js';
import { ENEMY2_SPEED } from '~/constants/gameConfig';
import { EnemyBase } from '~/entities/EnemyBase';
import type { Bound, Direction } from '~/types';
import { Beam } from './Beam';

export class Enemy2 extends EnemyBase {
  private isShooting = false;
  private beamFrameCount = 0;

  private constructor(
    spriteSheet: Spritesheet,
    {
      bound,
      direction,
      speed,
    }: {
      bound: Bound;
      direction: Direction;
      speed?: number;
    },
  ) {
    super(spriteSheet, { bound, direction, speed });
  }

  static async create({
    bound: { leftMin, leftMax, left, rightMin, rightMax, right },
    direction,
    speed = ENEMY2_SPEED,
  }: {
    bound: Bound;
    direction: Direction;
    speed?: number;
  }) {
    const sheet: Spritesheet = await Assets.load('/images/enemy2.json');
    return new Enemy2(sheet, {
      bound: { leftMin, leftMax, left, rightMin, rightMax, right },
      direction,
      speed,
    });
  }

  private setDirectionScale() {
    // 右向き: scale.x=1, 左向き: scale.x=-1
    this.scale.x = this.direction;
  }

  async updateMove() {
    super.updateMove();
    if (this.isShooting) {
      this.beamFrameCount++;
      if (this.beamFrameCount >= 20) {
        if (this.beam && this.beam.parent) {
          this.beam.parent.removeChild(this.beam);
        }
        this.beam = null;
        this.isShooting = false;
        this.beamFrameCount = 0;
        this.updateAnimation();
      }
      return;
    }

    if (this.isTurning) return;

    // ランダムでビーム発射判定（1/10）
    if (Math.random() < 0.1) {
      this.isShooting = true;
      this.beam = await Beam.create(this.direction, this.spritesheet);
      this.beam.position.set(this.x + this.width * 0.5 * this.direction, this.y);
      if (this.parent) this.parent.addChild(this.beam);
      beams.push(this.beam);
      this.beamFrameCount = 0;
      this.gotoAndStop(0);
      return;
    }

    // 通常移動
    const speed = 2;
    this.x += speed * this.direction;

    if (this.direction === 1 && this.x > this.rightBound) {
      this.x = this.rightBound;
      this.startTurning();
      this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
      this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
    }
    if (this.direction === -1 && this.x < this.leftBound) {
      this.x = this.leftBound;
      this.startTurning();
      this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
      this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
    }
  }

  private updateAnimation() {
    if (this.isShooting) {
      this.textures = this.spritesheet.animations['shoot_right'];
      this.gotoAndStop(0);
    } else if (this.isTurning) {
      this.textures = this.spritesheet.animations['turn_right_to_left'];
      this.play();
    } else {
      this.textures = this.spritesheet.animations['move_right'];
      this.play();
    }
    this.setDirectionScale();
  }

  private startTurning() {
    this.isTurning = true;
    this.textures = this.spritesheet.animations['turn_right_to_left'];
    this.loop = false;
    this.play();
    this.setDirectionScale();
    this.onComplete = () => {
      this.isTurning = false;
      this.direction *= -1;
      this.loop = true;
      this.updateAnimation();
      this.onComplete = undefined;
    };
  }
}
