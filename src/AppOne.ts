import {
  AbstractMesh,
  Color3,
  Color4,
  Engine,
  PointLight,
  Scene,
  SceneLoader,
  ShadowGenerator,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import Person from './Interactive/Person';
import Floor from './Interactive/Floor';
import { AdvancedDynamicTexture } from '@babylonjs/gui';
import { spawnCamera } from './utils/spawnCamera';
import { generationPixelFloor } from './utils/generationPixelFloor';
import { generateLevel1 } from './levels/level1/level1';
import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';
import { sleep } from './app';

export class AppOne {
  engine: Engine;
  scene: Scene;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    this.engine.adaptToDeviceRatio = true;
    this.engine.renderEvenInBackground = true;
    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    this.scene = createScene(this.engine, this.canvas);
  }

  debug(debugOn = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }

  run() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

const doMove = async (person: Person, direction: string, count: number) => {
  if (person.crashed) return;
  switch (direction) {
    case 'forward':
      await person.moveForward(count);
      break;
    case 'back':
      await person.moveBack(count);
      break;
    case 'left':
      await person.moveLeft(count);
      break;
    case 'right':
      await person.moveRight(count);
      break;
  }
};

class CustomLoadingScreen implements ILoadingScreen {
  loadingScreen: HTMLElement;
  loadingUIBackgroundColor: string;
  loadingUIText: string;

  constructor() {
    const div = document.getElementById('loading');
    if (!div) {
      throw new Error('loading div not found');
    }
    this.loadingScreen = div;
    this.loadingUIBackgroundColor = '#fff';
    this.loadingUIText = 'Loading...';
  }

  displayLoadingUI() {
    this.loadingScreen.style.display = 'flex';
  }

  hideLoadingUI() {
    this.loadingScreen.classList.remove('start');
    this.loadingScreen.classList.add('end');
    sleep(300).then(() => {
      this.loadingScreen.style.display = 'none';
      const rightSide = document.getElementById('rightSide');
      rightSide?.classList.remove('none');
    });
  }
}

const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
  engine.loadingScreen = new CustomLoadingScreen();

  SceneLoader.Load('/models/', 'bridge.glb', engine);
  SceneLoader.Load('/models/', 'robot.glb', engine);
  SceneLoader.Load('/models/', 'road.glb', engine);
  SceneLoader.Load('/models/', 'stone.glb', engine);
  SceneLoader.Load('/models/', 'bridge.glb', engine);
  SceneLoader.Load('/models/', 'tree-2.glb', engine);
  SceneLoader.Load('/models/', 'tree-1.glb', engine);

  const scene = new Scene(engine);
  scene.createDefaultEnvironment({
    createSkybox: false,
    createGround: false,
    cameraContrast: 0.7,
    cameraExposure: 1,
  });
  scene.clearColor = new Color4(255, 255, 255, 255);
  scene.useRightHandedSystem = true;

  spawnCamera(scene);

  const light = new PointLight(
    'light',
    new Vector3(Math.PI / 2, 10, -2),
    scene,
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 1, 1);

  const GUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');

  const shadowGenerator = new ShadowGenerator(1024, light);

  const person = new Person({
    scene,
    position: new Vector3(0, -1, -10),
    shadowGenerator,
  });

  const boxArray: AbstractMesh[] = [];

  const playButton = document.getElementById('play') as HTMLButtonElement;
  const controls = document.querySelector('.controls') as Element;
  const plusButton = document.getElementById('plus');

  plusButton?.addEventListener('click', () => {
    const template = document.getElementById('template') as HTMLTemplateElement;
    const clone = template.content.cloneNode(true);
    controls.appendChild(clone);
    const ctrl = controls.querySelectorAll('.controls .control');
    if (ctrl.length === 3) {
      plusButton.classList.add('none');
    }
  });

  playButton?.addEventListener('click', async () => {
    playButton.disabled = true;
    const ctrl = controls.querySelectorAll('.controls .control');
    const moving = Array.from(ctrl).map((control) => {
      const move = Array.from(control.querySelectorAll('select')).map(
        (select) => select.value,
      );
      console.log(move);
      return {
        direction: move[1],
        count: Number(move[2]),
      };
    });
    person.move(moving).then(() => {
      playButton.disabled = false;
    });
  });

  generateLevel1(scene, boxArray, shadowGenerator);

  generationPixelFloor(scene, 10);

  new Floor(scene, { size: 20 });

  scene.registerBeforeRender(() => {
    for (let i = 0; i < boxArray.length; i++) {
      const currentBox = boxArray[i];
      if (person.robot.intersectsMesh(currentBox, true)) {
        if (currentBox.id === 'bridge') {
          alert('you won!');
        }
        if (currentBox.id !== 'river') {
          person.crashed = true;
          person.resetPosition();
        }
        console.log(i, boxArray[i]);
        // alert('врезался')
      }
    }
  });

  scene.shadowsEnabled = true;

  return scene;
};
