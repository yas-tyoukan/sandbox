import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage4Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 398, floor: 1 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(318, 1);
  }
  protected async initStage() {
    const margin = 54;
    this.addTeleportPad(GAME_WIDTH - margin, 1, 0, 1);
    this.addTeleportPad(GAME_WIDTH - margin, 2, 1, 0);
    this.addTeleportPad(margin, 2, 2, 3);
    this.addTeleportPad(203, 1, 3, 2);
    this.addTeleportPad(margin, 1, 4, 5);
    this.addTeleportPad(margin, 0, 5, 4);
    this.addForceFieldPad(GAME_WIDTH - margin, 0, 0);
    this.addForceField(274, 1, 0);
    this.addWall(362, 1);

    this.addEnemies([
      {
        type: 1,
        x: 38,
        floor: 2,
        bound: {
          left: 38,
          right: GAME_WIDTH - 26,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 100,
        floor: 1,
        bound: {
          left: 38,
          right: 244,
        },
        direction: -1,
      },
      {
        type: 1,
        x: 38,
        floor: 0,
        bound: {
          left: 96,
          right: 242,
        },
        direction: 1,
      },
      {
        type: 1,
        x: GAME_WIDTH - 30,
        floor: 0,
        bound: {
          left: GAME_WIDTH - 242,
          right: GAME_WIDTH - 242,
        },
        direction: -1,
      },
    ]);
  }

  protected override getStageNumber(): number {
    return 4;
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
