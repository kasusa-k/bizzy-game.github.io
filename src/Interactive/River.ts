import {
    AbstractMesh, Color3,
    CreateBox,
    Mesh,
    Scene,
    SceneLoader,
    ShadowGenerator,
    StandardMaterial,
    Vector3
} from "@babylonjs/core";

type RiverProps = {
    position: Vector3;
    scene: Scene;
    // shadowGenerator: ShadowGenerator
    boxArray: AbstractMesh[]
}

export class River {
    scene: Scene
    mesh: AbstractMesh;

    constructor({position, scene, boxArray}: RiverProps) {
        this.scene = scene
        this.mesh = CreateBox("river", {height: .5, width: 10, depth: 2}, this.scene)
        const material = new StandardMaterial("material", this.scene);
        material.diffuseColor = new Color3(0.179, 1, 1)
        this.mesh.material = material;
        this.mesh.scaling.x = 2
        this.mesh.position = position
        // this.mesh.setAbsolutePosition(new Vector3(0, -.5, 8))
        boxArray.push(this.mesh)
    }

}
