export type Bound = {
  leftMin?: number;
  leftMax?: number;
  left?: number;
  rightMin?: number;
  rightMax?: number;
  right?: number;
};

/**
 * Direction type for movement.
 * -1 for left, 0 for stationary, 1 for right.
 */
export type Direction = -1 | 0 | 1;

export type EnemyType = 1 | 2 | 3 | 4 | 5;
