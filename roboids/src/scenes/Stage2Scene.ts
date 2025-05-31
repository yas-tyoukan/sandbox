// src/scenes/Stage2Scene.ts
import { Assets, Graphics, type Spritesheet } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { Enemy1 } from '~/entities/Enemy1';
import { Goal } from '~/entities/Goal';
import { Player } from '~/entities/Player';
import { TeleportPad } from '~/entities/TeleportPad';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage2Scene extends BaseStageScene {
  protected async initStage() {
    // プラットフォーム設計
    const platformHeight = 12;
    const margin = 24;
    const platformWidth = GAME_WIDTH - margin * 2;
    // 各段のY座標
    const platformYs = [
      GAME_HEIGHT - margin - platformHeight, // 最下段
      Math.round(GAME_HEIGHT / 2) - platformHeight / 2, // 中段
      margin, // 最上段
    ];
    this.platforms = [
      { x: margin, y: platformYs[0], width: platformWidth, height: platformHeight },
      { x: margin, y: platformYs[1], width: platformWidth, height: platformHeight },
      { x: margin, y: platformYs[2], width: platformWidth, height: platformHeight },
    ];

    // プラットフォーム描画
    for (const p of this.platforms) {
      const g = new Graphics();
      g.rect(p.x, p.y, p.width, p.height);
      g.fill(0xffffff);
      this.addChild(g);
    }

    // TELEPORT床設計＆配置
    const teleportWidth = 60;
    const teleportHeight = platformHeight;
    this.teleports = [
      new TeleportPad(margin, platformYs[2], teleportWidth, teleportHeight, 1), // 最上段左
      new TeleportPad(
        GAME_WIDTH - margin - teleportWidth,
        platformYs[2],
        teleportWidth,
        teleportHeight,
        2,
      ), // 最上段右
      new TeleportPad(
        GAME_WIDTH - margin - teleportWidth,
        platformYs[1],
        teleportWidth,
        teleportHeight,
        1,
      ), // 中段右
      new TeleportPad(margin, platformYs[1], teleportWidth, teleportHeight, 2), // 中段左
      new TeleportPad(
        GAME_WIDTH - margin - teleportWidth,
        platformYs[0],
        teleportWidth,
        teleportHeight,
        3,
      ), // 最下段右
      new TeleportPad(margin, platformYs[0], teleportWidth, teleportHeight, 3), // 最下段左
    ];
    for (const pad of this.teleports) {
      this.addChild(pad);
    }

    // ゴールマーカー設置（仮：最下段右端に設置）
    this.goal = new Goal(GAME_WIDTH - margin - 32, platformYs[0] - 32);
    this.addChild(this.goal);

    // プレイヤー（最下段左端に設置）
    this.player = await Player.create();
    this.player.x = margin + 8;
    this.player.y = platformYs[0] - this.player.height;
    this.addChild(this.player);

    // Enemy1の配置（各段中央付近で左右移動）
    const enemySheet: Spritesheet = await Assets.load('/images/enemy1.json');
    const enemyMoveMargin = 80;
    const enemyPositions = [
      {
        x: GAME_WIDTH / 2,
        y: platformYs[2] - 32,
        left: margin + enemyMoveMargin,
        right: GAME_WIDTH - margin - enemyMoveMargin,
      }, // 最上段
      {
        x: GAME_WIDTH / 2,
        y: platformYs[1] - 32,
        left: margin + enemyMoveMargin,
        right: GAME_WIDTH - margin - enemyMoveMargin,
      }, // 中段
      {
        x: GAME_WIDTH / 2,
        y: platformYs[0] - 32,
        left: margin + enemyMoveMargin,
        right: GAME_WIDTH - margin - enemyMoveMargin,
      }, // 最下段
      {
        x: GAME_WIDTH / 2 + 50,
        y: platformYs[0] - 32,
        left: margin + enemyMoveMargin,
        right: GAME_WIDTH - margin - enemyMoveMargin,
      }, // 最下段
    ];
    for (const pos of enemyPositions) {
      const enemy = new Enemy1(enemySheet, pos.left, pos.right);
      enemy.x = pos.x;
      enemy.y = pos.y;
      this.enemies.push(enemy);
      this.addChild(enemy);
    }
  }

  protected getStageNumber(): number {
    return 2;
  }
}
