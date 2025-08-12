import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene, type EnemyArg } from '~/scenes/BaseStageScene';

export class Stage5Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 34, floor: 2 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(468.5, 0);
  }
  protected async initStage(pattern: number) {
    this.addTeleportPad(90, 2, 0, 1);
    this.addTeleportPad(55, 1, 1, 0);
    this.addTeleportPad(455, 1, 2, 3);
    this.addTeleportPad(55, 0, 3, 2);
    this.addTeleportPad(130, 0, 4, 5);
    this.addTeleportPad(380, 2, 5, 4);
    this.addForceFieldPad(304, 2, 0);
    this.addForceField(105, 1, 0);
    this.addSleepPad(455, 2);
    this.addWall(339, 2);

    const enemyArgsFirst: EnemyArg[] = [
      {
        type: 1,
        x: 119,
        floor: 2,
        bound: {
          leftMin: 74,
          leftMax: 299,
          right: 304,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 139,
        floor: 1,
        bound: {
          leftMin: 134,
          leftMax: 299,
          right: 304,
        },
        direction: -1,
      },
      {
        type: 1,
        x: 369,
        floor: 1,
        bound: {
          leftMin: 369,
          leftMax: 479,
          right: 484,
        },
        direction: 1,
      },
      {
        type: 3,
        x: 39,
        floor: 0,
        bound: {
          leftMin: 33,
          leftMax: 223,
          right: 225,
        },
        direction: -1,
      },
      {
        type: 3,
        x: 289,
        floor: 0,
        bound: {
          leftMin: 283,
          leftMax: 428,
          right: 433,
        },
        direction: 1,
      },
    ];

    const enemyArgsSecond: EnemyArg[] = [];

    const enemyArgs: EnemyArg[][] = [enemyArgsFirst, enemyArgsSecond];

    this.addEnemies(enemyArgs[pattern]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
