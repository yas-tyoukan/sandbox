import { Assets, Sprite } from 'pixi.js';

export class TextRobots extends Sprite {
  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<TextRobots> {
    const texture = await Assets.load('/images/text-robots.png');
    const s = new TextRobots(texture);
    s.x = x;
    s.y = y;
    return s;
  }
}
