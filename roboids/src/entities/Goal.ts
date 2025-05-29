import { Container, Graphics } from 'pixi.js';

export class Goal extends Container {
  constructor(x: number, y: number) {
    super();
    // 仮の見た目（黄色い円）
    const g = new Graphics();
    g.circle(0, 0, 24);
    g.fill(0xffff00);
    this.addChild(g);

    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 48;
  }
}
