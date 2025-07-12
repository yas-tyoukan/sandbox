import { Assets, Sprite } from 'pixi.js';

export class ForceFieldPad extends Sprite {
  public id: number | undefined;
  public toId: number | undefined;

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<ForceFieldPad> {
    const texture = await Assets.load('/images/force-field-pad.png');
    const pad = new ForceFieldPad(texture);
    pad.x = x;
    pad.y = y;
    pad.anchor.set(0.5, 0); // 上端中央基準
    pad.pivot.y = 3; // 必要ならピクセル単位で微調整
    return pad;
  }
}
