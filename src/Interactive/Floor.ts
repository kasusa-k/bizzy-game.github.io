import {GroundMesh, MeshBuilder, PhysicsImpostor, Scene} from "@babylonjs/core";

class Floor {
    ground: GroundMesh;

    constructor(scene: Scene, {size = 6} = {}) {
        this.ground = MeshBuilder.CreateGround(
            "ground",
            {width: size, height: size, subdivisionsX: 20},
            scene
        );

        this.ground.position.y = -1;

        this.ground.physicsImpostor = new PhysicsImpostor(
            this.ground,
            PhysicsImpostor.BoxImpostor,
            {mass: 0, restitution: 0}
        );
    }
}

export default Floor;
