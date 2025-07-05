import { AnimatedSprite, type Spritesheet } from 'pixi.js';
import type { Bound, Direction } from '~/types/index';

export abstract class EnemyBase extends AnimatedSprite {
  protected leftBound = 0;
  protected rightBound = 0;
  protected leftBoundMin: number;
  protected leftBoundMax: number;
  protected rightBoundMin: number;
  protected rightBoundMax: number;
  protected direction: number;
  protected speed: number;

  protected constructor(
    spriteSheet: Spritesheet,
    {
      bound: { leftMin, leftMax, left, rightMin, rightMax, right },
      direction,
      speed = 0,
    }: {
      bound: Bound;
      direction: Direction;
      speed?: number;
    },
  ) {
    // フレーム配列生成
    const frameNames = Object.keys(spriteSheet.textures);
    const textures = frameNames.map((name) => spriteSheet.textures[name]);
    super(textures);

    // ランダム範囲保存
    this.leftBoundMin = leftMin ?? left ?? 0;
    this.leftBoundMax = leftMax ?? left ?? 0;
    this.rightBoundMin = rightMin ?? right ?? 0;
    this.rightBoundMax = rightMax ?? right ?? 0;

    this.speed = speed;

    // 初期値は範囲内でランダム
    this.resetBounds();
    this.direction = direction;
  }

  private getRandomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  private resetBounds() {
    this.resetLeftBound();
    this.resetRightBound();
  }
  private resetLeftBound() {
    this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
  }
  private resetRightBound() {
    this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
  }

  updateMove() {
    this.x += this.speed * this.direction;

    // 左端に到達
    if (this.x < this.leftBound) {
      this.x = this.leftBound;
      this.direction = 1;
      this.resetRightBound();
    }
    // 右端に到達
    if (this.x > this.rightBound) {
      this.x = this.rightBound;
      this.direction = -1;
      this.resetLeftBound();
    }
  }
}
