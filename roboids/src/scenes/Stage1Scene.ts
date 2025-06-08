import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { PowerSquare } from '~/entities/PowerSquare';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage1Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー（最下段左端に設置）
    await this.addPlayer({ x: 28, y: GAME_HEIGHT - 40 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置（最上段右端に設置）
    this.goal = await PowerSquare.create(GAME_WIDTH - 32, this.platformYs[2]);
    this.addChild(this.goal);
  }
  protected async initStage() {
    const margin = 60;
    this.addTeleportPad(GAME_WIDTH - margin, 0, 0);
    // this.addTeleportPad(100, 0, 0);
    this.addTeleportPad(margin, 1, 0);
    this.addTeleportPad(GAME_WIDTH - margin, 1, 1);
    this.addTeleportPad(margin, 2, 1);

    // Enemy1の配置（各段中央付近で左右移動）
    this.addEnemies([
      {
        x: 100,
        floor: 0,
        bound: {
          left: 100,
          right: GAME_WIDTH - 10,
        },
        direction: 1,
      }, // 最下段
      {
        x: GAME_WIDTH / 2,
        floor: 1,
        bound: {
          left: 60,
          right: GAME_WIDTH - 60,
        },
        direction: -1,
      }, // 中段
      {
        x: 50,
        floor: 2,
        bound: {
          left: 60,
          right: GAME_WIDTH - 120,
        },
        direction: 1,
      }, // 最上段
    ]);
  }

  protected override getStageNumber(): number {
    return 1;
  }

  protected override restartStage() {
    this.initPlayer();
  }
}
