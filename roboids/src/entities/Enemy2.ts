import { Assets, type Spritesheet } from 'pixi.js';
import { ENEMY2_SPEED } from '~/constants/gameConfig';
import { EnemyBase } from '~/entities/EnemyBase';
import type { Bound, Direction } from '~/types';
import { Beam } from './Beam';

export class Enemy2 extends EnemyBase {
  private isShooting = false;
  private beamFrameCount = 0;
  private beam: Beam;
  private isTurning: boolean;
  spriteSheet: Spritesheet;

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
    beam: Beam,
  ) {
    super(spriteSheet, { bound, direction, speed });
    this.beam = beam;
    this.spriteSheet = spriteSheet;
    this.isTurning = false;
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
    const beam = await Beam.create(direction);
    return new Enemy2(
      sheet,
      {
        bound: { leftMin, leftMax, left, rightMin, rightMax, right },
        direction,
        speed,
      },
      beam,
    );
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
        this.beam.visible = false;
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
      this.beam.position.set(this.x + this.width * 0.5 * this.direction, this.y);
      if (this.parent) this.parent.addChild(this.beam);
      this.beamFrameCount = 0;
      this.gotoAndStop(0);
      return;
    }
  }

  private updateAnimation() {
    if (this.isShooting) {
      this.textures = this.spriteSheet.animations['shoot_right'];
      this.gotoAndStop(0);
    } else if (this.isTurning) {
      this.textures = this.spriteSheet.animations['turn_right_to_left'];
      this.play();
    } else {
      this.textures = this.spriteSheet.animations['move_right'];
      this.play();
    }
    this.setDirectionScale();
  }

  private startTurning() {
    this.isTurning = true;
    this.textures = this.spriteSheet.animations['turn_right_to_left'];
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
