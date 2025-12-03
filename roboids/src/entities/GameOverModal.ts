import { Assets, Container, Sprite, type Texture } from 'pixi.js';
// @ts-ignore
import { Button } from '@pixi/ui';

export class GameOverModal extends Container {
  okButton: Button;
  isOkButtonPressed = false;
  okButtonSprite: Sprite;

  constructor(
    x: number,
    y: number,
    ms: Sprite,
    okNotSelected: Texture,
    okSelected: Texture,
    onAfterClose: () => void,
  ) {
    super();

    // モーダル本体の位置調整(上端中央基準)
    this.pivot.set(ms.width / 2, 0);
    this.x = x;
    this.y = y;

    // OKボタン画像本体
    this.okButtonSprite = new Sprite(okNotSelected);

    // OKボタン用の view
    const okButtonView = new Container();
    okButtonView.addChild(this.okButtonSprite);

    // PixiUI Button
    this.okButton = new Button(okButtonView);

    // モーダル用コンテナ
    const modalContainer = new Container();
    modalContainer.addChild(ms);
    modalContainer.addChild(this.okButton.view);

    // OKボタンの設定
    okButtonView.x = (ms.width - okNotSelected.width) / 2;
    okButtonView.y = 66;

    // 押した（押し込み）
    this.okButton.onDown.connect(() => {
      this.okButtonSprite.texture = okSelected;
      this.isOkButtonPressed = true;
    });

    // 離した
    this.okButton.onUp.connect(() => {
      this.isOkButtonPressed = false;
    });

    // 押して離した
    this.okButton.onPress.connect(() => {
      this.isOkButtonPressed = true;
      this.okButtonSprite.texture = okNotSelected;
      this.parent?.removeChild(this);
    });

    // out（カーソルが外れた）
    this.okButton.onOut.connect(() => {
      this.okButtonSprite.texture = okNotSelected;
    });

    // out（カーソルが入った）
    this.okButton.onHover.connect(() => {
      if (!this.isOkButtonPressed) return;
      this.okButtonSprite.texture = okSelected;
    });

    // エンターキーでの操作にも対応
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      this.okButtonSprite.texture = okSelected;
    };

    const keyupHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      this.okButtonSprite.texture = okNotSelected;
      this.parent?.removeChild(this);
    };

    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);

    // モーダルが削除された時の処理
    this.on('removed', () => {
      // イベントリスナーを解除
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keyup', keyupHandler);
      onAfterClose();
    });

    // 追加
    this.addChild(modalContainer);
  }

  // 非同期ファクトリメソッドで生成
  static async create(x: number, y: number, onAfterClose: () => void): Promise<GameOverModal> {
    const modalTextures = await Assets.load('./images/game-over-modal.png');
    const okSheet = await Assets.load('./images/ok-button.json');

    const modal = new Sprite(modalTextures);

    const okNotSelected = okSheet.textures['image0.png'];
    const okSelected = okSheet.textures['image1.png'];

    return new GameOverModal(x, y, modal, okNotSelected, okSelected, onAfterClose);
  }
}
