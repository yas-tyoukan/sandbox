import { Assets, type Spritesheet } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { PowerSquare } from '~/entities/PowerSquare';
import { TeleportPad } from '~/entities/TeleportPad';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage2Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー（最下段左端に設置）
    await this.addPlayer({ x: 28, y: GAME_HEIGHT - 40 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置（最上段右端に設置）
    this.goal = await PowerSquare.create(GAME_WIDTH - 52, this.platformYs[2] - 26);
    this.addChild(this.goal);
  }
  protected async initStage() {
    // // TELEPORT床設計＆配置
    // const teleportWidth = 60;
    // const teleportHeight = platformHeight;
    // this.teleports = [
    //   new TeleportPad(margin, platformYs[2], teleportWidth, teleportHeight, 1), // 最上段左
    //   new TeleportPad(
    //     GAME_WIDTH - margin - teleportWidth,
    //     platformYs[2],
    //     teleportWidth,
    //     teleportHeight,
    //     2,
    //   ), // 最上段右
    //   new TeleportPad(
    //     GAME_WIDTH - margin - teleportWidth,
    //     platformYs[1],
    //     teleportWidth,
    //     teleportHeight,
    //     1,
    //   ), // 中段右
    //   new TeleportPad(margin, platformYs[1], teleportWidth, teleportHeight, 2), // 中段左
    //   new TeleportPad(
    //     GAME_WIDTH - margin - teleportWidth,
    //     platformYs[0],
    //     teleportWidth,
    //     teleportHeight,
    //     3,
    //   ), // 最下段右
    //   new TeleportPad(margin, platformYs[0], teleportWidth, teleportHeight, 3), // 最下段左
    // ];
    // for (const pad of this.teleports) {
    //   this.addChild(pad);
    // }
    // Enemy1の配置（各段中央付近で左右移動）
    // const enemySheet: Spritesheet = await Assets.load('/images/enemy1.json');
    // const enemyMoveMargin = 80;
    // const enemyPositions = [
    //   {
    //     x: GAME_WIDTH / 2,
    //     y: this.platformYs[0] - 24,
    //     left: 20 + enemyMoveMargin,
    //     right: GAME_WIDTH - 20 - enemyMoveMargin,
    //   }, // 最下段
    //   {
    //     x: GAME_WIDTH / 2,
    //     y: this.platformYs[1] - 24,
    //     left: 70 + enemyMoveMargin,
    //     right: GAME_WIDTH - 80 - enemyMoveMargin,
    //   }, // 中段
    //   {
    //     x: GAME_WIDTH / 2,
    //     y: this.platformYs[2] - 24,
    //     left: 20 + enemyMoveMargin,
    //     right: GAME_WIDTH - 20 - enemyMoveMargin,
    //   }, // 最上段
    // ];
    // this.addEnemies({ sheet: enemySheet, positions: enemyPositions });
  }

  protected override getStageNumber(): number {
    return 2;
  }

  protected override restartStage() {
    this.initPlayer();
  }
}
