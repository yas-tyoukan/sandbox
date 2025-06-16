import { Assets, type Spritesheet } from 'pixi.js';
import { ENEMY1_SPEED } from '~/constants/gameConfig';
import { EnemyBase } from '~/entities/EnemyBase';
import type { Bound, Direction } from '~/types/index';

export class Enemy1 extends EnemyBase {
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

    this.animationSpeed = 1;
    this.play();
  }

  static async create({
    bound: { leftMin, leftMax, left, rightMin, rightMax, right },
    direction,
    speed = ENEMY1_SPEED,
  }: {
    bound: Bound;
    direction: Direction;
    speed?: number;
  }) {
    const sheet: Spritesheet = await Assets.load('/images/enemy1.json');
    return new Enemy1(sheet, {
      bound: { leftMin, leftMax, left, rightMin, rightMax, right },
      direction,
      speed,
    });
  }
}
