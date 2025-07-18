import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage3Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 460, floor: 0 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(468, 2);
  }
  protected async initStage() {
    const margin = 54;
    this.addTeleportPad(margin, 0, 0, 2);
    this.addTeleportPad(margin, 1, 1, 0);
    this.addTeleportPad(margin, 2, 2, 1);
    this.addForceFieldPad(GAME_WIDTH - margin, 1, 0);
    this.addForceField(424, 2, 0);

    this.addEnemy2([
      {
        x: 318,
        floor: 0,
        bound: {
          left: 96,
          right: GAME_WIDTH - 172,
        },
        direction: 1,
      },
      {
        x: 262,
        floor: 1,
        bound: {
          left: 96,
          right: GAME_WIDTH - 96,
        },
        direction: -1,
      },
      {
        x: 270,
        floor: 2,
        bound: {
          left: 96,
          right: GAME_WIDTH - 172,
        },
        direction: 1,
      },
    ]);
  }

  protected override getStageNumber(): number {
    return 3;
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
