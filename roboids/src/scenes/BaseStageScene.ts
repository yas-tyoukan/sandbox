import { sound } from '@pixi/sound';
import { Assets, Container, Graphics, type Spritesheet, Text, Ticker } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, PLAYER_SPEED } from '~/constants/gameConfig';
import { Enemy1 } from '~/entities/Enemy1';
import { Player } from '~/entities/Player';
import { PowerSquare } from '~/entities/PowerSquare';
import { TeleportPad } from '~/entities/TeleportPad';

type Platform = { x: number; y: number; width: number; height: number };

type PauseState = 'none' | 'death' | 'clear';
type Floor = 0 | 1 | 2; // 各段の床番号（0: 最下段, 1: 中段, 2: 最上段）

sound.add('death', 'sounds/death.mp3');
sound.add('goal', 'sounds/goal.mp3');
sound.add('jump', 'sounds/jump.mp3');
sound.add('teleport', 'sounds/teleport.mp3');

export abstract class BaseStageScene extends Container {
  protected startStage: (level: number, lives: number) => void;
  protected lives: number;
  protected showTitle: () => void;
  protected player!: Player;
  protected enemies: Enemy1[] = [];
  protected platforms: Platform[] = [];
  protected teleports: TeleportPad[] = [];
  protected goal!: PowerSquare;
  protected velocityY = 0;
  protected isPlayerOnGround = true;
  protected keys: Record<string, boolean> = {};
  protected prevKeys: Record<string, boolean> = {};
  protected platformYs: number[] = [];

  private statusBar!: Graphics;
  private livesText!: Text;
  private levelText!: Text;
  private gameOverModal?: Container;

  // 停止状態管理
  private pauseState: PauseState = 'none';
  private pauseTimer = 0; // フレーム単位（30fpsなら30で1秒）
  private teleportingTimer = 0;
  private beforeTeleportPlayer: Player | null = null;
  private isTeleporting = false;

  constructor({
    startStage,
    lives = 4,
    showTitle,
  }: {
    startStage: (level: number, lives: number) => void;
    lives: number;
    showTitle: () => void;
  }) {
    super();
    this.startStage = startStage;
    this.lives = lives;
    this.showTitle = showTitle;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.createStageBase();
    Promise.all([this.initStage(), this.initPlayer(), this.initGoal()]).then(() => {
      Ticker.shared.add(this.update, this);
    });
  }

  // ステージ固有の初期化（サブクラスで実装）
  protected abstract initStage(): void;
  protected abstract initPlayer(): Promise<void>;
  protected abstract getStageNumber(): number;
  protected abstract initGoal(): Promise<void>;

