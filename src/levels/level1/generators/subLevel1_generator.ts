import {AbstractMesh, Scene, ShadowGenerator, Vector3} from "@babylonjs/core";
import Person from "../objects/Person";
import Gear from "../objects/Gear";
import IEntity from "../objects/IEntity";

export const generateSubLevel1 = (
    scene: Scene,
    boxArray: AbstractMesh[],
    shadowGenerator: ShadowGenerator,
): [Person, IEntity[]] => {
    const person = new Person({
        scene,
        position: new Vector3(0, -1, -10),
        shadowGenerator,
    });

    const entities: IEntity[] = [
        new Gear({
            scene,
            boxArray,
            position: new Vector3(2, 0, -6)
        })
    ];

    return [person, entities];
}
