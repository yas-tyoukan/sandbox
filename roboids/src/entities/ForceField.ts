import { AnimatedSprite, Assets, Container, type Spritesheet, type Texture } from 'pixi.js';

export class ForceField extends Container {
  private sprites: AnimatedSprite[] = [];
  private static FRAME_HEIGHT = 6; // 1段の高さ（px）
  /**
   * ForceFieldクラスのコンストラクタ
   * @param frames - アニメーションフレームのテクスチャ配列
   * @param height - ForceFieldの高さ
   */
  private constructor(frames: Texture[], height: number) {
    super();
    const count = Math.ceil(height / ForceField.FRAME_HEIGHT);
    for (let i = 0; i < count; i++) {
      const anim = new AnimatedSprite(frames);
      anim.y = i * ForceField.FRAME_HEIGHT;
      anim.animationSpeed = 1.8;
      anim.loop = true;
      anim.play();
      this.addChild(anim);
      this.sprites.push(anim);
    }
    this.width = frames[0].width;
    this.height = height;
  }
  static async create(height: number): Promise<ForceField> {
    const sheet: Spritesheet = await Assets.load('/images/force-field.json');
    const frames = Object.keys(sheet.textures)
      .sort()
      .map((name) => sheet.textures[name]);
    return new ForceField(frames, height);
  }
}
