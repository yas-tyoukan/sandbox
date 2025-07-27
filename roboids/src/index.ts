import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, START_LEVEL } from '~/constants/gameConfig';
import { Stage1Scene } from '~/scenes/Stage1Scene';
import { Stage2Scene } from '~/scenes/Stage2Scene';
import { Stage3Scene } from '~/scenes/Stage3Scene';
import { Stage4Scene } from '~/scenes/Stage4Scene';
import { Stage5Scene } from '~/scenes/Stage5Scene';
import { Stage6Scene } from '~/scenes/Stage6Scene';
import { Stage7Scene } from '~/scenes/Stage7Scene';
import { Stage8Scene } from '~/scenes/Stage8Scene';
import { TitleScene } from '~/scenes/TitleScene';

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

  let currentScene: PIXI.Container | null = null;

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

  function startStage(level = 1, lives = 1004) {
    if (currentScene) {
      app.stage.removeChild(currentScene);
      currentScene.destroy({ children: true });
      currentScene = null;
    }
    // 例: Stage1Sceneをここで生成してaddChild
    const stage = (() => {
      const args = {
        startStage,
        lives,
        showTitle,
      };
      switch (level) {
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
        case 8:
          return new Stage8Scene(args);
        default:
          throw new Error(`Unknown level: ${level}`);
      }
    })();
    currentScene = stage;
    app.stage.addChild(stage);
  }

  function onStageClear(level: number, lives: number) {
    // ステージクリア時の処理
    startStage(level + 1, lives);
  }

  showTitle();
}

main();
