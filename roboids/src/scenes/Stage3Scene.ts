import { BaseStageScene, type EnemyArg } from '~/scenes/BaseStageScene';

export class Stage3Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 459, floor: 0 });
  }

  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(468, 2);
  }

  protected async initStage(pattern: number) {
    this.addTeleportPad(55, 0, 0, 2);
    this.addTeleportPad(55, 1, 1, 0);
    this.addTeleportPad(55, 2, 2, 1);
    this.addForceFieldPad(455, 1, 0);
    this.addForceField(421, 2, 0);

    const enemyArgsFirst: EnemyArg[] = [
      {
        type: 2,
        x: 319,
        floor: 0,
        bound: {
          left: 99,
          right: 339,
        },
        direction: 1,
      },
      {
        type: 2,
        x: 269,
        floor: 1,
        bound: {
          left: 99,
          right: 429,
        },
        direction: -1,
      },
      {
        type: 2,
        x: 269,
        floor: 2,
        bound: {
          left: 99,
          right: 339,
        },
        direction: 1,
      },
    ];

    const enemyArgs: EnemyArg[][] = [
      enemyArgsFirst,
      [
        {
          ...enemyArgsFirst[0],
          type: 4,
          bound: {
            leftMin: 94,
            right: 344,
          },
        },
        {
          ...enemyArgsFirst[1],
          type: 4,
          bound: {
            leftMin: 94,
            right: 429,
          },
        },
        {
          ...enemyArgsFirst[2],
          type: 4,
          bound: {
            leftMin: 94,
            right: 344,
          },
        },
      ],
    ];

    this.addEnemies(enemyArgs[pattern]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
