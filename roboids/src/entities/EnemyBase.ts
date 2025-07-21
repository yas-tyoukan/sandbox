import { AnimatedSprite, type Spritesheet } from 'pixi.js';
import type { Bound, Direction } from '~/types/index';
import type { Player } from './Player';

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

    this.direction = direction;
    this.leftBound = this.leftBoundMin;
    this.rightBound = this.rightBoundMax;
  }

  private getRandomInRange(min: number, max: number): number {
    const step = 5; // 5px単位でランダム
    return min + step * Math.floor(Math.random() * (Math.floor((max - min) / step) + 1));
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

  isHitPlayer(player: Player) {
    // プレイヤー
    const pAnchorX = player.anchor?.x ?? 0;
    const pAnchorY = player.anchor?.y ?? 0;
    const playerCenterX = player.x + player.width * pAnchorX;
    const playerCenterY = player.y + player.height * pAnchorY;
    // 敵
    const eAnchorX = this.anchor?.x ?? 0;
    const eAnchorY = this.anchor?.y ?? 0;
    const thisCenterX = this.x + this.width * eAnchorX;
    const thisCenterY = this.y + this.height * eAnchorY;

    // x方向の当たり判定
    const halfW = (player.width + this.width) / 2;
    const isTouchingX = Math.abs(playerCenterX - thisCenterX) < halfW;

    // y方向の当たり判定
    const dy = playerCenterY - thisCenterY;
    // プレイヤーが敵より上にいる場合と下にいる場合(フロアが異なる場合)で当たり判定の範囲を調整している
    const isTouchingY =
      dy < 0 ? -dy < (player.height + this.height + 14) / 2 : dy < this.height / 2;

    return isTouchingY && isTouchingX;
  }
}
