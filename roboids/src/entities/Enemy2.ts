import { AnimatedSprite, type Spritesheet } from 'pixi.js';
import { Beam } from './Beam';

export class Enemy2 extends AnimatedSprite {
  private leftBoundMin!: number;
  private leftBoundMax!: number;
  private rightBoundMin!: number;
  private rightBoundMax!: number;
  private leftBound!: number;
  private rightBound!: number;
  private direction!: number; // 1:右, -1:左

  private isShooting = false;
  private beam: Beam | null = null;
  private beamFrameCount = 0;
  private isTurning = false;
  private spritesheet!: Spritesheet;

  // コンストラクタはprivate
  private constructor(textures: any[]) {
    super(textures);
    this.animationSpeed = 1;
    this.play();
  }

  // static createでインスタンス生成＆初期化
  static async create(
    spritesheet: Spritesheet,
    leftBoundMin: number,
    leftBoundMax: number,
    rightBoundMin: number,
    rightBoundMax: number,
    direction: number,
  ): Promise<Enemy2> {
    // 初期アニメーションは右向き
    const instance = new Enemy2(spritesheet.animations['move_right']);
    instance.spritesheet = spritesheet;
    instance.leftBoundMin = leftBoundMin;
    instance.leftBoundMax = leftBoundMax;
    instance.rightBoundMin = rightBoundMin;
    instance.rightBoundMax = rightBoundMax;
    instance.leftBound = instance.getRandomInRange(leftBoundMin, leftBoundMax);
    instance.rightBound = instance.getRandomInRange(rightBoundMin, rightBoundMax);
    instance.direction = direction;
    instance.setDirectionScale();
    return instance;
  }

  private getRandomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private setDirectionScale() {
    // 右向き: scale.x=1, 左向き: scale.x=-1
    this.scale.x = this.direction;
  }

  async updateMove(beams: Beam[]) {
    if (this.isShooting) {
      this.beamFrameCount++;
      if (this.beamFrameCount >= 20) {
        if (this.beam && this.beam.parent) {
          this.beam.parent.removeChild(this.beam);
        }
        this.beam = null;
        this.isShooting = false;
        this.beamFrameCount = 0;
        this.updateAnimation();
      }
      return;
    }

    if (this.isTurning) return;

    // ランダムでビーム発射判定（1/10）
    if (Math.random() < 0.1) {
      this.isShooting = true;
      this.beam = await Beam.create(this.direction, this.spritesheet);
      this.beam.position.set(this.x + this.width * 0.5 * this.direction, this.y);
      if (this.parent) this.parent.addChild(this.beam);
      beams.push(this.beam);
      this.beamFrameCount = 0;
      this.gotoAndStop(0);
      return;
    }

    // 通常移動
    const speed = 2;
    this.x += speed * this.direction;

    if (this.direction === 1 && this.x > this.rightBound) {
      this.x = this.rightBound;
      this.startTurning();
      this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
      this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
    }
    if (this.direction === -1 && this.x < this.leftBound) {
      this.x = this.leftBound;
      this.startTurning();
      this.leftBound = this.getRandomInRange(this.leftBoundMin, this.leftBoundMax);
      this.rightBound = this.getRandomInRange(this.rightBoundMin, this.rightBoundMax);
    }
  }

  private updateAnimation() {
    if (this.isShooting) {
      this.textures = this.spritesheet.animations['shoot_right'];
      this.gotoAndStop(0);
    } else if (this.isTurning) {
      this.textures = this.spritesheet.animations['turn_right_to_left'];
      this.play();
    } else {
      this.textures = this.spritesheet.animations['move_right'];
      this.play();
    }
    this.setDirectionScale();
  }

  private startTurning() {
    this.isTurning = true;
    this.textures = this.spritesheet.animations['turn_right_to_left'];
    this.loop = false;
    this.play();
    this.setDirectionScale();
    this.onComplete = () => {
      this.isTurning = false;
      this.direction *= -1;
      this.loop = true;
      this.updateAnimation();
      this.onComplete = undefined;
    };
  }
}
