import { Assets, Sprite, type Texture } from 'pixi.js';

export class ForceFieldPad extends Sprite {
  public readonly targetId: number;

  constructor(texture: Texture, targetId: number) {
    super(texture);
    this.targetId = targetId;
  }

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number, targetId: number): Promise<ForceFieldPad> {
    const texture = await Assets.load('./images/force-field-pad.png');
    const pad = new ForceFieldPad(texture, targetId);
    pad.x = x;
    pad.y = y;
    pad.anchor.set(0.5, 0); // 上端中央基準
    pad.pivot.y = 3; // 必要ならピクセル単位で微調整
    return pad;
  }
}
