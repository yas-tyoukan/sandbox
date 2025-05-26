import * as PIXI from 'pixi.js';
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
    // const stage1 = new Stage1Scene();
    // app.stage.addChild(stage1);
    alert('ステージ1開始！（ここにゲーム本編を実装）');
  }

  showTitle();
}

main();
