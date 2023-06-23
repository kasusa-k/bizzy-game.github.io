import {
  AbstractMesh,
  Scene,
  SceneLoader,
  Vector3,
  Animation,
  Animatable,
  ShadowGenerator, PhysicsImpostor,
} from '@babylonjs/core';

type PersonProps = {
  position: Vector3;
  scene: Scene;
  shadowGenerator: ShadowGenerator;
};

const boxSize = 2;

const animation = new Animation(
  'myAnimation',
  'rotation.y',
  30,
  Animation.ANIMATIONTYPE_FLOAT,
  Animation.ANIMATIONLOOPMODE_CYCLE,
);

const animationMove = new Animation(
  'animationMove',
  'position',
  30,
  Animation.ANIMATIONTYPE_VECTOR3,
  Animation.ANIMATIONLOOPMODE_CYCLE,
);

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

class Person {
  robot: AbstractMesh;
  scene: Scene;
  defaultPosition: Vector3;
  crashed = false;
  animation?: Animatable;

  constructor({ position, scene, shadowGenerator }: PersonProps) {
    this.robot = new AbstractMesh('person');
    this.robot.position = new Vector3(-100, -100, -100);

    this.scene = scene;

    this.defaultPosition = position;

    SceneLoader.ImportMesh(
      null,
      '/models/',
      'robot.glb',
      this.scene,
      (meshArray) => {
        this.robot = meshArray[0];
        this.robot.name = `robot`;
        this.robot.scaling = new Vector3(0.3, 0.3, 0.3);
        this.robot.rotation.y = -Math.PI / 2;
        this.robot.position = position;
        this.robot.checkCollisions = true;
        this.robot.receiveShadows = true;

        shadowGenerator.addShadowCaster(this.robot, true);
      },
    );
  }

  resetPosition() {
    if (this.animation) {
      this.animation.pause();
    }
    this.robot.position.set(
      this.defaultPosition.x,
      this.defaultPosition.y,
      this.defaultPosition.z,
    );
  }

  async moveForward(count = 1) {
    return this.moveWithAnimation(
      new Vector3(0, 0, boxSize * count),
      -Math.PI / 2,
    );
  }

  async moveBack(count = 1) {
    return this.moveWithAnimation(
      new Vector3(0, 0, -boxSize * count),
      Math.PI / 2,
    );
  }

  computeSpeed(distance: number) {
    const speed = distance / 30;
    return Math.max(2, Math.min(4, speed));
  }

  async moveWithAnimation(
    newMovePosition: Vector3,
    newRotatePosition: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      this.robot.animations = [];
      animation.setKeys([
        {
          frame: 0,
          value: this.robot.rotation.y,
        },
        {
          frame: 10,
          value: newRotatePosition,
        },
      ]);
      this.robot.animations.push(animation);

      animationMove.setKeys([
        { frame: 0, value: this.robot.position },
        {
          frame: 30,
          value: this.robot.position.add(newMovePosition),
        },
      ]);

      this.robot.animations.push(animationMove);

      const distanceBetweenPositions = this.robot.position
        .subtract(this.robot.position.add(newMovePosition))
        .length();

      const normalizeSpeedBetweenPositions = this.computeSpeed(
        distanceBetweenPositions,
      );

      this.animation = this.scene.beginAnimation(
        this.robot,
        0,
        30,
        false,
        normalizeSpeedBetweenPositions,
        async () => {
          await delay(300);
          resolve();
        },
      );
    });
  }

  async moveLeft(count = 1) {
    return this.moveWithAnimation(new Vector3(boxSize * count, 0, 0), 0);
  }

  async moveRight(count = 1) {
    return this.moveWithAnimation(
      new Vector3(-boxSize * count, 0, 0),
      -Math.PI,
    );
  }

  async move(moving: { direction: string; count: number }[]) {
    this.resetPosition();
    if (this.crashed) return;
    for await (const item of moving) {
      const { direction, count } = item;
      switch (direction) {
        case 'forward':
          await this.moveForward(count);
          break;
        case 'back':
          await this.moveBack(count);
          break;
        case 'left':
          await this.moveLeft(count);
          break;
        case 'right':
          await this.moveRight(count);
          break;
      }
    }
  }
}

export default Person;
