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
    this.setDirectionScale();
    this.updateAnimation();
    this.scale.x = this.direction;
    this.loop = false;
  }

  static async create({
    bound,
    direction,
    speed = ENEMY2_SPEED,
  }: {
    bound: Bound;
    direction: Direction;
    speed?: number;
  }) {
    const sheet: Spritesheet = await Assets.load('/images/enemy2.json');
    const beam = await Beam.create(direction);
    return new Enemy2(sheet, { bound, direction, speed }, beam);
  }

  private setDirectionScale() {
    this.scale.x = this.direction;
  }

  // 振り向きアニメーションの開始
  private startTurning() {
    this.isTurning = true;
    if (this.direction === 1) {
      // 右→左
      this.textures = this.spriteSheet.animations['turn_right_to_left'];
    } else {
      // 左→右
      this.textures = this.spriteSheet.animations['turn_left_to_right'];
    }
    this.play();
    this.onComplete = () => {
      this.isTurning = false;
      this.direction *= -1;
      this.updateAnimation();
      this.onComplete = undefined;
    };
  }

  // アニメーション切り替え
  private updateAnimation() {
    if (this.isTurning) return;
    if (this.direction === 1) {
      this.textures = this.spriteSheet.animations['move_right'];
    } else {
      this.textures = this.spriteSheet.animations['move_left'];
    }
    this.play();
  }

  // 移動処理のオーバーライド
  updateMove() {
    if (this.isTurning) return; // 振り向き中は何もしない

    // 端に到達したら振り向き開始
    if (this.direction === 1 && this.x > this.rightBound) {
      this.x = this.rightBound;
      this.startTurning();
      return;
    }
    if (this.direction === -1 && this.x < this.leftBound) {
      this.x = this.leftBound;
      this.startTurning();
      return;
    }

    // 通常移動
    this.x += this.speed * this.direction;
    this.updateAnimation();
  }
}
