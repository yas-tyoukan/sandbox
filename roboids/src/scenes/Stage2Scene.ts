import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage2Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー（最下段左端に設置）
    await this.addPlayer({ x: 200, y: GAME_HEIGHT - 40 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置（最上段右端に設置）
    this.addGoal(GAME_WIDTH - 42, 2);
  }
  protected async initStage() {
    const margin = 60;
    this.addTeleportPad(GAME_WIDTH - margin, 0, 0);
    // this.addTeleportPad(100, 0, 0);
    this.addTeleportPad(margin, 1, 0);
    this.addTeleportPad(GAME_WIDTH - margin, 1, 1);
    this.addTeleportPad(margin, 2, 1);

    this.addWall(100, 0);

    // Enemy1の配置（各段中央付近で左右移動）
    this.addEnemy1([
      // {
      //   x: 400,
      //   floor: 0,
      //   bound: {
      //     left: 400,
      //     right: GAME_WIDTH - 10,
      //   },
      //   direction: 1,
      // }, // 最下段
      {
        x: GAME_WIDTH - 70,
        floor: 1,
        bound: {
          leftMin: 24,
          leftMax: GAME_WIDTH - 70,
          right: GAME_WIDTH - 10,
        },
        direction: -1,
      }, // 中段
    ]);
  }

  protected override getStageNumber(): number {
    return 2;
  }

  protected override restartStage() {
    this.initPlayer();
  }
}
