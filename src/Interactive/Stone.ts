import { AbstractMesh, Scene, SceneLoader, Vector3 } from '@babylonjs/core';

type TreeProps = {
  position: Vector3;
  scene: Scene;
  boxArray: AbstractMesh[];
};

const scale = 2;

export class Stone {
  scene: Scene;
  mesh: AbstractMesh;

  constructor({ position, scene, boxArray }: TreeProps) {
    this.scene = scene;
    this.mesh = new AbstractMesh(
      `stone_${position.x}_${position.y}_${position.z}`,
    );
    SceneLoader.ImportMesh(
      null,
      '/models/',
      'stone.glb',
      this.scene,
      (meshArray) => {
        this.mesh = meshArray[0];
        this.mesh.name = `stone_${position.x}_${position.y}_${position.z}`;
        this.mesh.scaling = new Vector3(scale, scale, scale);
        this.mesh.position = position;
        boxArray.push(this.mesh);
        this.mesh.receiveShadows = true;
      },
    );
  }
}
