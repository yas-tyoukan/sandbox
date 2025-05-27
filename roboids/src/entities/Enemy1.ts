import { AnimatedSprite, type Spritesheet } from 'pixi.js';

export class Enemy1 extends AnimatedSprite {
  constructor(spritesheet: Spritesheet) {
    // すべてのフレーム名を配列で取得
    const frameNames = Object.keys(spritesheet.textures);
    const textures = frameNames.map((name) => spritesheet.textures[name]);

    super(textures);
    this.animationSpeed = 0.1;
    this.play();
  }
}
