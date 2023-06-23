import {
    AbstractMesh,
    ActionManager,
    ExecuteCodeAction,
    PhysicsImpostor,
    Scene,
    SceneLoader,
    Vector3
} from "@babylonjs/core";
import IEntity, {CollideAction} from "./IEntity";

type GearProps = {
    position: Vector3;
    scene: Scene;
    boxArray: AbstractMesh[]
}

const scale = 1

export default class Gear extends IEntity {
    scene: Scene
    mesh: AbstractMesh
    defaultPosition: Vector3

    constructor({position, scene, boxArray}: GearProps) {
        super("pickup");

        this.defaultPosition = new Vector3(position.x, position.y, position.z);
        this.scene = scene;
        this.mesh = new AbstractMesh(`gear`);

        SceneLoader.ImportMesh(null, '/models/', 'gear.glb', this.scene, (meshArray) => {
            this.mesh = meshArray[0]
            this.mesh.name = `gear_${position.x}_${position.y}_${position.z}`
            this.mesh.scaling = new Vector3(scale, scale, scale)
            this.mesh.rotation.z = Math.PI / 2.2
            this.mesh.position = position

            boxArray.push(this.mesh)
        });
    }

    onCollide() {
        super.onCollide();

        this.mesh.position.y = -4;
        console.log('picked gear');
    }

    reset() {
        this.mesh.position.y = this.defaultPosition.y;
        super.reset();
    }
}
