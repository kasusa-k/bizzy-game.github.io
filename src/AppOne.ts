import {
  AbstractMesh,
  Color3,
  Color4,
  Engine,
  PointLight,
  Scene,
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

const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
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

  // const forwardButton = new Button({
  //     name: 'start', text: 'start', onClick: async () => {
  //         person.resetPosition()
  //         person.crashed = false
  //         if (moving) {
  //             for await (const item of moving) {
  //                 await doMove(person, item.direction, item.count)
  //             }
  //         } else {
  //             console.log('no moving')
  //         }
  //     }
  // }).getComponent();
  //
  // GUI.addControl(forwardButton)

  // scene.onKeyboardObservable.add((kbInfo) => {
  //     switch (kbInfo.type) {
  //         case KeyboardEventTypes.KEYDOWN:
  //             switch (kbInfo.event.key) {
  //                 case "w":
  //                     person.moveForward(); // Двигаем куб вперед
  //                     break;
  //                 case "s":
  //                     person.moveBack(); // Двигаем куб назад
  //                     break;
  //                 case "a":
  //                     person.moveLeft(); // Двигаем куб вперед
  //                     break;
  //                 case "d":
  //                     person.moveRight(); // Двигаем куб назад
  //                     break;
  //             }
  //             break;
  //     }
  // });

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
        console.log(i, boxArray[i]);
        // alert('врезался')
        person.crashed = true;
        person.resetPosition();
      }
    }
  });

  scene.shadowsEnabled = true;

  return scene;
};
