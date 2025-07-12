import { sound } from '@pixi/sound';

// 音声エフェクトの優先度を定義
const SE_PRIORITY: { [key: string]: number } = {
  goal: 3,
  death: 3,
  jump: 2,
  'force-field': 2,
  teleport: 2,
  beam: 1,
};

let currentSE = '';
let currentSEPriority = 0;

const getPriority = (key: string) => {
  return SE_PRIORITY[key as keyof typeof SE_PRIORITY] ?? 0;
};

// SEを再生する関数
export const playSE = (key: string) => {
  const newPriority = getPriority(key);

  // すでに高優先度SEが鳴っていたら再生しない
  if (currentSE !== '' && currentSEPriority > newPriority) {
    return;
  }
  sound.stopAll(); // すべてのサウンドを止める
  currentSE = key;
  currentSEPriority = newPriority;

  const instanceOrPromise = sound.play(key);
  Promise.resolve(instanceOrPromise).then((instance) => {
    instance.on('end', () => {
      if (currentSE === key) {
        currentSE = '';
        currentSEPriority = 0;
      }
    });
  });
};
