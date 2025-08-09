import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage4Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 399, floor: 1 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(318, 1);
  }
  protected async initStage() {
    this.addTeleportPad(455, 1, 0, 1);
    this.addTeleportPad(455, 2, 1, 0);
    this.addTeleportPad(55, 2, 2, 3);
    this.addTeleportPad(203, 1, 3, 2);
    this.addTeleportPad(55, 1, 4, 5);
    this.addTeleportPad(55, 0, 5, 4);
    this.addForceFieldPad(455, 0, 0);
    this.addForceField(275, 1, 0);
    this.addWall(360, 1);

    this.addEnemies([
      {
        type: 1,
        x: 44,
        floor: 2,
        bound: {
          left: 39,
          right: 479,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 94,
        floor: 1,
        bound: {
          left: 34,
          right: 244,
        },
        direction: -1,
      },
      {
        type: 1,
        x: 44,
        floor: 0,
        bound: {
          left: 34,
          right: 244,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 474,
        floor: 0,
        bound: {
          left: 274,
          right: 484,
        },
        direction: -1,
      },
    ]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
