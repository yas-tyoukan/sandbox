import { Assets, Sprite } from 'pixi.js';

export class TextLevel extends Sprite {
  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<TextLevel> {
    const texture = await Assets.load('/images/text-robots.png');
    const s = new TextLevel(texture);
    s.x = x;
    s.y = y;
    return s;
  }
}
