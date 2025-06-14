import { AnimatedSprite, Container, type Spritesheet } from 'pixi.js';

// ビームクラス（寿命は持たない）
class Beam extends Container {
  private sprite: AnimatedSprite;

  constructor(direction: number, spritesheet: Spritesheet) {
    super();
    const animName = direction === 1 ? 'beam_right' : 'beam_left';
    this.sprite = new AnimatedSprite(spritesheet.animations[animName]);
    this.sprite.animationSpeed = 1;
    this.sprite.play();
    this.addChild(this.sprite);
  }
}

export class Enemy2 extends AnimatedSprite {
  // 移動範囲
  private leftBoundMin: number;
  private leftBoundMax: number;
  private rightBoundMin: number;
  private rightBoundMax: number;
  private leftBound: number;
  private rightBound: number;

  // 状態
  private direction: number; // 1:右, -1:左
  private isShooting = false;
  private beam: Beam | null = null;
  private beamFrameCount = 0;
  private isTurning = false;
  private turnAnimName: string | null = null;

  // 依存
  private spritesheet: Spritesheet;

  constructor(
    spritesheet: Spritesheet,
    leftBoundMin: number,
    leftBoundMax: number,
    rightBoundMin: number,
    rightBoundMax: number,
    direction: number,
  ) {
    // 初期アニメーション
    super(spritesheet.animations[direction === 1 ? 'move_right' : 'move_left']);
    this.spritesheet = spritesheet;
    this.leftBoundMin = leftBoundMin;
    this.leftBoundMax = leftBoundMax;
    this.rightBoundMin = rightBoundMin;
    this.rightBoundMax = rightBoundMax;
    this.leftBound = this.getRandomInRange(leftBoundMin, leftBoundMax);
    this.rightBound = this.getRandomInRange(rightBoundMin, rightBoundMax);
    this.direction = direction;
    this.animationSpeed = 1;
    this.play();
  }

  private getRandomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  // 呼び出し側でbeams配列を渡して管理する
  updateMove(beams: Beam[]) {
    // ビーム発射中
    if (this.isShooting) {
      this.beamFrameCount++;
      if (this.beamFrameCount >= 20) {
        // ビーム消去
        if (this.beam?.parent) {
          this.beam.parent.removeChild(this.beam);
        }
        this.beam = null;
        this.isShooting = false;
        this.beamFrameCount = 0;
        this.updateAnimation();
      }
      return;
    }

    // 振り返り中
    if (this.isTurning) return;

    // ランダムでビーム発射判定（1/10の確率）
    if (Math.random() < 0.1) {
      this.isShooting = true;
      this.beam = new Beam(this.direction, this.spritesheet);
      this.beam.position.set(this.x + this.width * 0.5 * this.direction, this.y);
      beams.push(this.beam);
      if (this.parent) {
        this.parent.addChild(this.beam);
      }
      this.beamFrameCount = 0;
      this.gotoAndStop(0); // ビーム発射時は停止
      return;
    }

    // 通常移動
    const speed = 2; // ENEMY2_SPEEDなどで調整
    this.x += speed * this.direction;

    // 端到達時の振り返り処理
    if (this.direction === 1 && this.x > this.rightBound) {
      this.x = this.rightBound;
      this.startTurning('turn_right_to_left');
      // 往復範囲を更新
      this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
      this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
    }
    if (this.direction === -1 && this.x < this.leftBound) {
      this.x = this.leftBound;
      this.startTurning('turn_left_to_right');
      // 往復範囲を更新
      this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
      this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
    }
  }

  private updateAnimation() {
    if (this.isShooting) {
      // ビーム発射時は停止アニメ
      const animName = this.direction === 1 ? 'shoot_right' : 'shoot_left';
      this.textures = this.spritesheet.animations[animName];
      this.gotoAndStop(0);
    } else if (this.isTurning && this.turnAnimName) {
      this.textures = this.spritesheet.animations[this.turnAnimName];
      this.play();
    } else {
      const animName = this.direction === 1 ? 'move_right' : 'move_left';
      this.textures = this.spritesheet.animations[animName];
      this.play();
    }
  }

  private startTurning(animName: string) {
    this.isTurning = true;
    this.turnAnimName = animName;
    this.updateAnimation();
    this.loop = false;
    this.onComplete = () => {
      this.isTurning = false;
      this.turnAnimName = null;
      this.direction *= -1;
      this.loop = true;
      this.updateAnimation();
      this.onComplete = undefined;
    };
  }
}
