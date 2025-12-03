import { DotFilter, GlitchFilter } from 'pixi-filters';
import { Assets, Container, Graphics, type Spritesheet, Text, Ticker } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { Enemy1 } from '~/entities/Enemy1';
import { Logo1 } from '~/entities/Logo1';
import { Logo2 } from '~/entities/Logo2';

export class TitleScene extends Container {
  private readonly onStart: (level: number) => void;
  private leftEnemy?: Enemy1;
  private rightEnemy?: Enemy1;
  private tickerFn!: (ticker: Ticker) => void;
  private frameBox!: Graphics;
  private animationState: { direction: number } = { direction: 1 };

  constructor(onStart: (level: number) => void, level = 1) {
    super();
    this.onStart = onStart;

    // 画面クリックでスタート
    this.eventMode = 'static';
    this.cursor = 'pointer';
    this.on('pointerdown', () => this.onStart(level));

    // キー入力でスタート
    window.addEventListener('keydown', this.handleKeyDown);

    // 非同期初期化
    this.init();
  }

  private async init() {
    // 中央の四角（タイトルボックス）を描画
    const boxWidth = 340;
    const boxHeight = 224;
    const boxX = (GAME_WIDTH - boxWidth) / 2;
    const boxY = (GAME_HEIGHT - boxHeight) / 2;

    this.frameBox = new Graphics();
    this.frameBox.rect(boxX, boxY, boxWidth, boxHeight);
    this.frameBox.fill(0x000000);
    this.frameBox.stroke({ width: 1, color: 0xffffff });
    this.addChild(this.frameBox);

    const border1 = new Graphics();
    border1.rect(boxX + 1, boxY + 1, boxWidth - 2, boxHeight - 2);
    border1.stroke({ width: 0.5, color: 0x000000 });
    const border2 = new Graphics();
    border2.rect(boxX + 3, boxY + 3, boxWidth - 6, boxHeight - 6);
    border2.stroke({ width: 0.5, color: 0xffffff });
    this.addChild(border1, border2);

    // タイトルロゴ
    const logo = await Logo1.create(178, 66);
    this.addChild(logo);

    // 操作説明
    const desc1 = new Text({
      text: `[   W   ]
[   A   ]
[   D   ]
[ SPACE ]`,
      style: {
        fontFamily: 'CourierPrime-Regular',
        fontSize: 12,
        fill: 0xffffff,
        align: 'left',
        lineHeight: 16,
      },
    });
    desc1.anchor.set(0, 0.5);
    desc1.x = 160;
    desc1.y = boxY + 105;
    this.addChild(desc1);

    const desc2 = new Text({
      text: `Jump
Left
Right
Activate Control Pad.`,
      style: {
        fontFamily: 'Chicago_Light',
        fontSize: 10,
        fill: 0xffffff,
        align: 'left',
        lineHeight: 16.2,
      },
    });
    desc2.anchor.set(0, 0.5);
    desc2.x = desc1.x + 70;
    desc2.y = desc1.y + 1;
    this.addChild(desc2);

    // ゲーム説明
    const object = new Text({
      text: `    Object: You must get the power square 
on each screen by maneuvering past the enemy 
Roboids. Once you pick up the power square 
you will be advanced to the next level.`,
      style: {
        fontFamily: 'CourierPrime-Regular',
        fontSize: 8,
        fill: 0xffffff,
        align: 'left',
      },
    });
    object.anchor.set(0.5);
    object.x = boxX + boxWidth / 2;
    object.y = boxY + 168;
    this.addChild(object);

    // 著作表示
    const credit = new Text({
      text: '©1991 Glenn Seemann\nPorted and modified by yas-tyoukan.\n',
      style: {
        fontFamily: 'Chicago_Light',
        fontSize: 8,
        fill: 0xffffff,
        align: 'center',
      },
    });
    credit.anchor.set(0.5);
    credit.x = boxX + boxWidth / 2;
    credit.y = boxY + boxHeight - 12;
    this.addChild(credit);

    // Enemy1配置
    const enemyMinY = boxY + 30;
    const enemyMaxY = boxY + boxHeight - 30;
    const enemySheet: Spritesheet = await Assets.load('./images/enemy1.json');
    // 左
    this.leftEnemy = await Enemy1.create({ bound: { left: 0, right: 0 }, direction: 0 });
    this.leftEnemy.anchor.set(0.5, 0.5);
    this.leftEnemy.x = boxX + 30;
    this.leftEnemy.y = boxY + 30;
    this.leftEnemy.animationSpeed = 0.4;
    this.addChild(this.leftEnemy);

    // 右
    this.rightEnemy = await Enemy1.create({ bound: { left: 0, right: 0 }, direction: 0, speed: 0 });
    this.rightEnemy.anchor.set(0.5, 0.5);
    this.rightEnemy.x = boxX + boxWidth - 30;
    this.rightEnemy.y = boxY + boxHeight - 30;
    this.rightEnemy.animationSpeed = 0.4;
    this.addChild(this.rightEnemy);

    // アニメーション用Ticker
    this.tickerFn = () => {
      const { direction } = this.animationState;
      // 左Enemy1
      if (this.leftEnemy) {
        this.leftEnemy.y += direction * 0.5;
        if (this.leftEnemy.y > enemyMaxY) {
          this.leftEnemy.y = enemyMaxY;
          this.animationState.direction = -1;
        } else if (this.leftEnemy.y < enemyMinY) {
          this.leftEnemy.y = enemyMinY;
          this.animationState.direction = 1;
        }
      }

      // 右Enemy1
      if (this.rightEnemy) {
        this.rightEnemy.y -= direction * 0.5;
      }
    };
    Ticker.shared.add(this.tickerFn, this);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      this.onStart(1);
    }
  };

  override destroy(options?: boolean | import('pixi.js').DestroyOptions) {
    window.removeEventListener('keydown', this.handleKeyDown);
    Ticker.shared.remove(this.tickerFn, this);
    super.destroy(options);
  }
}
