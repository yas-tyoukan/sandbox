import { AnimatedSprite, type Spritesheet } from 'pixi.js';

export class Enemy1 extends AnimatedSprite {
  private leftBound: number;
  private rightBound: number;
  private speed = 4;
  private direction = 1;

  constructor(
    spritesheet: Spritesheet,
    leftBound: number,
    rightBound: number,
    animationSpeed = 0.8,
  ) {
    // フレーム配列生成（Piskel出力形式に合わせて修正）
    const frameNames = Object.keys(spritesheet.textures);
    const textures = frameNames.map((name) => spritesheet.textures[name]);
    super(textures);
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.animationSpeed = animationSpeed;
    this.play();
  }

  updateMove() {
    this.x += this.speed * this.direction;
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
