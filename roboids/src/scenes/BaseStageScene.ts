import { sound } from '@pixi/sound';
import { Container, Graphics, Text, Ticker } from 'pixi.js';
import {
  FLOOR_HEIGHT,
  GAME_HEIGHT,
  GAME_WIDTH,
  PLAYER_SPEED,
  SLEEP_TIME,
} from '~/constants/gameConfig';
import { Enemy1 } from '~/entities/Enemy1';
import { Enemy2 } from '~/entities/Enemy2';
import { Enemy3 } from '~/entities/Enemy3';
import { Enemy4 } from '~/entities/Enemy4';
import { Enemy5 } from '~/entities/Enemy5';
import { ForceField } from '~/entities/ForceField';
import { ForceFieldPad } from '~/entities/ForceFieldPad';
import { Player } from '~/entities/Player';
import { PowerSquare } from '~/entities/PowerSquare';
import { SleepPad } from '~/entities/SleepPad';
import { TeleportPad } from '~/entities/TeleportPad';
import type { Bound, Direction, EnemyType } from '~/types';
import { playSE } from '~/utils/playSE';

export type EnemyArg = {
  type: EnemyType;
  x: number;
  floor: Floor;
  bound: Bound;
  direction: Direction;
};

type Platform = { x: number; y: number; width: number; height: number };

type PauseState = 'none' | 'death' | 'clear';
type Floor = 0 | 1 | 2; // 各段の床番号（0: 最下段, 1: 中段, 2: 最上段）

sound.add('death', 'sounds/death.mp3');
sound.add('goal', 'sounds/goal.mp3');
sound.add('jump', 'sounds/jump.mp3');
sound.add('teleport', 'sounds/teleport.mp3');
sound.add('force-field', 'sounds/force-field.mp3');

export abstract class BaseStageScene extends Container {
  protected startStage: (level: number, lives: number) => void;
  protected lives: number;
  protected showTitle: () => void;
  protected player!: Player;
  protected enemies: Enemy1[] = [];
  protected platforms: Platform[] = [];
  protected teleportPads: TeleportPad[] = [];
  protected goal!: PowerSquare;
  protected platformYs: number[] = [];
  protected walls: Graphics[] = [];
  protected forceFields: ForceField[] = [];
  protected forceFieldPads: ForceFieldPad[] = [];
  protected sleepPads: SleepPad[] = [];

  private statusBar!: Graphics;
  private livesText!: Text;
  private levelText!: Text;
  private gameOverModal?: Container;
  private level: number; // 現在のレベル（ステージ番号）

  // キー入力管理
  protected keys: Record<string, boolean> = {};
  protected prevKeys: Record<string, boolean> = {};

  // 停止状態管理
  private pauseState: PauseState = 'none';
  private pauseTimer = 0; // フレーム単位（30fpsなら30で1秒）

  // テレポート状態管理
  private teleportingTimer = 0;
  private beforeTeleportPlayer: Player | null = null;
  private isTeleporting = false;
  private wasTeleporting = false;

  // ジャンプ状態管理
  private isPlayerOnGround = true;
  private velocityY = 0;
  private jumpBuffered = false;
  private wasOnGround = false; // 前フレームの着地状態

  // sleep状態管理
  private asleep = false;
  private sleepCount = 0;
  private sleepTimer: number | null = null;

  constructor({
    startStage,
    lives = 4,
    showTitle,
    pattern,
    level,
  }: {
    startStage: (level: number, lives: number) => void;
    lives: number;
    showTitle: () => void;
    pattern: number; // ステージのパターン番号（サブクラスで使用）
    level: number;
  }) {
    super();
    this.startStage = startStage;
    this.lives = lives;
    this.level = level;
    this.showTitle = showTitle;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.createStageBase();
    Promise.all([this.initStage(pattern), this.initPlayer(), this.initGoal()]).then(() => {
      Ticker.shared.add(this.update, this);
    });
  }

  // ステージ固有の初期化（サブクラスで実装）
  protected abstract initStage(patten: number): void;
  protected abstract initPlayer(): Promise<void>;
  protected abstract initGoal(): Promise<void>;

  private createStageBase() {
    // ステージの基本設計
    // 枠線
    const border = new Graphics();
    border.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    border.stroke({ width: 2, color: 0xffffff });
    this.addChild(border);
    // ステータスバーの追加
    this.createStatusBar();
    // フロアの追加
    this.addPlatform();
  }

