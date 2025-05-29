import { Container, Graphics, Text } from 'pixi.js';

export class TeleportPad extends Container {
  public pairId: number;

  constructor(x: number, y: number, width: number, height: number, pairId: number) {
    super();
    this.pairId = pairId;
    this.width = width;
    this.height = height;

    const g = new Graphics();
    g.rect(0, 0, width, height);
    g.fill(0x2222ff);
    g.stroke({ width: 2, color: 0xffffff });
    this.addChild(g);

    const label = new Text({
      text: 'TELEPORT',
      style: {
        fontFamily: 'monospace',
        fontSize: 16,
        fill: 0xffffff,
      },
    });
    label.x = 8;
    label.y = -20;
    this.addChild(label);

    this.x = x;
    this.y = y;
  }
}
