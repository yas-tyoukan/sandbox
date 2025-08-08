import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage5Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 33, floor: 2 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(GAME_WIDTH - 42, 0);
  }
  protected async initStage() {
    this.addTeleportPad(90, 2, 0, 1);
    this.addTeleportPad(55, 1, 1, 0);
    this.addTeleportPad(GAME_WIDTH - 55, 1, 2, 3);
    this.addTeleportPad(55, 0, 3, 2);
    this.addTeleportPad(129, 0, 4, 5);
    this.addTeleportPad(GAME_WIDTH - 129, 2, 5, 4);
    this.addForceFieldPad(305, 2, 0);
    this.addForceField(98, 1, 0);
    this.addSleepPad(GAME_WIDTH - 55, 2);
    this.addWall(GAME_WIDTH - 170, 2);

    this.addEnemies([
      {
        type: 1,
        x: 119,
        floor: 2,
        bound: {
          leftMin: 74,
          leftMax: 304,
          right: 304,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 138,
        floor: 1,
        bound: {
          leftMin: 138,
          leftMax: 298,
          right: 303,
        },
        direction: 1,
      },
      {
        type: 1,
        x: GAME_WIDTH - 142,
        floor: 1,
        bound: {
          leftMin: GAME_WIDTH - 142,
          leftMax: GAME_WIDTH - 22,
          right: GAME_WIDTH - 27,
        },
        direction: 1,
      },
      {
        type: 3,
        x: 38,
        floor: 0,
        bound: {
          leftMin: 38,
          leftMax: 219,
          right: 224,
        },
        direction: 1,
      },
      {
        type: 3,
        x: GAME_WIDTH - 221,
        floor: 0,
        bound: {
          leftMax: GAME_WIDTH - 221,
          leftMin: GAME_WIDTH - 73,
          right: GAME_WIDTH - 78,
        },
        direction: 1,
      },
    ]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
