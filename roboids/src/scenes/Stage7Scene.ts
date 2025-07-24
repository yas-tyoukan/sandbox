import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage7Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 33, floor: 1 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(GAME_WIDTH - 31, 1);
  }
  protected async initStage() {
    this.addTeleportPad(100, 1, 0, 1);
    this.addTeleportPad(55, 2, 1, 0);
    this.addTeleportPad(181, 1, 2, 3);
    this.addTeleportPad(55, 0, 3, 2);
    this.addForceFieldPad(GAME_WIDTH - 111, 1, 0);
    this.addForceFieldPad(GAME_WIDTH - 55, 2, 1);
    this.addForceFieldPad(GAME_WIDTH - 55, 0, 2);
    this.addForceField(260, 0, 0, false);
    this.addForceField(GAME_WIDTH - 156, 1, 1, false);
    this.addForceField(GAME_WIDTH - 65, 1, 2);

    this.addEnemies([
      {
        type: 1,
        x: 39,
        floor: 2,
        bound: {
          leftMin: 39,
          leftMax: 224,
          right: 224,
        },
        direction: 1,
      },
      {
        type: 1,
        x: GAME_WIDTH - 32,
        floor: 2,
        bound: {
          leftMin: GAME_WIDTH - 217,
          leftMax: GAME_WIDTH - 32,
          right: GAME_WIDTH - 32,
        },
        direction: -1,
      },
      {
        type: 1,
        x: 299,
        floor: 1,
        bound: {
          leftMin: 144,
          leftMax: 299,
          right: 299,
        },
        direction: -1,
      },
      {
        type: 2,
        x: 84,
        floor: 0,
        bound: {
          left: 84,
          right: 174,
        },
        direction: 1,
      },
      {
        type: 2,
        x: GAME_WIDTH - 76,
        floor: 0,
        bound: {
          left: GAME_WIDTH - 182,
          right: GAME_WIDTH - 76,
        },
        direction: -1,
      },
    ]);
  }

  protected override getStageNumber(): number {
    return 7;
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
