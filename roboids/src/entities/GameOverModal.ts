import { Assets, Container, Sprite } from 'pixi.js';
import { GAME_OVER_MODAL_Y } from '~/constants/gameConfig';

export class GameOverModal extends Container {
  private sprites: Sprite[] = [];
  ok: Sprite;

  constructor(x: number, y: number, ms: Sprite, okNotSelected: Sprite, okSelected: Sprite) {
    super();
    // モーダル本体の位置調整(上端中央基準)
    this.pivot.set(ms.width / 2, 0);
    this.x = x;
    this.y = y;
    this.ok = okNotSelected;
    const modalContainer = new Container();
    modalContainer.addChild(ms);
    modalContainer.addChild(okNotSelected);
    okNotSelected.zIndex = 100;
    okNotSelected.x = (ms.width - okNotSelected.width) / 2;
    // TODO okボタンの位置、選択状態切り替え処理
    // modalContainer.addChild(ok);
    this.addChild(modalContainer);
  }

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<GameOverModal> {
    const modalTextures = await Assets.load('/images/game-over-modal.png');
    const okSheet = await Assets.load('/images/ok-button.json');
    const modal = new Sprite(modalTextures);
    const okNotSelected = new Sprite(okSheet.textures['image0.png']);
    const okSelected = new Sprite(okSheet.textures['image1.png']);
    // ok.cursor = 'pointer';
    // ok.on('pointerdown', () => {
    //   ok.texture = selectedTexture;
    // });
    // ok.on('keydown', () => {
    //   ok.texture = selectedTexture;
    // });
    // ok.on('pointerup', () => {
    //   ok.texture = notSelectedTexture;
    // });
    // ok.anchor.x = 0.5;
    // ok.x = modal.width / 2;
    // ok.y = 66;
    return new GameOverModal(x, y, modal, okNotSelected, okSelected);
  }

  // toggleOkButton(interactive: boolean) {
  //   this.ok.interactive = interactive;
  //   // ok.buttonMode = interactive;
  //   if (interactive) {
  //     this.ok.alpha = 1.0;
  //   } else {
  //     this.ok.alpha = 0.5;
  //   }
  // }
}
