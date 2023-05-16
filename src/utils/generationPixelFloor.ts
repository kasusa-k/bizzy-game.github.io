import {CreateBox, Scene, Texture} from "@babylonjs/core";
import {NormalMaterial} from "@babylonjs/materials";

export const generationPixelFloor = (scene: Scene, size: number) => {
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
                {width: blockWidth, height: .2, depth: blockHeight},
                scene
            );

            block.position.x = x;
            block.position.y = -1;
            block.position.z = z;

            block.material = isEven ? evenMaterial : oddMaterial;
        }
    }
}
