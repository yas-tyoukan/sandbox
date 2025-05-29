import { Assets, Sprite } from 'pixi.js';

export class Player extends Sprite {
  // コンストラクタは非同期でテクスチャを読み込む
  static async create(): Promise<Player> {
    // 画像のパスはpublic/images/player.pngなど
    const texture = await Assets.load('/images/player.png');
    const player = new Player(texture);
    // 必要ならアンカーやスケールなど設定
    player.anchor.set?.(0.5); // PixiJS v8ではSpriteにもanchorあり
    return player;
  }

  // 必要なら追加のメソッドやプロパティをここに
}
