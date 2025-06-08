import { Graphics } from 'pixi.js';

// プレイヤーのサイズ
const width = 25; // マスクの幅
const height = 30; // マスクの高さ
const dotRotations = [0, 4, 2, 6, 1, 5, 3, 7]; // ドットの出現順序

const masks: Graphics[] = [];

export const createTeleportingMasks = async () => {
  const r = dotRotations.length;
  for (let i = 0; i < r; i += 1) {
    const g = new Graphics();
    for (let y = 0; y < height; y++) {
      for (let x = width; 0 < x; x--) {
        for (let j = 0; j < r; j++) {
          g.rect(x, y, 1, 1).fill({
            color: 0x000000,
            alpha: (x + y * width + 1) % r < i ? 1 : 0,
          });
        }
      }
    }
    masks.push(g);
  }
  return masks;
};

export const getPlayerMasks = async (index: number) => {
  // if (masks.length === 0) await create();
  // const ret = masks[index];
  // if (!ret) {
  //   throw new Error(`TeleportPlayerMasks: Invalid index ${index}`);
  // }
  // return ret;
  const g = new Graphics();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      g.rect(x, y, 1, 1).fill({
        color: 0x000000,
        alpha: (x + y * width) % 2 === index % 2 ? 1 : 0,
      });
    }
  }
  return g;
};
