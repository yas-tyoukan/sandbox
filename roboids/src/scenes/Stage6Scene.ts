import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene, type EnemyArg } from '~/scenes/BaseStageScene';

export class Stage6Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 248, floor: 1 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(468.5, 0);
  }
  protected async initStage(pattern: number) {
    this.addTeleportPad(250, 1, 0, 1);
    this.addTeleportPad(250, 2, 1, 0);
    this.addTeleportPad(55, 1, 2, 3);
    this.addTeleportPad(55, 0, 3, 2);
    this.addForceFieldPad(455, 2, 1);
    this.addForceFieldPad(455, 1, 2);
    this.addForceFieldPad(55, 2, 0);
    this.addForceField(201, 1, 0);
    this.addForceField(292, 1, 1);
    this.addForceField(101, 2, 2);

    const enemyArgsFirst: EnemyArg[] = [
      {
        type: 1,
        x: 39,
        floor: 1,
        bound: {
          leftMin: 34,
          right: 174,
        },
        direction: 1,
      },
      {
        type: 1,
        x: 334,
        floor: 1,
        bound: {
          leftMin: 329,
          right: 484,
        },
        direction: 1,
      },
      {
        type: 2,
        x: 219,
        floor: 2,
        bound: {
          left: 184,
          right: 424,
        },
        direction: 1,
      },
      {
        type: 4,
        x: 239,
        floor: 0,
        bound: {
          leftMin: 34,
          right: 434,
        },
        direction: 1,
      },
    ];

    const enemyArgsSecond: EnemyArg[] = [
      enemyArgsFirst[0],
      {
        ...enemyArgsFirst[1],
        type: 4,
      },
      enemyArgsFirst[2],
      {
        ...enemyArgsFirst[3],
        type: 3,
      },
    ];

    const enemyArgsThird: EnemyArg[] = [
      {
        ...enemyArgsFirst[0],
        type: 4,
      },
      enemyArgsFirst[1],
      enemyArgsFirst[2],
      enemyArgsSecond[3],
    ];

    const enemyPatterns = [enemyArgsFirst, enemyArgsSecond, enemyArgsThird];

    this.addEnemies(enemyPatterns[pattern]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
