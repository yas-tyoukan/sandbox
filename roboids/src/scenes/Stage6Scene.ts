import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage6Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 248, floor: 1 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(GAME_WIDTH - 42, 0);
  }
  protected async initStage() {
    this.addTeleportPad(248, 1, 0, 1);
    this.addTeleportPad(248, 2, 1, 0);
    this.addTeleportPad(55, 1, 2, 3);
    this.addTeleportPad(55, 0, 3, 2);
    this.addForceFieldPad(GAME_WIDTH - 55, 2, 1);
    this.addForceFieldPad(GAME_WIDTH - 55, 1, 2);
    this.addForceFieldPad(55, 2, 0);
    this.addForceField(205, 1, 0);
    this.addForceField(296, 1, 1);
    this.addForceField(105, 2, 2);

    this.addEnemies([
      {
        type: 1,
        x: 38,
        floor: 1,
        bound: {
          leftMin: 34,
          leftMax: 169,
          right: 174,
        },
        direction: 1,
      },
      {
        type: 1,
        x: GAME_WIDTH - 177,
        floor: 1,
        bound: {
          leftMin: GAME_WIDTH - 182,
          leftMax: GAME_WIDTH - 22,
          right: GAME_WIDTH - 27,
        },
        direction: 1,
      },
      {
        type: 2,
        x: 220,
        floor: 2,
        bound: {
          left: 184,
          right: GAME_WIDTH - 87,
        },
        direction: 1,
      },
      {
        type: 4,
        x: 240,
        floor: 0,
        bound: {
          leftMin: 160,
          leftMax: GAME_WIDTH - 73,
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
