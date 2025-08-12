import { BaseStageScene, type EnemyArg } from '~/scenes/BaseStageScene';

export class Stage2Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 159, floor: 0 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(98.5, 0);
  }
  protected async initStage(pattern: number) {
    this.addTeleportPad(455, 0, 0, 1);
    this.addTeleportPad(455, 1, 1, 0);
    this.addTeleportPad(55, 1, 2, 3);
    this.addTeleportPad(55, 2, 3, 2);
    this.addTeleportPad(455, 2, 4, 5);
    this.addTeleportPad(55, 0, 5, 4);

    this.addWall(114, 0);

    const enemyArgsFirst: EnemyArg[] = [
      {
        type: 1,
        x: 319,
        floor: 0,
        bound: {
          left: 314,
          right: 484,
        },
        direction: -1,
      }, // 最下段
      {
        type: 1,
        x: 269,
        floor: 1,
        bound: {
          leftMin: 64,
          leftMax: 479,
          right: 484,
        },
        direction: -1,
      }, // 中段
      {
        type: 2,
        x: 269,
        floor: 2,
        bound: {
          left: 119,
          right: 419,
        },
        direction: 1,
      }, // 最上段
    ];

    const enemyArgs: EnemyArg[][] = [
      // level 2,21,40,59,...
      enemyArgsFirst,
      // level 8,27,46,65,...
      [
        {
          ...enemyArgsFirst[0],
          type: 5,
          bound: {
            leftMin: 313,
            leftMax: 478,
            right: 481,
          },
        },
        {
          ...enemyArgsFirst[1],
          type: 5,
          bound: {
            leftMin: 63,
            leftMax: 483,
            right: 485,
          },
        },
        enemyArgsFirst[2], // 最上段
      ],
      // level 15,34,53,72,...
      [
        {
          type: 1,
          x: 319,
          floor: 0,
          bound: {
            leftMin: 314,
            leftMax: 474,
            right: 479,
          },
          direction: -1,
        }, // 最下段
        {
          type: 3,
          x: 269,
          floor: 1,
          bound: {
            leftMin: 64,
            leftMax: 484,
            right: 485,
          },
          direction: -1,
        }, // 中段
        enemyArgsFirst[2], // 最上段
      ],
    ];

    this.addEnemies(enemyArgs[pattern]);
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
