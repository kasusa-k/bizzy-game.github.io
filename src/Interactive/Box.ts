import {Color3, Mesh, MeshBuilder, PhysicsImpostor, Scene, StandardMaterial, Vector3} from "@babylonjs/core";

class Box {
    box: Mesh;


    constructor({scene, position}: { scene: Scene, position: Vector3; }) {
        this.box = MeshBuilder.CreateBox("box1", {width: 2, height: 2, depth: 2, bottomBaseAt: 0}, scene);

        this.box.position = position
        // this.box.position.y = 1;

        const boxColor = new StandardMaterial("box", scene);

        boxColor.diffuseColor = new Color3(0, 1, 0);

        this.box.material = boxColor;

        this.box.checkCollisions = true;

        // this.box.collisionResponse = true

        this.box.physicsImpostor = new PhysicsImpostor(
            this.box,
            PhysicsImpostor.BoxImpostor,
            { mass: 1000, friction: 1., restitution: 0 }
        );

    }
}

export default Box;
