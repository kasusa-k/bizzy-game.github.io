import {
  Color3,
  GroundMesh,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  StandardMaterial,
  Texture,
} from '@babylonjs/core';

class Floor {
  ground: GroundMesh;

  constructor(scene: Scene, { size = 6 } = {}) {
    this.ground = MeshBuilder.CreateGround(
      'ground',
      { width: size, height: size },
      scene,
    );

    // this.ground.getNormalAtCoordinates(-2, )

    this.ground.position.y = -1;
    this.ground.position.x = -1;
    this.ground.position.z = -1;

    const floorMat = new StandardMaterial('floorMat', scene);
    floorMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
    // floorMat.diffuseTexture = new Texture("/models/floor.jpg", scene);
    // console.log(floorMat.diffuseTexture.canRescale)
    // floorMat.diffuseTexture.scale(1)

    this.ground.material = floorMat;

    // this.ground.physicsImpostor = new PhysicsImpostor(
    //     this.ground,
    //     PhysicsImpostor.BoxImpostor,
    //     {mass: 0, restitution: 0}
    // );
  }
}

export default Floor;
