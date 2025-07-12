import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage1Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー（最下段左端に設置）
    await this.addPlayer({ x: 28, floor: 0 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置（最上段右端に設置）
    this.addGoal(GAME_WIDTH - 42, 2);
  }
  protected async initStage() {
    const margin = 54;
    this.addTeleportPad(GAME_WIDTH - margin, 0, 0, 1);
    this.addTeleportPad(margin, 1, 1, 0);
    this.addTeleportPad(GAME_WIDTH - margin, 1, 2, 3);
    this.addTeleportPad(margin, 2, 3, 2);

    // Enemy1の配置（各段中央付近で左右移動）
    this.addEnemy1([
      {
        x: 100,
        floor: 0,
        bound: {
          left: 100,
          right: GAME_WIDTH - 20,
        },
        direction: 1,
      }, // 最下段
      {
        x: GAME_WIDTH / 2,
        floor: 1,
        bound: {
          left: 70,
          right: GAME_WIDTH - 70,
        },
        direction: -1,
      }, // 中段
      {
        x: 50,
        floor: 2,
        bound: {
          left: 70,
          right: GAME_WIDTH - 120,
        },
        direction: 1,
      }, // 最上段
    ]);
  }

  protected override getStageNumber(): number {
    return 1;
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
