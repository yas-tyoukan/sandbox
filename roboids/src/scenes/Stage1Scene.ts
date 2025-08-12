import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage1Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー（最下段左端に設置）
    await this.addPlayer({ x: 39, floor: 0 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置（最上段右端に設置）
    this.addGoal(478.5, 2);
  }
  protected async initStage() {
    this.addTeleportPad(455, 0, 0, 1);
    this.addTeleportPad(55, 1, 1, 0);
    this.addTeleportPad(455, 1, 2, 3);
    this.addTeleportPad(55, 2, 3, 2);

    // Enemy1の配置（各段中央付近で左右移動）
    this.addEnemies([
      {
        type: 1,
        x: 109,
        floor: 0,
        bound: {
          left: 104,
          right: 484,
        },
        direction: 1,
      }, // 最下段
      {
        type: 1,
        x: 264,
        floor: 1,
        bound: {
          left: 59,
          right: 444,
        },
        direction: -1,
      }, // 中段
      {
        type: 1,
        x: 64,
        floor: 2,
        bound: {
          left: 70,
          right: 404,
        },
        direction: 1,
      }, // 最上段
    ]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
