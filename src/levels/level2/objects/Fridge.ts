import IEntity from "./IEntity";
import {
    AbstractMesh,
    Color3,
    HighlightLayer,
    Mesh, PickingInfo,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Vector3
} from "@babylonjs/core";
import {ObjectType} from "./ObjectType";

export default class Fridge implements IEntity {
    public type = ObjectType.Fridge;
    public mesh?: AbstractMesh;
    private meshArray: AbstractMesh[] = [];

    constructor(
        private readonly position: Vector3,
        scene: Scene,
        boxArray: AbstractMesh[],
        shadowGenerator: ShadowGenerator,
        private readonly highlightLayer: HighlightLayer
    ) {
        SceneLoader.ImportMesh(
            null,
            '/models/',
            'fridge.glb',
            scene,
            (meshArray) => {
                this.mesh = meshArray[0];
                this.meshArray = meshArray;
                this.mesh.name = 'fridge';
                this.mesh.scaling = new Vector3(1, 1, 1);
                this.mesh.position = new Vector3(0, 0, 0);
                shadowGenerator.addShadowCaster(this.mesh, true);
                this.mesh.receiveShadows = true;
                boxArray.push(this.mesh);

                highlightLayer.addMesh(meshArray[1] as Mesh, Color3.White(), false);
            },
        );
    }

    highlightEntity(toggle: boolean): void {
        this.highlightLayer.removeMesh(this.meshArray[1] as Mesh);
        this.highlightLayer.addMesh(this.meshArray[1] as Mesh, toggle ? Color3.Green() : Color3.White(), false);
    }

    isPicked(pickResult: PickingInfo): boolean {
        return pickResult.pickedMesh?.name.startsWith('Fridge') ?? false;
    }
}
