import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';
import type { EnemyType } from '~/types';

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
    this.addGoal(465, 2);
  }

  protected async initStage(pattern: number) {
    const margin = 54;
    this.addTeleportPad(margin, 0, 0, 2);
    this.addTeleportPad(margin, 1, 1, 0);
    this.addTeleportPad(margin, 2, 2, 1);
    this.addForceFieldPad(GAME_WIDTH - margin, 1, 0);
    this.addForceField(424, 2, 0);

    const enemyTypes: EnemyType[][] = [
      [2, 2, 2],
      [4, 4, 4],
    ];

    this.addEnemies([
      {
        type: enemyTypes[pattern][0],
        x: 318,
        floor: 0,
        bound: {
          left: 96,
          right: GAME_WIDTH - 172,
        },
        direction: 1,
      },
      {
        type: enemyTypes[pattern][1],
        x: 262,
        floor: 1,
        bound: {
          left: 96,
          right: GAME_WIDTH - 96,
        },
        direction: -1,
      },
      {
        type: enemyTypes[pattern][2],
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

  protected override doRestartStage() {
    this.initPlayer();
  }
}
