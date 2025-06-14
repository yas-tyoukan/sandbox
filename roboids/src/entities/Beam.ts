import { AnimatedSprite, type Spritesheet } from 'pixi.js';

export class Beam extends AnimatedSprite {
  private constructor(textures: any[]) {
    super(textures);
    this.animationSpeed = 1;
    this.play();
  }

  /**
   * direction: 1（右向き）, -1（左向き）
   * spritesheet: ビームのアニメーションを含むSpritesheet
   */
  static async create(direction: number, spritesheet: Spritesheet): Promise<Beam> {
    // 必要ならここでawaitで非同期処理（例: スプライトシートのパース）も可能
    const animName = direction === 1 ? 'beam_right' : 'beam_left';
    const textures = spritesheet.animations[animName];
    if (!textures) {
      throw new Error(`Animation '${animName}' not found in spritesheet`);
    }
    return new Beam(textures);
  }
}
