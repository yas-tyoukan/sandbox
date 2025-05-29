import { Assets, Container, Graphics, type Spritesheet, Ticker } from 'pixi.js';
import { Enemy1 } from '../entities/Enemy1';
import { Goal } from '../entities/Goal';
import { Player } from '../entities/Player';
import { TeleportPad } from '../entities/TeleportPad';

type Platform = { x: number; y: number; width: number; height: number };

export class Stage1Scene extends Container {
  private player!: Player;
  private enemies: Enemy1[] = [];
  private platforms: Platform[] = [];
  private teleports: TeleportPad[] = [];
  private goal!: Goal;
  private velocityY = 0;
  private onGround = false;
  private keys: Record<string, boolean> = {};
  private prevKeys: Record<string, boolean> = {};

  constructor(private onStageClear: (level: number) => void) {
    super();
    this.init();
  }

  private async init() {
    // プラットフォーム設計
    this.platforms = [
      { x: 0, y: 120, width: 800, height: 16 },
      { x: 0, y: 320, width: 800, height: 16 },
      { x: 0, y: 520, width: 800, height: 16 },
    ];

    // プラットフォーム描画
    for (const p of this.platforms) {
      const g = new Graphics();
      g.rect(p.x, p.y, p.width, p.height);
      g.fill(0xffffff);
      this.addChild(g);
    }

    // TELEPORT床設計＆配置
    const teleportDefs = [
      { x: 0, y: 120, width: 100, height: 16, pairId: 1 }, // 1段目右
      { x: 0, y: 320, width: 100, height: 16, pairId: 1 }, // 2段目左
      { x: 700, y: 320, width: 100, height: 16, pairId: 2 }, // 2段目右
      { x: 700, y: 520, width: 100, height: 16, pairId: 2 }, // 3段目左
    ];
    for (const tp of teleportDefs) {
      const pad = new TeleportPad(tp.x, tp.y, tp.width, tp.height, tp.pairId);
      this.teleports.push(pad);
      this.addChild(pad);
    }

    // ゴールマーカー設置（仮）
    this.goal = new Goal(750, 60);
    this.addChild(this.goal);

    // プレイヤー
    this.player = await Player.create();
    this.player.x = 40;
    this.player.y = 520 - 32; // 3段目左
    this.addChild(this.player);

    // Enemy1の配置
    const enemySheet: Spritesheet = await Assets.load('/images/enemy1.json');
    const enemyPositions = [
      { x: 400, y: 60, left: 100, right: 700 }, // 1段目
      { x: 300, y: 260, left: 100, right: 700 }, // 2段目
      { x: 100, y: 460, left: 100, right: 700 }, // 3段目
    ];
    for (const pos of enemyPositions) {
      const enemy = new Enemy1(enemySheet, pos.left, pos.right);
      enemy.x = pos.x;
      enemy.y = pos.y;
      this.enemies.push(enemy);
      this.addChild(enemy);
    }

    // 入力リスナー
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    // ゲームループ
    Ticker.shared.add(this.update, this);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.keys[e.code] = true;
  };
  private onKeyUp = (e: KeyboardEvent) => {
    this.keys[e.code] = false;
  };

  private update = () => {
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
        this.player.y + this.player.height <= p.y + 16 &&
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
      // スペースキーを「押した瞬間」だけテレポート
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
      this.onStageClear(1);
    }

    // Enemy1の左右移動
    for (const enemy of this.enemies) {
      enemy.updateMove();
    }
    // 最後に前フレームのキー状態を更新
    this.prevKeys = { ...this.keys };
  };

  override destroy(options?: boolean | import('pixi.js').DestroyOptions) {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    Ticker.shared.remove(this.update, this);
    super.destroy(options);
  }
}