  private addPlatform() {
    // プラットフォーム設計
    const platformHeight = 8;
    const margin = 20;
    const platformWidth = GAME_WIDTH;
    // 各段のY座標
    const bottomY = GAME_HEIGHT - margin - platformHeight;
    const platformYs = [
      bottomY, // 最下段
      bottomY - FLOOR_HEIGHT, // 中段
      bottomY - 2 * FLOOR_HEIGHT, // 最上段
    ];
    this.platformYs = platformYs;
    this.platforms = [
      { x: 0, y: platformYs[0], width: platformWidth, height: platformHeight },
      { x: 0, y: platformYs[1], width: platformWidth, height: platformHeight },
      { x: 0, y: platformYs[2], width: platformWidth, height: platformHeight },
    ];

    // プラットフォーム描画
    for (const p of this.platforms) {
      const g = new Graphics();
      g.rect(p.x, p.y, p.width, p.height);
      g.fill(0xffffff);
      this.addChildAt(g, 0);
    }
  }

  private createStatusBar() {
    // 下部バー
    const statusBarHeight = 20;
    this.statusBar = new Graphics();
    this.statusBar.rect(0, GAME_HEIGHT - statusBarHeight, GAME_WIDTH, statusBarHeight);
    this.statusBar.fill(0xffffff);
    this.addChild(this.statusBar);

    // Level表示（左下）
    this.levelText = new Text({
      text: `Level: ${this.level}`,
      style: {
        fontFamily: 'monospace',
        fontSize: 14,
        fill: 0x000000,
      },
    });
    this.levelText.x = 12;
    this.levelText.y = GAME_HEIGHT - statusBarHeight;
    this.addChild(this.levelText);

    // Robots（残機）表示（右下）
    this.livesText = new Text({
      text: `Robots: ${this.lives}`,
      style: {
        fontFamily: 'monospace',
        fontSize: 14,
        fill: 0x000000,
      },
    });
    this.livesText.anchor.set(1, 0);
    this.livesText.x = GAME_WIDTH - 12;
    this.livesText.y = GAME_HEIGHT - statusBarHeight;
    this.addChild(this.livesText);
    // border表示
    const border = new Graphics();
    const borderY = GAME_HEIGHT - statusBarHeight;
    border
      .moveTo(1, borderY)
      .lineTo(GAME_WIDTH - 1, borderY)
      .stroke({ color: 0x000000, pixelLine: true });
    this.addChild(border);
  }

  private updateStatusBar() {
    this.levelText.text = `Level: ${this.level}`;
    this.livesText.text = `Robots: ${this.lives}`;
  }

