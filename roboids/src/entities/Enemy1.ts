import { AnimatedSprite, type Spritesheet } from 'pixi.js';
import { ENEMY1_SPEED } from '~/constants/gameConfig';

const speed = ENEMY1_SPEED;

export class Enemy1 extends AnimatedSprite {
  private leftBound: number;
  private rightBound: number;
  private direction: number;

  constructor(spritSsheet: Spritesheet, leftBound: number, rightBound: number, direction: number) {
    // フレーム配列生成
    const frameNames = Object.keys(spritSsheet.textures);
    const textures = frameNames.map((name) => spritSsheet.textures[name]);
    super(textures);
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.direction = direction;
    this.play();
  }

  updateMove() {
    this.x += speed * this.direction;
    if (this.x < this.leftBound) {
      this.x = this.leftBound;
      this.direction = 1;
    }
    if (this.x > this.rightBound) {
      this.x = this.rightBound;
      this.direction = -1;
    }
  }
}
