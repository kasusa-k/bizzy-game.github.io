import {PickingInfo} from "@babylonjs/core";
import {ObjectType} from "./ObjectType";

export default interface IEntity {
    type: ObjectType;

    isPicked(pickResult: PickingInfo): boolean;
    highlightEntity(toggle: boolean): void;
}
