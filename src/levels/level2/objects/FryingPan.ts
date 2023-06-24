import IEntity from "./IEntity";
import {
    AbstractMesh,
    Color3,
    HighlightLayer,
    Mesh,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Vector3
} from "@babylonjs/core";

export default class FryingPan implements IEntity {
    public mesh?: AbstractMesh;

    constructor(
        private readonly position: Vector3,
        scene: Scene,
        boxArray: AbstractMesh[],
        shadowGenerator: ShadowGenerator,
        highlightLayer: HighlightLayer
    ) {
        SceneLoader.ImportMesh(
            null,
            '/models/',
            'fryingPan.glb',
            scene,
            (meshArray) => {
                this.mesh = meshArray[0];
                this.mesh.name = 'fryingPan';
                this.mesh.scaling = new Vector3(1, 1, 1);
                this.mesh.position = position;
                shadowGenerator.addShadowCaster(this.mesh, true);
                this.mesh.receiveShadows = true;
                boxArray.push(this.mesh);

                highlightLayer.addMesh(meshArray[1] as Mesh, Color3.Green(), true);
            },
        );
    }
}
