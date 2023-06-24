import {
    AbstractMesh, Color3,
    CreateBox,
    MeshBuilder,
    Scene,
    ShadowGenerator,
    StandardMaterial,
    Texture,
    Vector3
} from "@babylonjs/core";
import {NormalMaterial} from "@babylonjs/materials";
import {ChristmasTree, Tree} from "../objects/Tree";
import Stone from "../objects/Stone";
import Bridge from "../objects/Bridge";
import River from "../objects/River";
import Road from "../objects/Road";
import IEntity from "../objects/IEntity";

export const generateGeneralLevel = (
    scene: Scene,
    boxArray: AbstractMesh[],
    shadowGenerator: ShadowGenerator
): IEntity[] => {
    generatePixelFloor(scene, 10);

    const entities: IEntity[] = [
        new Tree({
            scene,
            position: new Vector3(8, -1, 6),
            boxArray,
            shadowGenerator,
        }),
        new Tree({
            scene,
            position: new Vector3(0, -1, 8),
            boxArray,
            shadowGenerator,
        }),
        new Tree({
            scene,
            position: new Vector3(8, -1, -2),
            boxArray,
            shadowGenerator,
        }),
        new Tree({
            scene,
            position: new Vector3(8, -1, -8),
            boxArray,
            shadowGenerator,
        }),

        new Tree({
            scene,
            position: new Vector3(-8, -1, 8),
            boxArray,
            shadowGenerator,
        }),
        new Stone({ scene, position: new Vector3(-4, -1, 8), boxArray }),
        new ChristmasTree({
            scene,
            position: new Vector3(-6, -1, 8),
            boxArray,
            shadowGenerator,
        }),
        new Tree({
            scene,
            position: new Vector3(-4, -1, 8),
            boxArray,
            shadowGenerator,
        }),

        new Tree({
            scene,
            position: new Vector3(-2, -1, 0),
            boxArray,
            shadowGenerator,
        }),

        new Stone({ scene, position: new Vector3(8, -1, -10), boxArray }),
        new Stone({ scene, position: new Vector3(8, -1, 2), boxArray }),

        new Stone({ scene, position: new Vector3(-10, -1, 2), boxArray }),
        new ChristmasTree({
            scene,
            position: new Vector3(-10, -1, 0),
            boxArray,
            shadowGenerator,
        }),
        new Tree({
            scene,
            position: new Vector3(-10, -1, -2),
            boxArray,
            shadowGenerator,
        }),
        new ChristmasTree({
            scene,
            position: new Vector3(-10, -1, -4),
            boxArray,
            shadowGenerator,
        }),
        new Tree({
            scene,
            position: new Vector3(-10, -1, -6),
            boxArray,
            shadowGenerator,
        }),
        new ChristmasTree({
            scene,
            position: new Vector3(-10, -1, -8),
            boxArray,
            shadowGenerator,
        }),
        new Stone({ scene, position: new Vector3(-10, -1, -10), boxArray }),

        new ChristmasTree({
            scene,
            position: new Vector3(6, -1, 8),
            boxArray,
            shadowGenerator,
        }),
        new ChristmasTree({
            scene,
            position: new Vector3(6, -1, 0),
            boxArray,
            shadowGenerator,
        }),
        new ChristmasTree({
            scene,
            position: new Vector3(6, -1, -6),
            boxArray,
            shadowGenerator,
        }),
        new ChristmasTree({
            scene,
            position: new Vector3(-10, -1, 6),
            boxArray,
            shadowGenerator,
        }),
        new Stone({ scene, position: new Vector3(6, -1, -4), boxArray }),
        new Stone({ scene, position: new Vector3(6, -1, -2), boxArray }),

        new Bridge({ scene, position: new Vector3(4, -0.5, 4), boxArray }),

        new River({ scene, position: new Vector3(-1, -1, 4), boxArray }),

        new Road({ scene, position: new Vector3(4, -0.5, 2), boxArray }),
        new Road({ scene, position: new Vector3(4, -0.5, 6), boxArray }),
        new Road({ scene, position: new Vector3(4, -0.5, 0), boxArray }),
    ]

    return entities;
}

function generatePixelFloor(scene: Scene, size: number) {
    const evenMaterial = new NormalMaterial(`Material_even`, scene)
    evenMaterial.diffuseTexture = new Texture("/models/darkGreen.png", scene);
    const oddMaterial = new NormalMaterial(`Material_odd`, scene)
    oddMaterial.diffuseTexture = new Texture("/models/lightGreen.png", scene);

    const blockWidth = 2;
    const blockHeight = 2;

    const rowCount = size;
    const columnCount = size;

    const startX = -((rowCount / 2) * blockWidth);
    const startZ = -((columnCount / 2) * blockHeight);

    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            const x = startX + (column * blockWidth);
            const z = startZ + (row * blockHeight);
            const isEven = (row + column) % 2 === 0;

            const block = CreateBox(
                `Block_${row}_${column}`,
                {width: blockWidth, height: .4, depth: blockHeight},
                scene
            );

            block.position.x = x;
            block.position.y = -1;
            block.position.z = z;

            block.material = isEven ? evenMaterial : oddMaterial;
        }
    }
}
