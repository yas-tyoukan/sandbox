import { Assets, Container, Sprite, Text } from 'pixi.js';
// @ts-ignore
import { Button } from '@pixi/ui';
import { GAME_WIDTH, STORAGE_KEY_HIGH_SCORES } from '~/constants/gameConfig';

type Score = {
  name: string;
  value: number;
};

const defaultScores: Score[] = [
  { name: 'Bob', value: 7 },
  { name: 'Chuck', value: 5 },
  { name: 'Cork', value: 4 },
  { name: 'Mondor', value: 4 },
  { name: 'Gunthor', value: 3 },
  { name: 'Katrina', value: 2 },
  { name: 'Verryl日本語あいうエオ書きくけこさしすせそさしすせそさしすせそ', value: 2 },
  { name: 'Evil Overlord', value: 1 },
  { name: 'Sprite', value: 1 },
  { name: 'Slicer', value: 1 },
];

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
        },
      });
      nameCol.x = numberCol.x + 20;
      nameCol.y = y;
      const levelCol = new Text({
        text: `Level ${score.value}`,
        style: {
          ...scoreTextStyle,
          align: 'left',
        },
      });
      levelCol.x = nameCol.x + 120;
      levelCol.y = y;
      modalContainer.addChild(numberCol, nameCol, levelCol);
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
    const rawScores = localStorage.getItem(STORAGE_KEY_HIGH_SCORES);
    const localScores = rawScores ? JSON.parse(rawScores) : null;
    // ローカル保存されたスコアが10件でなければデフォルトスコアを使う
    const scores: Score[] =
      localScores === null || localScores.length !== 10 ? defaultScores : localScores;
    const x = GAME_WIDTH / 2;
    const y = 21;

    return new HighScoreModal(x, y, modal, scores, onAfterClose);
  }
}
