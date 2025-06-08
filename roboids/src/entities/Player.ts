import { AnimatedSprite, Assets } from 'pixi.js';

const animationSpeed = 0.4; // アニメーション速度

export class Player extends AnimatedSprite {
  static async create(): Promise<Player> {
    // スプライトシートを読み込む
    const sheet = await Assets.load('/images/player.json');
    // フレーム名リストを取得
    const frameNames = Object.keys(sheet.textures).sort(); // フレーム順に並べる
    const textures = frameNames.map((name) => sheet.textures[name]);
    // AnimatedSprite生成
    const player = new Player(textures);
    player.anchor.set?.(0.5);
    player.animationSpeed = animationSpeed;
    player.gotoAndStop(textures.length - 1); // 最後のフレームを表示
    player.loop = false;
    return player;
  }
  fadeOut() {
    // 逆再生のためにアニメーションを逆順に設定
    this.animationSpeed = -animationSpeed;
    this.gotoAndStop(this.textures.length - 1);
    this.play();
  }
  fadeIn() {
    // 通常の再生
    this.animationSpeed = animationSpeed;
    this.gotoAndStop(1);
    super.play();
  }
  // 追加メソッドやプロパティ
}
