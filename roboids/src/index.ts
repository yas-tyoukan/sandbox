import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, START_LEVEL, LIVES } from '~/constants/gameConfig';
import { fontsLoad } from '~/utils/fontsLoad';
import { Stage1Scene } from '~/scenes/Stage1Scene';
import { Stage2Scene } from '~/scenes/Stage2Scene';
import { Stage3Scene } from '~/scenes/Stage3Scene';
import { Stage4Scene } from '~/scenes/Stage4Scene';
import { Stage5Scene } from '~/scenes/Stage5Scene';
import { Stage6Scene } from '~/scenes/Stage6Scene';
import { Stage7Scene } from '~/scenes/Stage7Scene';
import { TitleScene } from '~/scenes/TitleScene';
import { HighScoreModal } from '~/entities/HighScoreModal';
import { BaseStageScene } from '~/scenes/BaseStageScene';

async function main() {
  const app = new PIXI.Application();
  await app.init({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    background: '#000000',
    resolution: 2,
    autoDensity: true,
  });
  document.body.appendChild(app.canvas);

  let currentScene: TitleScene | BaseStageScene | null = null;

  function showTitle() {
    if (currentScene) {
      currentScene.destroy({ children: true });
      app.stage.removeChild(currentScene);
    }
    const titleScene = new TitleScene(startStage, START_LEVEL);
    app.stage.addChild(titleScene);
    currentScene = titleScene;
    // ブラウザの制限で、autoPlay:trueにしてもユーザのアクションなしには再生開始されない
    sound.add('title', { url: 'sounds/title.mp3', autoPlay: true });
  }

  function calcStagePattern(level: number): [number, number] {
    let stagePattern = 1;
    let enemyPattern = 0;
    for (let i = 1; i < level; i++) {
      if (stagePattern !== 7) {
        stagePattern += 1;
      } else if ((i - 15) % 19 === 0) {
        stagePattern = 2;
      } else if ((i - 13) % 19 === 0) {
        enemyPattern += 1;
      } else if ((i - 14) % 19 !== 0) {
        enemyPattern += 1;
        stagePattern = 2;
      } else {
        stagePattern = 2;
      }
    }
    switch (stagePattern) {
      case 1: {
        enemyPattern = 0;
        break;
      }
      case 2: {
        enemyPattern = enemyPattern % 3;
        break;
      }
      case 3: {
        enemyPattern = enemyPattern % 2;
        break;
      }
      case 4: {
        enemyPattern = enemyPattern % 3;
        break;
      }
      case 5: {
        enemyPattern = enemyPattern % 3;
        break;
      }
      case 6: {
        enemyPattern = enemyPattern % 3;
        break;
      }
      case 7: {
        enemyPattern = enemyPattern % 4;
        break;
      }
      default:
    }
    return [stagePattern, enemyPattern];
  }

  function startStage(level = 1, lives = LIVES) {
    if (currentScene) {
      app.stage.removeChild(currentScene);
      currentScene.destroy({ children: true });
      currentScene = null;
    }
    // 例: Stage1Sceneをここで生成してaddChild
    const stage = (() => {
      const [stage, pattern] = calcStagePattern(level);
      const args = {
        startStage,
        lives,
        showTitle,
        level,
        pattern,
      };
      switch (stage) {
        case 1:
          return new Stage1Scene(args);
        case 2:
          return new Stage2Scene(args);
        case 3:
          return new Stage3Scene(args);
        case 4:
          return new Stage4Scene(args);
        case 5:
          return new Stage5Scene(args);
        case 6:
          return new Stage6Scene(args);
        case 7:
          return new Stage7Scene(args);
        default:
          throw new Error(`Unknown stage ${stage}, level: ${level}`);
      }
    })();
    currentScene = stage;
    app.stage.addChild(stage);
  }
  // フォント読み込み後にタイトル画面表示
  await fontsLoad(['12px Chicago_Light', '12px Chicago_Bold', '12px CourierPrime-Regular']);
  showTitle();

  // ハイスコア表示
  document.getElementById('show-high-scores')?.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (currentScene instanceof BaseStageScene) {
      currentScene.pause();
    }
    // TODO app.stop()しても音が止まらないし、再開もできない。ステージにストップ機能を入れる
    const highScoreModal = await HighScoreModal.create(() => {
      app.stage.removeChild(highScoreModal);
      if (currentScene instanceof BaseStageScene) {
        currentScene.resume();
      }
    });
    app.stage.addChild(highScoreModal);
  });
}

main();
