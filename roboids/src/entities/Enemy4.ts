import { Assets, type Spritesheet } from 'pixi.js';
import { ENEMY4_SPEED } from '~/constants/gameConfig';
import { EnemyBase } from '~/entities/EnemyBase';
import type { Bound, Direction } from '~/types/index';

export class Enemy4 extends EnemyBase {
  private constructor(
    spriteSheet: Spritesheet,
    {
      bound,
      direction,
      speed,
    }: {
      bound: Bound;
      direction: Direction;
      speed?: number;
    },
  ) {
    super(spriteSheet, { bound, direction, speed });
    this.textures = spriteSheet.animations['default'];
    this.animationSpeed = 1;
    this.play();
  }

  static async create({
    bound: { leftMin, leftMax, left, rightMin, rightMax, right },
    direction,
    speed = ENEMY4_SPEED,
  }: {
    bound: Bound;
    direction: Direction;
    speed?: number;
  }) {
    const sheet: Spritesheet = await Assets.load('/images/enemy4.json');
    return new Enemy4(sheet, {
      bound: { leftMin, leftMax, left, rightMin, rightMax, right },
      direction,
      speed,
    });
  }
}
