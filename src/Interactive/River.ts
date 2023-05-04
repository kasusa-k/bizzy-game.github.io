import {AbstractMesh, Scene, SceneLoader, Vector3} from "@babylonjs/core";

type RiverProps = {
    position: Vector3;
    scene: Scene;
}

export class River {
    scene: Scene
    tree = new AbstractMesh("tree");

    constructor({position, scene}: RiverProps) {
        this.scene = scene
        SceneLoader.ImportMesh(null, '/models/', 'river.glb', this.scene, (meshArray) => {
            this.tree = meshArray[0]
            this.tree.scaling = new Vector3(2, 1, 2.2)
            this.tree.position = position
            this.tree.rotation.set(0, Math.PI / 2, 0)
            this.tree.checkCollisions = true;
        })
    }

}
