import { Assets, Container, Graphics, Sprite, Text } from 'pixi.js';
// @ts-ignore
import { GAME_WIDTH } from '~/constants/gameConfig';
import { type Score, getHighScores } from '~/utils/highScores';

export class HighScoreModal extends Container {
  constructor(x: number, y: number, ms: Sprite, scores: Score[], onAfterClose: () => void) {
    super();

    // モーダル本体の位置調整(上端中央基準)
    this.pivot.set(ms.width / 2, 0);
    this.x = x;
    this.y = y;

    // モーダル用コンテナ
    const modalContainer = new Container();
    modalContainer.addChild(ms);

    // スコア表示
    const scoreTextStyle = {
      fontFamily: 'Chicago_Bold',
      fontSize: 10,
      wordWrap: false,
    };

    scores.forEach((score, index) => {
      const y = 62 + index * 12;
      const numberCol = new Text({
        text: `${index + 1}.`,
        style: {
          ...scoreTextStyle,
          align: 'right',
        },
      });
      numberCol.anchor.set(1, 0);
      numberCol.x = 60;
      numberCol.y = y;
      const nameCol = new Text({
        text: `${score.name}`,
        style: {
          ...scoreTextStyle,
          align: 'left',
          wordWrap: false,
        },
      });
      nameCol.x = numberCol.x + 11;
      nameCol.y = y;
      const nameTextMask = new Graphics()
        .rect(nameCol.x, nameCol.y, 130, nameCol.height * 2)
        .fill(0xffffff);
      nameCol.mask = nameTextMask;
      const levelCol = new Text({
        text: `Level ${score.value}`,
        style: {
          ...scoreTextStyle,
          align: 'left',
        },
      });
      levelCol.x = nameCol.x + 132;
      levelCol.y = y;
      modalContainer.addChild(numberCol, nameCol, nameTextMask, levelCol);
    });

    // 追加
    this.addChild(modalContainer);

    const clickHandler = () => {
      this.parent?.removeChild(this);
    };

    window.addEventListener('click', clickHandler);

    // モーダルが削除された時の処理
    this.on('removed', () => {
      // イベントリスナーを解除
      window.removeEventListener('click', clickHandler);
      onAfterClose();
    });
  }

  // 非同期ファクトリメソッドで生成
  static async create(onAfterClose: () => void): Promise<HighScoreModal> {
    const modalTextures = await Assets.load('./images/highscore.png');

    const modal = new Sprite(modalTextures);
    const scores = getHighScores();
    const x = GAME_WIDTH / 2;
    const y = 21;

    return new HighScoreModal(x, y, modal, scores, onAfterClose);
  }
}
