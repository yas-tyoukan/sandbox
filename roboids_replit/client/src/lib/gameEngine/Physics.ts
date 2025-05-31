export class Physics {
  static readonly GRAVITY = 0.3;
  static readonly TERMINAL_VELOCITY = 15;

  static applyGravity(object: { velocity: { y: number } }) {
    object.velocity.y += this.GRAVITY;

    // Terminal velocity
    if (object.velocity.y > this.TERMINAL_VELOCITY) {
      object.velocity.y = this.TERMINAL_VELOCITY;
    }
  }

  static updatePosition(object: { position: { x: number; y: number }; velocity: { x: number; y: number } }) {
    object.position.x += object.velocity.x;
    object.position.y += object.velocity.y;
  }
}
