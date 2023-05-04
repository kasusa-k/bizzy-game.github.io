import {AbstractMesh, Scene, SceneLoader, Vector3} from "@babylonjs/core";

type TreeProps = {
    position: Vector3;
    scene: Scene;
}

const scale = 2

export class Tree {
    scene: Scene
    tree = new AbstractMesh("tree");
    constructor({position, scene}: TreeProps) {
        this.scene = scene
        SceneLoader.ImportMesh(null, '/models/', 'tree-2.glb', this.scene, (meshArray) => {
            this.tree = meshArray[0]
            this.tree.scaling = new Vector3(scale, scale, scale)
            this.tree.position = position
            this.tree.checkCollisions = true;
        })
    }

}

export class ChristmasTree {
    scene: Scene
    tree = new AbstractMesh("tree");
    constructor({position, scene}: TreeProps) {
        this.scene = scene
        SceneLoader.ImportMesh(null, '/models/', 'tree-1.glb', this.scene, (meshArray) => {
            this.tree = meshArray[0]
            this.tree.scaling = new Vector3(scale, scale, scale)
            this.tree.position = position
            this.tree.checkCollisions = true;
        })
    }

}
