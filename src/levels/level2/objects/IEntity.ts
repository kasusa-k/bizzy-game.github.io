import {PickingInfo} from "@babylonjs/core";

export default interface IEntity {
    isPicked(pickResult: PickingInfo): boolean;
    highlightEntity(toggle: boolean): void;
}
