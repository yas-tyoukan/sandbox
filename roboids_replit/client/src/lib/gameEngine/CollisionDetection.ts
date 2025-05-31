export interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export class CollisionDetection {
  static checkAABB(a: Bounds, b: Bounds): boolean {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }

  static resolveCollision(
    movingObject: { position: { x: number; y: number }; velocity: { x: number; y: number }; size: { x: number; y: number } },
    staticObject: Bounds
  ): { x: boolean; y: boolean } {
    const collision = { x: false, y: false };
    
    const objBounds = {
      left: movingObject.position.x,
      right: movingObject.position.x + movingObject.size.x,
      top: movingObject.position.y,
      bottom: movingObject.position.y + movingObject.size.y
    };

    if (this.checkAABB(objBounds, staticObject)) {
      // Calculate overlap amounts
      const overlapLeft = objBounds.right - staticObject.left;
      const overlapRight = staticObject.right - objBounds.left;
      const overlapTop = objBounds.bottom - staticObject.top;
      const overlapBottom = staticObject.bottom - objBounds.top;

      // Find smallest overlap
      const minOverlapX = Math.min(overlapLeft, overlapRight);
      const minOverlapY = Math.min(overlapTop, overlapBottom);

      if (minOverlapX < minOverlapY) {
        // Resolve horizontal collision
        if (overlapLeft < overlapRight) {
          movingObject.position.x = staticObject.left - movingObject.size.x;
        } else {
          movingObject.position.x = staticObject.right;
        }
        movingObject.velocity.x = 0;
        collision.x = true;
      } else {
        // Resolve vertical collision
        if (overlapTop < overlapBottom) {
          movingObject.position.y = staticObject.top - movingObject.size.y;
          if (movingObject.velocity.y > 0) {
            (movingObject as any).isOnGround = true;
          }
        } else {
          movingObject.position.y = staticObject.bottom;
        }
        movingObject.velocity.y = 0;
        collision.y = true;
      }
    }

    return collision;
  }
}
