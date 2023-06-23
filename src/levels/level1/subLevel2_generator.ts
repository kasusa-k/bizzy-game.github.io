import {AbstractMesh, Scene, ShadowGenerator, Vector3} from "@babylonjs/core";
import IEntity from "./objects/IEntity";
import Person from "./objects/Person";
import Gear from "./objects/Gear";
import Stone from "./objects/Stone";

export const generateSubLevel2 = (
    scene: Scene,
    boxArray: AbstractMesh[],
    shadowGenerator: ShadowGenerator,
): [Person, IEntity[]] => {
    const person = new Person({
        scene,
        position: new Vector3(-4, -1, -8),
        shadowGenerator,
    });

    const entities: IEntity[] = [
        new Stone({
            scene,
            boxArray,
            position: new Vector3(2, -0.5, -2)
        }),
        new Gear({
            scene,
            boxArray,
            position: new Vector3(0, -0.5, -2)
        }),
        new Gear({
            scene,
            boxArray,
            position: new Vector3(4, -0.5, -4)
        })
    ];

    return [person, entities];
}
