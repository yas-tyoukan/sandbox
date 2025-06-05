import { Assets, Sprite } from 'pixi.js';

export class TeleportPad extends Sprite {
  public pairId: number | undefined;

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number, pairId: number): Promise<TeleportPad> {
    const texture = await Assets.load('/images/teleport-pad.png');
    const pad = new TeleportPad(texture);
    pad.x = x;
    pad.y = y;
    pad.pairId = pairId;
    pad.anchor.set(0.5, 0); // 上端中央基準
    pad.pivot.y = 3; // 必要ならピクセル単位で微調整
    return pad;
  }
}
