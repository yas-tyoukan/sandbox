import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene, type EnemyArg } from '~/scenes/BaseStageScene';

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
    this.addGoal(478.5, 1);
  }
  protected async initStage(pattern: number) {
    this.addTeleportPad(100, 1, 0, 1);
    this.addTeleportPad(55, 2, 1, 0);
    this.addTeleportPad(180, 1, 2, 3);
    this.addTeleportPad(55, 0, 3, 2);
    this.addForceFieldPad(400, 1, 0);
    this.addForceFieldPad(455, 2, 1);
    this.addForceFieldPad(455, 0, 2);
    this.addForceField(256, 0, 0, false);
    this.addForceField(351, 1, 1, false);
    this.addForceField(442, 1, 2);

    const enemyArgsFirst: EnemyArg[] = [
      {
        type: 1,
        x: 39,
        floor: 2,
        bound: {
          leftMin: 34,
          right: 224,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 479,
        floor: 2,
        bound: {
          leftMin: 294,
          right: 484,
        },
        direction: -1,
      },
      {
        type: 1,
        x: 299,
        floor: 1,
        bound: {
          leftMin: 94,
          right: 304,
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
        x: 434,
        floor: 0,
        bound: {
          left: 329,
          right: 434,
        },
        direction: -1,
      },
    ];

    const enemyArgsSecond: EnemyArg[] = [
      {
        ...enemyArgsFirst[0],
        type: 4,
      },
      {
        ...enemyArgsFirst[1],
        type: 4,
      },
      {
        ...enemyArgsFirst[2],
        type: 4,
      },
      enemyArgsFirst[3],
      enemyArgsFirst[4],
    ];

    const enemyArgsThird: EnemyArg[] = [
      {
        ...enemyArgsFirst[0],
        type: 5,
      },
      {
        ...enemyArgsFirst[1],
        type: 5,
      },
      {
        ...enemyArgsFirst[2],
        type: 5,
      },
      enemyArgsFirst[3],
      enemyArgsFirst[4],
    ];

    const enemyPatterns = [enemyArgsFirst, enemyArgsSecond, enemyArgsThird];

    this.addEnemies(enemyPatterns[pattern]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
