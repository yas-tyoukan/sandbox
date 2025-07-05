import { Assets, Sprite } from 'pixi.js';

export class TeleportPad extends Sprite {
  public id: number | undefined;
  public toId: number | undefined;

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number, id: number, toId: number): Promise<TeleportPad> {
    const texture = await Assets.load('/images/teleport-pad.png');
    const pad = new TeleportPad(texture);
    pad.x = x;
    pad.y = y;
    pad.id = id;
    pad.toId = toId;
    pad.anchor.set(0.5, 0); // 上端中央基準
    pad.pivot.y = 3; // 必要ならピクセル単位で微調整
    return pad;
  }
}
