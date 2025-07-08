import { sound } from '@pixi/sound';

// SEを再生する関数
export const playSE = (key: string) => {
  sound.stopAll(); // すべてのサウンドを止める
  sound.play(key); // 新しいSEを再生
};
