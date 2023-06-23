import {
    AbstractMesh,
    Color3,
    CreateBox,
    Mesh,
    Scene,
    SceneLoader,
    ShadowGenerator,
    StandardMaterial,
    Vector3,
} from '@babylonjs/core';
import IEntity from './IEntity';

type RoadProps = {
    position: Vector3;
    scene: Scene;
    // shadowGenerator: ShadowGenerator
    boxArray: AbstractMesh[];
    callback?: () => void;
};

export default class Road extends IEntity {
    scene: Scene;
    mesh: AbstractMesh;

    constructor({ position, scene, boxArray, callback }: RoadProps) {
        super();

        this.scene = scene;
        this.mesh = new AbstractMesh(
            `road_${position.x}_${position.y}_${position.z}`,
        );
        SceneLoader.ImportMesh(
            null,
            '/models/',
            'road.glb',
            this.scene,
            (meshArray) => {
                this.mesh = meshArray[0];
                this.mesh.name = `road_${position.x}_${position.y}_${position.z}`;
                // this.mesh.scaling = new Vector3(scale, scale, scale)
                this.mesh.rotation.y = Math.PI / 2;
                this.mesh.position = position;
                callback?.();
                // boxArray.push(this.mesh)
                // this.mesh.receiveShadows = true;
            },
        );
    }
}
