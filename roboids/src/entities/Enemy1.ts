import * as PIXI from 'pixi.js';

export class Enemy1 extends PIXI.Container {
  private filament: PIXI.Graphics;

  constructor() {
    super();

    // 本体
    const body = new PIXI.Graphics();
    body.beginFill(0xffffff);
    body.drawRect(-20, 10, 40, 40);
    body.endFill();
    this.addChild(body);

    // 頭
    const head = new PIXI.Graphics();
    head.lineStyle(2, 0xffffff);
    head.drawCircle(0, 0, 20);
    this.addChild(head);

    // フィラメント
    this.filament = new PIXI.Graphics();
    this.filament.beginFill(0xffffff);
    this.filament.drawRect(-4, -8, 8, 16);
    this.filament.endFill();
    this.filament.y = 0;
    this.addChild(this.filament);

    // アンテナ
    const antennaLeft = new PIXI.Graphics();
    antennaLeft.lineStyle(2, 0xffffff);
    antennaLeft.moveTo(-14, -18);
    antennaLeft.lineTo(-28, -32);
    this.addChild(antennaLeft);

    const antennaRight = new PIXI.Graphics();
    antennaRight.lineStyle(2, 0xffffff);
    antennaRight.moveTo(14, -18);
    antennaRight.lineTo(28, -32);
    this.addChild(antennaRight);
  }

  // フィラメントのアニメーション
  public animateFilament(time: number) {
    this.filament.y = -10 + ((time * 60) % 40);
  }
}
