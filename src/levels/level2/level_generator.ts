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
import Fridge from "./objects/Fridge";
import FryingPan from "./objects/FryingPan";
import DishSink from "./objects/DishSink";
import Kettle from "./objects/Kettle";
import IEntity from "./objects/IEntity";

export const generateLevel2 = (
    scene: Scene,
    boxArray: AbstractMesh[],
    shadowGenerator: ShadowGenerator
): IEntity[] => {
    const entitiesHighlighter = new HighlightLayer('hlEntities', scene, {
        blurVerticalSize: 0.3,
        blurHorizontalSize: 0.3,
    });

    let kitchenMesh: AbstractMesh;
    SceneLoader.ImportMesh(
        null,
        '/models/',
        'kitchenRoom.glb',
        scene,
        (meshArray) => {
            kitchenMesh = meshArray[0];
            kitchenMesh.name = 'kitchenRoom';
            kitchenMesh.scaling = new Vector3(1, 1, 1);
            kitchenMesh.position = new Vector3(0, 0, 0);
            shadowGenerator.addShadowCaster(kitchenMesh, true);
            kitchenMesh.receiveShadows = true;
            boxArray.push(kitchenMesh);
        },
    );

    const fridge = new Fridge(new Vector3(0, 0, 0), scene, boxArray, shadowGenerator, entitiesHighlighter);
    const fryingPan = new FryingPan(new Vector3(10.8, 2.05, 1.9), scene, boxArray, shadowGenerator, entitiesHighlighter);
    const dishSink = new DishSink(new Vector3(9.2, 0, 3.65), scene, boxArray, shadowGenerator, entitiesHighlighter);
    const kettle = new Kettle(new Vector3(6, -1.73, -5), scene, boxArray, shadowGenerator, entitiesHighlighter);

    return [fridge, dishSink, fryingPan, kettle];
}
