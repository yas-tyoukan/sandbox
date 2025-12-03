import { Assets, Sprite } from 'pixi.js';

export class Logo1 extends Sprite {
  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<Logo1> {
    const texture = await Assets.load('./images/logo1.png');
    const s = new Logo1(texture);
    s.x = x;
    s.y = y;
    return s;
  }
}
