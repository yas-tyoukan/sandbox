import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH } from '~/constants/gameConfig';
import { Stage1Scene } from '~/scenes/Stage1Scene';
import { Stage2Scene } from '~/scenes/Stage2Scene';
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
    const titleScene = new TitleScene(startStage);
    app.stage.addChild(titleScene);
    currentScene = titleScene;
  }

  function startStage(level = 1, lives = 4) {
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
