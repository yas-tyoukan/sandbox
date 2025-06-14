import { AnimatedSprite, type Spritesheet } from 'pixi.js';
import { ENEMY1_SPEED } from '~/constants/gameConfig';

const speed = ENEMY1_SPEED;

export class Enemy1 extends AnimatedSprite {
  private leftBound = 0;
  private rightBound = 0;
  private leftBoundMin: number;
  private leftBoundMax: number;
  private rightBoundMin: number;
  private rightBoundMax: number;
  private direction: number;

  constructor(
    spritSsheet: Spritesheet,
    {
      bound: { leftMin, leftMax, left, rightMin, rightMax, right },
      direction,
    }: {
      bound: {
        leftMin?: number;
        leftMax?: number;
        left?: number;
        rightMin?: number;
        rightMax?: number;
        right?: number;
      };
      direction: number;
    },
  ) {
    // フレーム配列生成
    const frameNames = Object.keys(spritSsheet.textures);
    const textures = frameNames.map((name) => spritSsheet.textures[name]);
    super(textures);
    this.animationSpeed = 1;
    this.play();

    // ランダム範囲保存
    this.leftBoundMin = leftMin ?? left ?? 0;
    this.leftBoundMax = leftMax ?? left ?? 0;
    this.rightBoundMin = rightMin ?? right ?? 0;
    this.rightBoundMax = rightMax ?? right ?? 0;

    // 初期値は範囲内でランダム
    this.resetBounds();
    this.direction = direction;
  }

  private getRandomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private resetBounds() {
    this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
    this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
  }

  updateMove() {
    this.x += speed * this.direction;

    // 左端に到達
    if (this.x < this.leftBound) {
      this.x = this.leftBound;
      this.direction = 1;
      // 次の往復のために右端・左端をランダムで更新
      this.resetBounds();
    }
    // 右端に到達
    if (this.x > this.rightBound) {
      this.x = this.rightBound;
      this.direction = -1;
      // 次の往復のために右端・左端をランダムで更新
      this.resetBounds();
    }
  }
}
