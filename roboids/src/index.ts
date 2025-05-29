import * as PIXI from 'pixi.js';
import { Stage1Scene } from './scenes/Stage1Scene';
import { TitleScene } from './scenes/TitleScene';

async function main() {
  const app = new PIXI.Application();
  await app.init({ width: 800, height: 600, background: '#000000' });
  document.body.appendChild(app.canvas);

  let currentScene: PIXI.Container | null = null;

  function showTitle() {
    if (currentScene) {
      currentScene.destroy({ children: true });
      app.stage.removeChild(currentScene);
    }
    const titleScene = new TitleScene(startGame);
    app.stage.addChild(titleScene);
    currentScene = titleScene;
  }

  function startGame() {
    if (currentScene) {
      currentScene.destroy({ children: true });
      app.stage.removeChild(currentScene);
    }
    // 例: Stage1Sceneをここで生成してaddChild
    const stage1 = new Stage1Scene(onStageClear);
    app.stage.addChild(stage1);
  }

  function onStageClear(level: number) {
    // ステージクリア時の処理
    // ここではタイトル画面に戻る
    showTitle();
  }

  showTitle();
}

main();
