import { Assets, type Spritesheet } from 'pixi.js';
import { ENEMY5_SPEED } from '~/constants/gameConfig';
import { EnemyBase } from '~/entities/EnemyBase';
import type { Bound, Direction } from '~/types/index';

export class Enemy5 extends EnemyBase {
  private lastDirection: number;

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
    this.textures = spriteSheet.animations[direction === 1 ? 'right' : 'left'];
    this.lastDirection = direction;
    this.animationSpeed = 1;
    this.play();
  }

  static async create({
    bound: { leftMin, leftMax, left, rightMin, rightMax, right },
    direction,
    speed = ENEMY5_SPEED,
  }: {
    bound: Bound;
    direction: Direction;
    speed?: number;
  }) {
    const sheet: Spritesheet = await Assets.load('/images/enemy5.json');
    return new Enemy5(sheet, {
      bound: { leftMin, leftMax, left, rightMin, rightMax, right },
      direction,
      speed,
    });
  }

  updateMove() {
    if (this.direction === this.lastDirection) {
      super.updateMove();
      return;
    }
    // 振り向きアニメーションを更新
    const key = this.direction === 1 ? 'right' : 'left';

    // @ts-ignore: animations[key] は string[] 前提で扱うためエラー抑制
    const frameNames: string[] = this.spriteSheet.animations[key];

    // frameNames からテクスチャ配列を作成
    const newFrames = frameNames.map((name) => this.spriteSheet.textures[name]);

    // 現在のテクスチャ名を探す（textures は Record<string, Texture>）
    const currentTexture = this.textures[this.currentFrame];
    const entries = Object.entries(this.spriteSheet.textures);
    const currentTextureName = entries.find(([_, tex]) => tex === currentTexture)?.[0];

    // 現在のテクスチャ名があればインデックス取得、なければ0
    let idx = 0;
    if (currentTextureName) {
      idx = frameNames.indexOf(currentTextureName);
      if (idx === -1) idx = 0;
    }

    this.textures = this.spriteSheet['animations'][key];
    this.gotoAndPlay(idx);
    this.lastDirection = this.direction;
  }
}
