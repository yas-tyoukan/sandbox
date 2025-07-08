import { Assets, Sprite, Texture } from 'pixi.js';

export class Beam extends Sprite {
  private constructor(texture: Texture) {
    super(texture);
    this.anchor.set(0.5, 0.5);
  }

  /**
   * direction: 1（右向き）, -1（左向き）
   */
  static async create(direction: number): Promise<Beam> {
    await Assets.load('/images/beam.png');
    const texture = Texture.from('/images/beam.png'); // ビームのテクスチャを取得
    console.log(texture.width, texture.height);
    const beam = new Beam(texture);
    beam.scale.x = direction; // 右向き: 1, 左向き: -1 で反転
    return beam;
  }
}
