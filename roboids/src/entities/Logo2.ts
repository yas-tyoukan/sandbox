import { Assets, Sprite } from 'pixi.js';

export class Logo2 extends Sprite {
  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<Logo2> {
    const texture = await Assets.load('/images/logo2.png');
    const s = new Logo2(texture);
    s.x = x;
    s.y = y;
    return s;
  }
}
