import { sound } from '@pixi/sound';
import { Assets, type Spritesheet } from 'pixi.js';
import { ENEMY2_SPEED } from '~/constants/gameConfig';
import { EnemyBase } from '~/entities/EnemyBase';
import type { Bound, Direction } from '~/types';
import { playSE } from '~/utils/playSE';
import { Beam } from './Beam';
import type { Player } from './Player';

sound.add('beam', 'sounds/death.mp3');

const RATE_BEAM = 0.05; // ビーム発射率
const BEAM_FRAME_COUNT = 19; // ビームのフレーム数

export class Enemy2 extends EnemyBase {
  private isShooting = false;
  private beamFrameCount = 0;
  private beam: Beam;
  private isTurning: boolean;
  spriteSheet: Spritesheet;

  private constructor(
    spriteSheet: Spritesheet,
    {
      bound,
      direction,
      speed,
    }: {
      bound: Bound;
      direction: Direction;
      speed?: number;
    },
    beam: Beam,
  ) {
    super(spriteSheet, { bound, direction, speed });
    this.beam = beam;
    this.spriteSheet = spriteSheet;
    this.isTurning = false;
    this.direction = direction;
    this.updateAnimation();
    this.loop = false;
  }

  static async create({
    bound,
    direction,
    speed = ENEMY2_SPEED,
  }: {
    bound: Bound;
    direction: Direction;
    speed?: number;
  }) {
    const sheet: Spritesheet = await Assets.load('/images/enemy2.json');
    const beam = await Beam.create(direction);
    return new Enemy2(sheet, { bound, direction, speed }, beam);
  }

  // 振り向きアニメーションの開始
  private startTurning() {
    this.isTurning = true;
    if (this.direction === 1) {
      // 右→左
      this.textures = this.spriteSheet.animations['turn_right_to_left'];
    } else {
      // 左→右
      this.textures = this.spriteSheet.animations['turn_left_to_right'];
    }
    this.play();
    this.onComplete = () => {
      this.isTurning = false;
      this.direction *= -1;
      this.updateAnimation();
      this.onComplete = undefined;
    };
  }

  // アニメーション切り替え
  private updateAnimation() {
    if (this.isTurning) return;
    if (this.direction === 1) {
      this.textures = this.spriteSheet.animations['move_right'];
    } else {
      this.textures = this.spriteSheet.animations['move_left'];
    }
    this.play();
  }

  // 移動処理のオーバーライド
  updateMove() {
    if (this.isTurning) return; // 振り向き中は何もしない

    // ビーム発射中は移動せず、ビームのフレーム管理のみ
    if (this.isShooting) {
      this.beamFrameCount++;
      if (this.beamFrameCount >= BEAM_FRAME_COUNT) {
        this.isShooting = false;
        this.beam.visible = false;
        this.beamFrameCount = 0;
        this.updateAnimation(); // 移動アニメーションに戻す
      }
      return;
    }

    // ビーム発射判定
    if (Math.random() < RATE_BEAM) {
      this.isShooting = true;
      this.beamFrameCount = 0;
      this.beam.visible = true;
      // ビームの位置と向き
      this.beam.x = this.x + 40 * this.direction;
      this.beam.y = this.y - 7;
      this.beam.scale.x = -this.direction;
      if (this.parent && !this.beam.parent) {
        this.parent.addChild(this.beam);
      }
      playSE('beam');

      this.gotoAndStop(0); // ビーム発射中は静止アニメーション
      return;
    }

    // 端に到達したら振り向き開始
    if (this.direction === 1 && this.x + this.speed > this.rightBound) {
      this.x = this.rightBound;
      this.startTurning();
      return;
    }
    if (this.direction === -1 && this.x - this.speed < this.leftBound) {
      this.x = this.leftBound;
      this.startTurning();
      return;
    }

    // 通常移動
    this.x += this.speed * this.direction;
    this.updateAnimation();
  }
  isHitPlayer(player: Player) {
    if (super.isHitPlayer(player)) return true;
    if (!this.isShooting) return false;
    // プレイヤーとビームのAABB判定
    const aex = this.beam.anchor.x;
    const aey = this.beam.anchor.y;
    const beamRect = {
      left: this.beam.x - this.beam.width * aex,
      right: this.beam.x + this.beam.width * (1 - aex),
      top: this.beam.y - this.beam.height * aey,
      bottom: this.beam.y + this.beam.height * (1 - aey),
    };
    const pax = player.anchor.x;
    const pay = player.anchor.y;
    const playerRect = {
      left: player.x - player.width * pax,
      right: player.x + player.width * (1 - pax),
      top: player.y - player.height * pay,
      bottom: player.y + player.height * (1 - pay),
    };
    return (
      playerRect.right > beamRect.left &&
      playerRect.left < beamRect.right &&
      playerRect.bottom > beamRect.top &&
      playerRect.top < beamRect.bottom
    );
  }
}
