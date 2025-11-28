import { Assets, Container, Sprite, type Texture } from 'pixi.js';
// @ts-ignore
import { Button } from '@pixi/ui';

export class GameOverModal extends Container {
  okButton: Button;
  isOkButtonPressed = false;
  okButtonSprite: Sprite;

  constructor(x: number, y: number, ms: Sprite, okNotSelected: Texture, okSelected: Texture) {
    super();

    // モーダル本体の位置調整(上端中央基準)
    this.pivot.set(ms.width / 2, 0);
    this.x = x;
    this.y = y;

    // OKボタン画像本体
    this.okButtonSprite = new Sprite(okNotSelected);

    // OKボタン用の view（Sprite を入れる箱）
    const okButtonView = new Container();
    okButtonView.addChild(this.okButtonSprite);

    // PixiUI Button（skin を完全無効化）
    this.okButton = new Button(okButtonView, {
      // disableSkin: true,
    });

    // モーダル用コンテナ
    const modalContainer = new Container();
    modalContainer.addChild(ms);
    modalContainer.addChild(this.okButton.view);

    // OKボタンの配置
    okButtonView.x = (ms.width - okNotSelected.width) / 2;
    okButtonView.y = 66;

    // TODO: ボタンイベント処理

    // 押した（押し込み）
    this.okButton.onDown.connect(() => {
      console.log('OK button down');
      this.okButtonSprite.texture = okSelected;
    });

    // 押して離した
    this.okButton.onPress.connect(() => {
      console.log('OK button press');
      this.isOkButtonPressed = true;
      this.okButtonSprite.texture = okSelected;
    });

    // 指を離した瞬間
    this.okButton.onUp.connect(() => {
      console.log('OK button up');
      this.okButtonSprite.texture = okNotSelected;
    });

    // hover（カーソルが乗った）
    this.okButton.onHover.connect(() => {
      console.log('OK button hover');
      this.okButtonSprite.texture = okSelected;
    });

    // out（カーソルが外れた）
    this.okButton.onOut.connect(() => {
      console.log('OK button out');
      this.okButtonSprite.texture = okNotSelected;
    });

    // 追加
    this.addChild(modalContainer);
    console.log('cache?', this.cacheAsBitmap, this.parent?.cacheAsBitmap);
  }

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number): Promise<GameOverModal> {
    const modalTextures = await Assets.load('/images/game-over-modal.png');
    const okSheet = await Assets.load('/images/ok-button.json');

    const modal = new Sprite(modalTextures);

    const okNotSelected = okSheet.textures['image0.png'];
    const okSelected = okSheet.textures['image1.png'];

    return new GameOverModal(x, y, modal, okNotSelected, okSelected);
  }
}
