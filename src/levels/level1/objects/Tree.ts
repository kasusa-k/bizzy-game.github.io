import {
    AbstractMesh,
    Mesh,
    Scene,
    SceneLoader,
    ShadowGenerator,
    Vector3,
} from '@babylonjs/core';
import IEntity from './IEntity';

type TreeProps = {
    position: Vector3;
    scene: Scene;
    boxArray: AbstractMesh[];
    shadowGenerator: ShadowGenerator;
};

const scale = 2;

export class Tree extends IEntity {
    scene: Scene;
    mesh: AbstractMesh;

    constructor({ position, scene, boxArray, shadowGenerator }: TreeProps) {
        super("crash");

        this.scene = scene;
        this.mesh = new AbstractMesh(
            `tree_${position.x}_${position.y}_${position.z}`,
        );
        this.mesh.position = position;
        SceneLoader.ImportMesh(
            null,
            '/models/',
            'tree-2.glb',
            this.scene,
            (meshArray) => {
                this.mesh = meshArray[0];
                this.mesh.name = `tree_${position.x}_${position.y}_${position.z}`;
                this.mesh.scaling = new Vector3(scale, scale, scale);
                this.mesh.position = position;
                boxArray.push(this.mesh);
                shadowGenerator.addShadowCaster(this.mesh, true);
                this.mesh.receiveShadows = true;
            },
        );
    }
}

export class ChristmasTree extends IEntity {
    scene: Scene;
    mesh: AbstractMesh;

    constructor({ position, scene, boxArray, shadowGenerator }: TreeProps) {
        super("crash", 1.5);

        this.scene = scene;
        this.mesh = new AbstractMesh(
            `christmas_tree_${position.x}_${position.y}_${position.z}`,
        );
        this.mesh.position = position;
        SceneLoader.ImportMesh(
            null,
            '/models/',
            'tree-1.glb',
            this.scene,
            (meshArray) => {
                this.mesh = meshArray[0];
                this.mesh.name = `christmas_tree_${position.x}_${position.y}_${position.z}`;
                this.mesh.scaling = new Vector3(scale, scale, scale);
                this.mesh.position = position;
                boxArray.push(this.mesh);
                shadowGenerator.addShadowCaster(this.mesh, true);
                this.mesh.receiveShadows = true;
            },
        );
    }
}
