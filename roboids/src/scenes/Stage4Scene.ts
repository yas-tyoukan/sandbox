import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene, type EnemyArg } from '~/scenes/BaseStageScene';

export class Stage4Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 399, floor: 1 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(318, 1);
  }
  protected async initStage(pattern: number) {
    this.addTeleportPad(455, 1, 0, 1);
    this.addTeleportPad(455, 2, 1, 0);
    this.addTeleportPad(55, 2, 2, 3);
    this.addTeleportPad(203, 1, 3, 2);
    this.addTeleportPad(55, 1, 4, 5);
    this.addTeleportPad(55, 0, 5, 4);
    this.addForceFieldPad(455, 0, 0);
    this.addForceField(275, 1, 0);
    this.addWall(360, 1);

    const enemyArgsFirst: EnemyArg[] = [
      {
        type: 1,
        x: 39,
        floor: 2,
        bound: {
          left: 34,
          right: 484,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 94,
        floor: 1,
        bound: {
          left: 34,
          right: 244,
        },
        direction: -1,
      },
      {
        type: 1,
        x: 44,
        floor: 0,
        bound: {
          left: 34,
          right: 244,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 474,
        floor: 0,
        bound: {
          left: 274,
          right: 484,
        },
        direction: -1,
      },
    ];

    const enemyArgsSecond: EnemyArg[] = [
      {
        ...enemyArgsFirst[0],
        type: 4,
        bound: {
          ...enemyArgsFirst[0].bound,
          leftMin: 34,
          leftMax: 489,
        },
      },
      enemyArgsFirst[1],
      {
        ...enemyArgsFirst[2],
        bound: {
          leftMin: 34,
          leftMax: 239,
          right: 244,
        },
      },
      {
        ...enemyArgsFirst[3],
        bound: {
          leftMin: 274,
          leftMax: 479,
          right: 484,
        },
      },
    ];

    const enemyArgsThird: EnemyArg[] = [
      enemyArgsSecond[0],
      {
        ...enemyArgsFirst[1],
        type: 3,
        bound: {
          leftMin: 34,
          leftMax: 239,
          right: 244,
        },
      },
      enemyArgsSecond[2],
      {
        ...enemyArgsSecond[3],
        type: 5,
        x: 479,
        bound: {
          leftMin: 275,
          leftMax: 480,
          right: 485,
        },
      },
    ];

    const enemyArgs: EnemyArg[][] = [enemyArgsFirst, enemyArgsSecond, enemyArgsThird];

    this.addEnemies(enemyArgs[pattern]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
