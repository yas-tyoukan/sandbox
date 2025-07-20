import { GAME_WIDTH } from '~/constants/gameConfig';
import { BaseStageScene } from '~/scenes/BaseStageScene';

export class Stage5Scene extends BaseStageScene {
  protected override async initPlayer() {
    if (this.player && !this.player.destroyed) {
      this.player.destroy();
    }
    // プレイヤー
    await this.addPlayer({ x: 33, floor: 2 });
  }
  protected override async initGoal() {
    // ゴールマーカー設置
    this.addGoal(GAME_WIDTH - 42, 0);
  }
  protected async initStage() {
    this.addTeleportPad(90, 2, 0, 1);
    this.addTeleportPad(54, 1, 1, 0);
    this.addTeleportPad(GAME_WIDTH - 55, 1, 2, 3);
    this.addTeleportPad(54, 0, 3, 2);
    this.addTeleportPad(129, 0, 4, 5);
    this.addTeleportPad(GAME_WIDTH - 129, 2, 5, 4);
    this.addForceFieldPad(305, 2, 0);
    this.addForceField(98, 1, 0);
    this.addSleepPad(GAME_WIDTH - 55, 2);
    this.addWall(GAME_WIDTH - 170, 2);

    this.addEnemy3([
      // {
      //   x: 38,
      //   floor: 2,
      //   bound: {
      //     left: 38,
      //     right: GAME_WIDTH - 26,
      //   },
      //   direction: 1,
      // },
      // {
      //   x: 100,
      //   floor: 1,
      //   bound: {
      //     left: 38,
      //     right: 244,
      //   },
      //   direction: -1,
      // },
      {
        x: 38,
        floor: 0,
        bound: {
          left: 96,
          right: 242,
        },
        direction: 1,
      },
      {
        x: GAME_WIDTH - 30,
        floor: 0,
        bound: {
          left: GAME_WIDTH - 242,
          right: GAME_WIDTH - 242,
        },
        direction: -1,
      },
    ]);
  }

  protected override getStageNumber(): number {
    return 4;
  }

  protected override doRestartStage() {
    this.initPlayer();
  }
}
