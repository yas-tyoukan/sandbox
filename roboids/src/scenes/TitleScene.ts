import * as PIXI from 'pixi.js';
import { Enemy1 } from '../entities/Enemy1';

export class TitleScene extends PIXI.Container {
  private leftEnemy1: Enemy1;
  private rightEnemy1: Enemy1;
  private onStart: () => void;

  constructor(onStart: () => void) {
    super();
    this.onStart = onStart;

    // タイトルテキスト
    const title = new PIXI.Text('Roboids', {
      fontFamily: 'monospace',
      fontSize: 64,
      fill: 0xffffff,
      fontWeight: 'bold',
      align: 'center',
    });
    title.anchor.set(0.5);
    title.x = 400;
    title.y = 80;
    this.addChild(title);

    // ロボット生成
    this.leftEnemy1 = new Enemy1();
    this.leftEnemy1.x = 100;
    this.leftEnemy1.y = 200;
    this.addChild(this.leftEnemy1);

    this.rightEnemy1 = new Enemy1();
    this.rightEnemy1.x = 700;
    this.rightEnemy1.y = 200;
    this.addChild(this.rightEnemy1);

    // 背景クリック
    const bg = new PIXI.Graphics();
    bg.beginFill(0x000000);
    bg.drawRect(0, 0, 800, 600);
    bg.endFill();
    bg.eventMode = 'static';
    bg.cursor = 'pointer';
    bg.on('pointerdown', () => this.onStart());
    this.addChildAt(bg, 0);

    // キー入力
    window.addEventListener('keydown', this.onKeyDown);

    // アニメーション
    PIXI.Ticker.shared.add(this.animate, this);
  }

  private animate = (ticker: PIXI.Ticker) => {
    const t = performance.now() / 1000;
    this.leftEnemy1.y = 200 + Math.sin(t * 2) * 30;
    this.rightEnemy1.y = 200 + Math.cos(t * 2) * 30;
    this.leftEnemy1.animateFilament(t);
    this.rightEnemy1.animateFilament(t);
  };

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      this.onStart();
    }
  };

  public destroy(options?: boolean | PIXI.DestroyOptions) {
    window.removeEventListener('keydown', this.onKeyDown);
    PIXI.Ticker.shared.remove(this.animate, this);
    super.destroy(options);
  }
}