  private createStageBase() {
    // ステージの基本設計
    // 枠線
    const border = new Graphics();
    border.rect(1, 1, GAME_WIDTH - 1, GAME_HEIGHT - 1);
    border.stroke({ width: 1, color: 0xffffff });
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
    const floorHeight = 102;
    const platformYs = [
      bottomY, // 最下段
      bottomY - floorHeight, // 中段
      bottomY - 2 * floorHeight, // 最上段
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
      text: `Level: ${this.getStageNumber()}`,
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
          this.startStage(this.getStageNumber() + 1, this.lives);
        }
        this.pauseState = 'none';
      }
      // 停止中は他の処理をスキップ
      return;
    }

    // ====== テレポート中の処理 ======
    await this.updateTeleporting();

    // ====== 通常時の進行 ======

    // プレイヤー左右移動
    if (!this.isTeleporting) {
      const speed = PLAYER_SPEED;
      if (this.keys['KeyA']) {
        this.player.x -= speed;
      }
      if (this.keys['KeyD']) {
        this.player.x += speed;
      }
      // 壁との当たり判定
      const anchorX = this.player.anchor?.x ?? 0.5; // デフォルト0.5（中心基準）
      const halfWidth = this.player.width * anchorX;
      const rightHalfWidth = this.player.width * (1 - anchorX);
      const offset = 8;
      // 左端
      if (this.player.x - halfWidth < offset) {
        this.player.x = halfWidth + offset;
      }
      // 右端
      if (this.player.x + rightHalfWidth > GAME_WIDTH - offset) {
        this.player.x = GAME_WIDTH - rightHalfWidth - offset;
      }

      // ジャンプ
      const isJumpJustPressed = this.keys['KeyW'] && !this.prevKeys['KeyW'];
      if (isJumpJustPressed && this.isPlayerOnGround) {
        this.velocityY = -8;
        this.isPlayerOnGround = false;
        sound.play('jump');
      }

      // 重力
      // TODO 重力で自然な計算ではなく、頭打ちがある。調整が必要
      this.velocityY += 0.5;
      if (Math.abs(this.velocityY) > 2) {
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

      // TELEPORT判定
      for (const tp of this.teleports) {
        const isSpaceJustPressed = this.keys['Space'] && !this.prevKeys['Space'];
        if (
          this.player.x + 8 / 2 < tp.x + tp.width / 2 &&
          this.player.x - 8 / 2 > tp.x - tp.width / 2 &&
          this.player.y < tp.y &&
          this.player.y > tp.y - this.player.height &&
          this.isPlayerOnGround &&
          isSpaceJustPressed
        ) {
          const pair = this.teleports.find((other) => other !== tp && other.pairId === tp.pairId);
          if (pair) {
            this.startTeleporting({ x: this.player.x, y: this.player.y });
            this.player.x = pair.x;
            this.player.y = pair.y - this.player.height / 2 - 3;
            this.isPlayerOnGround = true;
            sound.play('teleport');
            break;
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
        this.pauseTimer = 40; // 30フレーム＝1秒（30fps時）
        sound.play('goal');
        return;
      }
    }

    // 敵との当たり判定
    for (const enemy of this.enemies) {
      // プレイヤー
      const pAnchorX = this.player.anchor?.x ?? 0;
      const pAnchorY = this.player.anchor?.y ?? 0;
      const playerCenterX = this.player.x + this.player.width * pAnchorX;
      const playerCenterY = this.player.y + this.player.height * pAnchorY;
      // 敵
      const eAnchorX = enemy.anchor?.x ?? 0;
      const eAnchorY = enemy.anchor?.y ?? 0;
      const enemyCenterX = enemy.x + enemy.width * eAnchorX;
      const enemyCenterY = enemy.y + enemy.height * eAnchorY;

      const dx = Math.abs(playerCenterX - enemyCenterX);
      const dy = Math.abs(playerCenterY - enemyCenterY);
      const halfW = (this.player.width + enemy.width) / 2;
      const halfH = (this.player.height + enemy.height + 14) / 2;

      if (dx < halfW && dy < halfH) {
        this.lives--;
        this.updateStatusBar();
        this.pauseState = 'death';
        this.pauseTimer = 30;
        this.resetTeleporting();
        sound.play('death');
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

  // ステージを最初からやり直し(サブクラスで実装)
  protected abstract restartStage(): void;

  protected async addPlayer({ x, y }: { x: number; y: number }) {
    this.player = await Player.create();
    this.player.x = x;
    this.player.y = y;
    this.player.anchor.set(0.5, 0.5);
    this.addChild(this.player);
  }

  protected addTeleportPad(x: number, floor: Floor, pairId: number) {
    TeleportPad.create(x, this.platformYs[floor], pairId).then((pad) => {
      this.teleports.push(pad);
      this.addChild(pad);
    });
  }

  protected async addEnemies(
    args: {
      x: number;
      floor: Floor;
      bound: { left: number; right: number };
      direction: number;
    }[],
  ) {
    const sheet: Spritesheet = await Assets.load('/images/enemy1.json');
    for (const { x, floor, bound, direction } of args) {
      const enemy = new Enemy1(sheet, bound.left, bound.right, direction);
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
