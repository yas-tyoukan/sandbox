import { Assets, Container, Sprite, type Texture } from 'pixi.js';

export class GameOverModal extends Container {
  private sprites: Sprite[] = [];
  private okTex0: Texture;
  private okTex1: Texture;

  constructor(x: number, y: number, modalTextures: Sprite, okTex0: Sprite, okTex1: Sprite) {
    super();
    const ms = new Sprite(modalTextures);
    this.okTex0 = okTex0;
    this.okTex1 = okTex1;
    const ok = new Sprite(tex0);
    ok.cursor = 'pointer';
    ok.on('pointerdown', () => {
      ok.texture = tex1;
    });
    ok.on('pointerup', () => {
      ok.texture = tex0;
    });
    ok.anchor.x = 0.5;
    ok.x = ms.width / 2;
    ok.y = 66;

    this.x = x;
    this.y = y;
    this.sprites.push(ms);
    this.sprites.push(ok);
    this.ok = ok;
    this.addChild(...this.sprites);
  }

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<GameOverModal> {
    const modalTextures = await Assets.load('/images/game-over-modal.png');
    const okTex: Texture[] = await Assets.load('/images/ok-button.png');
    const okTex0 = okTex[0];
    const okTex1 = okTex[1];
    return new GameOverModal(x, y, modalTextures, okTex0, okTex1);
  }

  toggleOkButton(interactive: boolean) {
    this.ok.texture = this.ok.texture === this.okTex0 ? this.okTex1 : this.okTex0;
  }
}
