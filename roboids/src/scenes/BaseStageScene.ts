import { Container, Graphics, Text, Ticker } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import type { Enemy1 } from '~/entities/Enemy1';
import type { Goal } from '~/entities/Goal';
import type { Player } from '~/entities/Player';
import type { TeleportPad } from '~/entities/TeleportPad';

type Platform = { x: number; y: number; width: number; height: number };

type PauseState = 'none' | 'death' | 'clear';

export abstract class BaseStageScene extends Container {
  protected player!: Player;
  protected enemies: Enemy1[] = [];
  protected platforms: Platform[] = [];
  protected teleports: TeleportPad[] = [];
  protected goal!: Goal;
  protected velocityY = 0;
  protected onGround = false;
  protected keys: Record<string, boolean> = {};
  protected prevKeys: Record<string, boolean> = {};

  private statusBar!: Graphics;
  private livesText!: Text;
  private levelText!: Text;
  private gameOverModal?: Container;

  // 停止状態管理
  private pauseState: PauseState = 'none';
  private pauseTimer = 0; // フレーム単位（30fpsなら30で1秒）

  constructor(
    protected onStageClear: (level: number, lives: number) => void,
    protected onRetry: (level: number, lives: number) => void,
    protected lives = 4,
  ) {
    super();
    this.initStage();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    Ticker.shared.add(this.update, this);
    this.createStatusBar();
  }

  // ステージ固有の初期化（サブクラスで実装）
  protected abstract initStage(): void;
  protected abstract getStageNumber(): number;

  private createStatusBar() {
    // 下部バー
    this.statusBar = new Graphics();
    this.statusBar.rect(0, GAME_HEIGHT - 28, GAME_WIDTH, 28);
    this.statusBar.fill(0x000000);
    this.addChild(this.statusBar);

    // Level表示（左下）
    this.levelText = new Text({
      text: `Level: ${this.getStageNumber()}`,
      style: {
        fontFamily: 'monospace',
        fontSize: 18,
        fill: 0xffffff,
      },
    });
    this.levelText.x = 12;
    this.levelText.y = GAME_HEIGHT - 24;
    this.addChild(this.levelText);

    // Robots（残機）表示（右下）
    this.livesText = new Text({
      text: `Robots: ${this.lives}`,
      style: {
        fontFamily: 'monospace',
        fontSize: 18,
        fill: 0xffffff,
      },
    });
    this.livesText.anchor.set(1, 0);
    this.livesText.x = GAME_WIDTH - 12;
    this.livesText.y = GAME_HEIGHT - 24;
    this.addChild(this.livesText);
  }

  private updateStatusBar() {
    this.levelText.text = `Level: ${this.getStageNumber()}`;
    this.livesText.text = `Robots: ${this.lives}`;
  }

  // 入力処理
  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;
  };
  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  private update = () => {
    if (this.gameOverModal) return; // Game Over中は進行停止

    // ====== 停止状態の管理 ======
    if (this.pauseState !== 'none') {
      this.pauseTimer--;
      // 死亡時は点滅
      if (this.pauseState === 'death') {
        this.player.alpha = Math.sin(this.pauseTimer * 0.5) > 0 ? 1 : 0.3;
      }
      // 停止時間が終わったら処理再開
      if (this.pauseTimer <= 0) {
        this.player.alpha = 1;
        if (this.pauseState === 'death') {
          if (this.lives === 0) {
            this.showGameOver();
          } else {
            this.restartStage();
          }
        } else if (this.pauseState === 'clear') {
          this.onStageClear(this.getStageNumber(), this.lives);
        }
        this.pauseState = 'none';
      }
      // 停止中は他の処理をスキップ
      return;
    }

    // ====== 通常時の進行 ======

    // プレイヤー左右移動
    const speed = 3;
    if (this.keys['KeyA']) this.player.x -= speed;
    if (this.keys['KeyD']) this.player.x += speed;

    // ジャンプ
    if (this.keys['KeyW'] && this.onGround) {
      this.velocityY = -8;
      this.onGround = false;
    }

    // 重力
    this.velocityY += 0.4;
    this.player.y += this.velocityY;

    // 床との当たり判定
    this.onGround = false;
    for (const p of this.platforms) {
      if (
        this.player.y + this.player.height >= p.y &&
        this.player.y + this.player.height <= p.y + p.height &&
        this.player.x + this.player.width > p.x &&
        this.player.x < p.x + p.width &&
        this.velocityY >= 0
      ) {
        this.player.y = p.y - this.player.height;
        this.velocityY = 0;
        this.onGround = true;
      }
    }

    // TELEPORT判定
    for (const tp of this.teleports) {
      const isSpaceJustPressed = this.keys['Space'] && !this.prevKeys['Space'];
      if (
        this.player.x + this.player.width > tp.x &&
        this.player.x < tp.x + tp.width &&
        this.player.y + this.player.height > tp.y &&
        this.player.y < tp.y + tp.height &&
        isSpaceJustPressed
      ) {
        const pair = this.teleports.find((other) => other !== tp && other.pairId === tp.pairId);
        if (pair) {
          this.player.x = pair.x + 8;
          this.player.y = pair.y - this.player.height;
        }
      }
    }

    // ゴール判定
    if (
      this.player.x + this.player.width > this.goal.x &&
      this.player.x < this.goal.x + this.goal.width &&
      this.player.y + this.player.height > this.goal.y &&
      this.player.y < this.goal.y + this.goal.height
    ) {
      this.pauseState = 'clear';
      this.pauseTimer = 30; // 30フレーム＝1秒（30fps時）
      return;
    }

    // 敵との当たり判定
    for (const enemy of this.enemies) {
      if (
        this.player.x + this.player.width > enemy.x &&
        this.player.x < enemy.x + enemy.width &&
        this.player.y + this.player.height > enemy.y &&
        this.player.y < enemy.y + enemy.height
      ) {
        this.lives--;
        this.updateStatusBar();
        this.pauseState = 'death';
        this.pauseTimer = 30; // 1秒
        return;
      }
    }

    // Enemy1の左右移動
    for (const enemy of this.enemies) {
      enemy.updateMove();
    }

    // ステータスバー更新
    this.updateStatusBar();

    // 最後に前フレームのキー状態を更新
    this.prevKeys = { ...this.keys };
  };

  private handlePlayerDeath() {
    this.lives--;
    console.log(this.lives);
    this.updateStatusBar();
    if (this.lives === 0) {
      this.showGameOver();
    } else if (this.lives > 0) {
      this.restartStage();
    }
  }

  // ステージを最初からやり直し
  protected restartStage() {
    // サブクラスで再実装可。ここではシーンを再生成する想定
    this.onRetry(this.getStageNumber(), this.lives);
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
      location.reload(); // 仮実装
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
