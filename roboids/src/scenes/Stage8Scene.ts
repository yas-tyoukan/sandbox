import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage8Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 160, floor: 0 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(100, 0);
  }
  protected async initStage() {
    const margin = 54;
    this.addTeleportPad(GAME_WIDTH - margin, 0, 0, 1);
    this.addTeleportPad(GAME_WIDTH - margin, 1, 1, 0);
    this.addTeleportPad(margin, 1, 2, 3);
    this.addTeleportPad(margin, 2, 3, 2);
    this.addTeleportPad(GAME_WIDTH - margin, 2, 4, 5);
    this.addTeleportPad(margin, 0, 5, 4);

    this.addWall(116, 0);

    // Enemy1の配置（各段中央付近で左右移動）
    this.addEnemies([
      {
        type: 5,
        x: 320,
        floor: 0,
        bound: {
          left: 318,
          right: GAME_WIDTH - 20,
        },
        direction: -1,
      }, // 最下段
      {
        type: 5,
        x: 266,
        floor: 1,
        bound: {
          leftMin: 63,
          leftMax: GAME_WIDTH - 15,
          right: GAME_WIDTH - 10,
        },
        direction: -1,
      }, // 中段
      {
        type: 2,
        x: 266,
        floor: 2,
        bound: {
          left: 96,
          right: GAME_WIDTH - 96,
        },
        direction: 1,
      }, // 最上段
    ]);
  }

  protected override getStageNumber(): number {
    return 8;
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
