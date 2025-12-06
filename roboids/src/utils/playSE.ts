import { sound } from '@pixi/sound';

// 効果音追加
sound.add('beep', './sounds/beep.mp3');
sound.add('beam', './sounds/death.mp3');
sound.add('death', './sounds/death.mp3');
sound.add('goal', './sounds/goal.mp3');
sound.add('jump', './sounds/jump.mp3');
sound.add('teleport', './sounds/teleport.mp3');
sound.add('force-field', './sounds/force-field.mp3');

// 音声エフェクトの優先度を定義
const SE_PRIORITY: { [key: string]: number } = {
  beep: 4,
  goal: 3,
  death: 2,
  teleport: 2,
  'force-field': 2,
  jump: 2,
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
