import { Sprite, type Spritesheet, Texture } from 'pixi.js';

export class Beam extends Sprite {
  private constructor(texture: Texture) {
    super(texture);
  }

  /**
   * direction: 1（右向き）, -1（左向き）
   */
  static async create(direction: number): Promise<Beam> {
    const texture = Texture.from('/images/beam.png'); // ビームのテクスチャを取得
    const beam = new Beam(texture);
    beam.scale.x = direction; // 右向き: 1, 左向き: -1 で反転
    return beam;
  }
}
