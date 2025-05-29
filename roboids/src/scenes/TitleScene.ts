import { Assets, Container, type Spritesheet, Ticker } from 'pixi.js';
import { Enemy1 } from '../entities/Enemy1';

export class TitleScene extends Container {
  private onStart: () => void;
  private leftEnemy?: Enemy1;
  private rightEnemy?: Enemy1;
  private tickerFn!: (ticker: Ticker) => void;

  constructor(onStart: () => void) {
    super();
    this.onStart = onStart;

    // 画面クリックでスタート
    this.eventMode = 'static';
    this.cursor = 'pointer';
    this.on('pointerdown', () => this.onStart());

    // キー入力でスタート
    window.addEventListener('keydown', this.handleKeyDown);

    // 非同期初期化
    this.init();
  }

  private async init() {
    const enemySheet: Spritesheet = await Assets.load('/images/enemy1.json'); // 左右にEnemy1を配置
    this.leftEnemy = new Enemy1(enemySheet, 150, 650);
    this.leftEnemy.x = 200;
    this.leftEnemy.y = 300;
    this.addChild(this.leftEnemy);

    this.rightEnemy = new Enemy1(enemySheet, 450, 650);
    this.rightEnemy.x = 600;
    this.rightEnemy.y = 300;
    this.addChild(this.rightEnemy);

    // アニメーション用Ticker
    this.tickerFn = (ticker: Ticker) => {
      const t = performance.now() / 1000;
      if (this.leftEnemy) {
        this.leftEnemy.y = 300 + Math.sin(t * 2) * 40;
      }
      if (this.rightEnemy) {
        this.rightEnemy.y = 300 + Math.cos(t * 2) * 40;
      }
    };
    Ticker.shared.add(this.tickerFn, this);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      this.onStart();
    }
  };

  override destroy(options?: boolean | import('pixi.js').DestroyOptions) {
    window.removeEventListener('keydown', this.handleKeyDown);
    Ticker.shared.remove(this.tickerFn, this);
    super.destroy(options);
  }
}
