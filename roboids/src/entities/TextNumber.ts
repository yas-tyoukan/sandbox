import { Assets, Container, Sprite, Texture, Rectangle } from 'pixi.js';

const digitWidth = 7;
const digitHeight = 9;

export class TextNumber extends Container {
  private digitTextures: Texture[];
  private sprites: Sprite[] = [];

  constructor(digitTextures: Texture[], x: number, y: number, value: number) {
    super();
    this.digitTextures = digitTextures;
    this.x = x;
    this.y = y;
    this.setValue(value);
  }

  static async create(x: number, y: number, value: number): Promise<TextNumber> {
    const texture = (await Assets.load('./images/text-numbers.png')) as Texture;
    const digitTextures: Texture[] = [];
    for (let i = 0; i < 10; i++) {
      digitTextures.push(
        new Texture({
          source: texture.source,
          frame: new Rectangle(i * digitWidth, 0, digitWidth, digitHeight),
        }),
      );
    }
    return new TextNumber(digitTextures, x, y, value);
  }

  setValue(value: number): void {
    this.removeChildren();
    this.sprites = [];
    const digits = String(Math.max(0, value)).split('');
    for (let i = 0; i < digits.length; i++) {
      const sprite = new Sprite(this.digitTextures[Number.parseInt(digits[i])]);
      sprite.x = i * digitWidth;
      sprite.y = 0;
      this.addChild(sprite);
      this.sprites.push(sprite);
    }
  }
}