  // 入力処理
  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;
  };
  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  private resetJumpState() {
    this.jumpBuffered = false;
    this.isPlayerOnGround = true;
    this.velocityY = 0;
    this.wasOnGround = false;
    // キー入力状態もリセット
    this.keys = {};
    this.prevKeys = {};
  }

  /**
   * 更新処理
   */
  private update = async () => {
    if (this.gameOverModal) return; // Game Over中は進行停止

    // ====== 停止状態の管理 ======
    if (this.pauseState !== 'none') {
      this.pauseTimer--;
      // 死亡時は点滅
      if (this.pauseState === 'death') {
        this.player.alpha = Math.sin(this.pauseTimer * 2.5) > 0 ? 1 : 0.3;
      }
      // 停止時間が終わったら処理再開
      if (this.pauseTimer <= 0) {
        this.velocityY = -7;
        this.player.alpha = 1;
        if (this.pauseState === 'death') {
          if (this.lives === 0) {
            this.showGameOver();
          } else {
            this.restartStage();
          }
        } else if (this.pauseState === 'clear') {
          this.startStage(this.level + 1, this.lives);
        }
        this.pauseState = 'none';
      }
      // 停止中は他の処理をスキップ
      return;
    }

    // ====== テレポート中の処理 ======
    await this.updateTeleporting();

    // ====== 通常時の進行 ======

    // ジャンプ
    this.updateJump();

    // プレイヤー左右移動
    if (!this.isTeleporting) {
      const speed = PLAYER_SPEED;
      if (this.keys['KeyA']) {
        this.player.x -= speed;
      }
      if (this.keys['KeyD']) {
        this.player.x += speed;
      }

      const anchorX = this.player.anchor?.x ?? 0.5;
      const halfWidth = this.player.width * anchorX;
      const rightHalfWidth = this.player.width * (1 - anchorX);
      const wallOffset = 8;

      // プレイヤーのx方向範囲
      let playerLeft = this.player.x - halfWidth;
      let playerRight = this.player.x + rightHalfWidth;

      // 画面端の判定
      if (playerLeft < wallOffset) {
        this.player.x = halfWidth + wallOffset;
        playerLeft = this.player.x - halfWidth;
        playerRight = this.player.x + rightHalfWidth;
      }
      if (playerRight > GAME_WIDTH - wallOffset) {
        this.player.x = GAME_WIDTH - rightHalfWidth - wallOffset;
        playerLeft = this.player.x - halfWidth;
        playerRight = this.player.x + rightHalfWidth;
      }

      // 壁及び・ForceFieldとの当たり判定
      for (const wall of [...this.walls, ...this.forceFields] as (Graphics | ForceField)[]) {
        if (wall.visible === false) continue; // ForceFieldは非表示時は無視
        const wallLeft = wall.x;
        const wallRight = wall.x + wall.width;
        const wallBottom = wall.y + wall.height;
        // 同じフロアの壁かどうか
        if (wallBottom < this.player.y || this.player.y < wallBottom - FLOOR_HEIGHT) continue;

        const isForceField = wall instanceof ForceField;
        const offset = isForceField ? 0 : wallOffset;

        // x軸だけのAABB判定
        if (playerRight + offset > wallLeft && playerLeft - offset < wallRight) {
          // どちらからめり込んだか判定
          const overlapLeft = playerRight - wallLeft;
          const overlapRight = wallRight - playerLeft;
          if (isForceField) {
            // ForceFieldにぶつかった場合は死亡
            this.startDead();
          }
          if (overlapLeft < overlapRight) {
            // 左からぶつかった
            this.player.x -= overlapLeft + offset;
          } else {
            // 右からぶつかった
            this.player.x += overlapRight + offset;
          }
        }
      }

      // Pad判定
      for (const p of [...this.teleportPads, ...this.forceFieldPads, ...this.sleepPads]) {
        const isSpaceJustPressed = this.keys['Space'] && !this.prevKeys['Space'];
        if (
          this.player.x + 8 / 2 < p.x + p.width / 2 &&
          this.player.x - 8 / 2 > p.x - p.width / 2 &&
          this.player.y < p.y &&
          this.player.y > p.y - this.player.height &&
          this.isPlayerOnGround &&
          isSpaceJustPressed
        ) {
          if (p instanceof TeleportPad) {
            // テレポート処理
            const to = this.teleportPads.find((other) => other.id === p.toId);
            if (to) {
              this.startTeleporting({ x: this.player.x, y: this.player.y });
              this.player.x = to.x;
              this.player.y = to.y - this.player.height / 2 - 3;
              this.isPlayerOnGround = true;
              playSE('teleport');
              break;
            }
          } else if (p instanceof ForceFieldPad) {
            // ForceField解除処理
            for (const forceField of this.forceFields) {
              if (forceField.id !== p.targetId) {
                continue;
              }
              // 対象のForceFieldを見つけて表示切替
              forceField.visible = !forceField.visible;
              playSE('force-field');
              break;
            }
          } else if (p instanceof SleepPad) {
            this.startSleep();
          }
        }
      }
      this.wasTeleporting = this.isTeleporting;

      // ゴール判定
      if (
        this.goal &&
        this.player &&
        this.player.x + this.player.width > this.goal.x &&
        this.player.x < this.goal.x + this.goal.width &&
        this.player.y + this.player.height > this.goal.y &&
        this.player.y < this.goal.y + this.goal.height
      ) {
        this.pauseState = 'clear';
        this.pauseTimer = 40;
        playSE('goal');
        return;
      }
    }

    // 敵との当たり判定
    for (const enemy of this.enemies) {
      if (enemy.isHitPlayer(this.player)) {
        this.startDead();
        return;
      }
    }

    // Enemyの移動
    if (!this.asleep) {
      for (const enemy of this.enemies) {
        enemy.updateMove();
      }
    }

    // ステータスバー更新
    this.updateStatusBar();

    // 最後に前フレームのキー状態を更新
    this.prevKeys = { ...this.keys };
  };

  // プレイヤー死亡時の処理
  private startDead() {
    this.lives--;
    this.updateStatusBar();
    this.pauseState = 'death';
    this.pauseTimer = 30;
    this.resetTeleporting();
    this.stopSleep();
    playSE('death');
  }

  // sleep処理
  private startSleep() {
    this.asleep = true;
    this.stopEnemies();
    if (this.sleepTimer !== null) {
      clearTimeout(this.sleepTimer);
      this.sleepTimer = null;
    }
    this.sleepTimer = setTimeout(() => {
      this.asleep = false;
      this.sleepTimer = null;
      this.playEnemies();
    }, SLEEP_TIME);
  }

  private stopSleep() {
    this.asleep = false;
    if (this.sleepTimer !== null) {
      clearTimeout(this.sleepTimer);
      this.sleepTimer = null;
    }
  }

  private stopEnemies() {
    for (const enemy of this.enemies) {
      enemy.stop();
    }
  }

  private playEnemies() {
    for (const enemy of this.enemies) {
      enemy.play();
    }
  }

  // ステージの再スタート
  private restartStage() {
    this.resetJumpState();
    for (const forceField of this.forceFields) {
      forceField.initialize(); // ForceFieldを初期状態にする
    }
    // sleep状態リセット
    this.stopSleep();
    // 各ステージごとのリセット処理
    this.doRestartStage();
  }

  // ステージを最初からやり直し(サブクラスで実装)
  protected abstract doRestartStage(): void;

  protected async addPlayer({ x, floor }: { x: number; floor: Floor }) {
    this.player = await Player.create();
    this.player.x = x;
    this.player.y = this.platformYs[floor] - this.player.height / 2;
    this.player.anchor.set(0.5, 0.5);
    this.addChild(this.player);
  }

  protected async addTeleportPad(x: number, floor: Floor, id: number, toId: number) {
    const pad = await TeleportPad.create(x, this.platformYs[floor], id, toId);
    this.teleportPads.push(pad);
    this.addChild(pad);
  }

  protected async addSleepPad(x: number, floor: Floor) {
    const pad = await SleepPad.create(x, this.platformYs[floor]);
    this.sleepPads.push(pad);
    this.addChild(pad);
  }

  protected addWall(x: number, floor: Floor) {
    const width = 7;
    const height = FLOOR_HEIGHT - 8;
    const g = new Graphics();
    g.rect(0, 0, width, height);
    g.x = x;
    g.y = this.platformYs[floor] - FLOOR_HEIGHT + 8;
    g.fill(0xffffff);
    this.addChild(g);
    this.walls.push(g);
  }

  protected async addForceField(x: number, floor: Floor, id: number, visible = true) {
    const height = FLOOR_HEIGHT;
    const f = await ForceField.create(height, id, visible);
    f.x = x;
    f.y = this.platformYs[floor] - FLOOR_HEIGHT;
    this.addChildAt(f, 0);
    this.forceFields.push(f);
  }

  protected async addForceFieldPad(x: number, floor: Floor, targetId: number) {
    const pad = await ForceFieldPad.create(x, this.platformYs[floor], targetId);
    this.forceFieldPads.push(pad);
    this.addChild(pad);
  }

  /**
   * 敵を追加するメソッド
   * @param args
   * @protected
   */
  protected async addEnemies(args: EnemyArg[]) {
    const length = args.length;
    const enemies = await Promise.all(
      args.map(({ type, bound, direction }) => {
        const EnemyClass = (() => {
          if (type === 1) return Enemy1;
          if (type === 2) return Enemy2;
          if (type === 3) return Enemy3;
          if (type === 4) return Enemy4;
          if (type === 5) return Enemy5;
          throw new Error(`Unknown enemy type: ${type}`);
        })();
        return EnemyClass.create({ bound, direction });
      }),
    );
    for (let i = 0; i < length; i++) {
      const enemy = enemies[i];
      const { x, floor } = args[i];
      enemy.x = x;
      enemy.y = this.platformYs[floor] - 24;
      enemy.anchor.set(0.5, 0.5);
      this.enemies.push(enemy);
      this.addChild(enemy);
    }
  }

  protected async addGoal(x: number, floor: Floor) {
    this.goal = await PowerSquare.create(x, this.platformYs[floor] - 10);
    this.goal.anchor.set(0.5);
    this.addChild(this.goal);
  }

  private async startTeleporting({ x, y }: { x: number; y: number }) {
    this.teleportingTimer = 20;
    this.isTeleporting = true;
    this.beforeTeleportPlayer = await Player.create();
    this.beforeTeleportPlayer.x = x;
    this.beforeTeleportPlayer.y = y;
    this.beforeTeleportPlayer.anchor.set(0.5, 0.5);
    this.beforeTeleportPlayer.fadeOut();
    this.player.fadeIn();
    this.addChild(this.beforeTeleportPlayer);
  }

  private async updateTeleporting() {
    if (!this.isTeleporting) return;
    if (this.teleportingTimer === 0) {
      this.resetTeleporting();
      return;
    }
    this.teleportingTimer -= 1;
  }

  private resetTeleporting() {
    this.isTeleporting = false;
    this.teleportingTimer = 0;
    if (this.beforeTeleportPlayer) {
      this.beforeTeleportPlayer.destroy();
      this.beforeTeleportPlayer = null;
    }
  }

  private updateJump() {
    const isJumpJustPressed = this.keys['KeyW'] && !this.prevKeys['KeyW'];
    const isJumpPressed = this.keys['KeyW'];
    const isJumpJustReleased = !this.keys['KeyW'] && this.prevKeys['KeyW'];

    // ジャンプ中またはテレポート中にwキーが新たに押された場合、ジャンプ予約
    if (isJumpJustPressed && (!this.isPlayerOnGround || this.isTeleporting)) {
      this.jumpBuffered = true;
    }
    // wキーを離したらジャンプ予約を解除（押しっぱなし抑制）
    if (isJumpJustReleased) {
      this.jumpBuffered = false;
    }

    if (isJumpJustPressed && this.isPlayerOnGround && !this.isTeleporting) {
      this.velocityY = -8;
      this.isPlayerOnGround = false;
      playSE('jump');
    }

    // 重力
    this.velocityY += 0.5;
    if (Math.abs(this.velocityY) > 2.2) {
      // ジャンプの頭打ち
      this.player.y += this.velocityY;
    }

    // 床との当たり判定
    this.isPlayerOnGround = false;
    for (const p of this.platforms) {
      const playerHeightWithOffset = this.player.height / 2 + 3;
      const playerBottomY = this.player.y + playerHeightWithOffset;
      if (playerBottomY >= p.y && playerBottomY <= p.y + p.height) {
        this.player.y = p.y - playerHeightWithOffset;
        this.velocityY = 0;
        this.isPlayerOnGround = true;
      }
    }

    // 着地直後またはテレポート完了直後にジャンプ予約を消費する
    if (
      // ジャンプ予約があり、ジャンプキーが押されている
      this.jumpBuffered &&
      isJumpPressed &&
      // 着地直後（前フレームは空中、今フレームは地上、かつテレポート中でない）
      ((!this.wasOnGround && this.isPlayerOnGround && !this.isTeleporting) ||
        // テレポート完了直後（前フレームはテレポート中、今フレームはテレポート終了）
        (this.wasTeleporting && !this.isTeleporting))
    ) {
      this.velocityY = -8;
      this.isPlayerOnGround = false;
      playSE('jump');
      this.jumpBuffered = false;
    }

    this.wasOnGround = this.isPlayerOnGround;
  }

  // Game Overモーダル表示
  private showGameOver() {
    this.gameOverModal = new Container();

    // モーダル背景
    const modalBg = new Graphics();
    const mw = 260;
    const mh = 120;
    const mx = (GAME_WIDTH - mw) / 2;
    const my = (GAME_HEIGHT - mh) / 2;
    modalBg.rect(mx, my, mw, mh);
    modalBg.stroke({ width: 3, color: 0x8888ff });
    modalBg.fill(0xfafaff);
    this.gameOverModal.addChild(modalBg);

    // Game Overテキスト
    const overText = new Text({
      text: 'Game Over',
      style: {
        fontFamily: 'monospace',
        fontSize: 32,
        fill: 0x222233,
        align: 'center',
      },
    });
    overText.anchor.set(0.5);
    overText.x = GAME_WIDTH / 2;
    overText.y = my + 38;
    this.gameOverModal.addChild(overText);

    // Okayボタン
    const okayText = new Text({
      text: 'Okay',
      style: {
        fontFamily: 'monospace',
        fontSize: 24,
        fill: 0x222233,
        align: 'center',
      },
    });
    okayText.anchor.set(0.5);
    okayText.x = GAME_WIDTH / 2;
    okayText.y = my + mh - 32;
    okayText.eventMode = 'static';
    okayText.cursor = 'pointer';
    okayText.on('pointerdown', () => {
      // ここでタイトル画面に戻るなど
      this.showTitle();
    });
    this.gameOverModal.addChild(okayText);

    this.addChild(this.gameOverModal);
  }

  override destroy(options?: boolean | import('pixi.js').DestroyOptions) {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    Ticker.shared.remove(this.update, this);
    super.destroy(options);
  }
}
