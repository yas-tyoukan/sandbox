import { AnimatedSprite, Assets, type Spritesheet } from 'pixi.js';

export class PowerSquare extends AnimatedSprite {
  static async create(x: number, y: number): Promise<PowerSquare> {
    // スプライトシートをロード
    const sheet: Spritesheet = await Assets.load('./images/power-square.json');
    const frameNames = Object.keys(sheet.textures);
    const textures = frameNames.map((name) => sheet.textures[name]);
    const anim = new PowerSquare(textures);

    anim.x = x;
    anim.y = y;
    anim.anchor.set(0.5, 1); // 下端中央基準
    anim.pivot.y = 5; // 必要ならピクセル単位で微調整
    anim.animationSpeed = 0.5; // アニメ速度（お好みで調整）
    anim.play();

    return anim;
  }

  // 必要なら追加のロジックやプロパティをここに
}
