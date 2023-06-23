import IEntity, {CollideAction} from "./IEntity";
import {AbstractMesh, Scene, SceneLoader, Vector3} from "@babylonjs/core";

type BridgeProps = {
    position: Vector3;
    scene: Scene;
    boxArray: AbstractMesh[]
}

const scale = 2;

export default class Bridge extends IEntity {
    scene: Scene
    mesh: AbstractMesh

    constructor({position, scene, boxArray}: BridgeProps) {
        super('finish');

        this.scene = scene
        this.mesh = new AbstractMesh(`bridge_${position.x}_${position.y}_${position.z}`);

        SceneLoader.ImportMesh(null, '/models/', 'bridge.glb', this.scene, (meshArray) => {
            this.mesh = meshArray[0];
            this.mesh.name = `bridge_${position.x}_${position.y}_${position.z}`;
            this.mesh.scaling = new Vector3(scale, scale, scale);
            this.mesh.rotation.y = Math.PI / 2;
            this.mesh.position = position;
            boxArray.push(this.mesh);
        });
    }
}
