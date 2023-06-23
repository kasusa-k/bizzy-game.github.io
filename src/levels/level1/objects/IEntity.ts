import {AbstractMesh, Vector3} from "@babylonjs/core";
import {getDistanceBetweenPoints2D} from "../../../utils/vectorUtils";

export type CollideAction = 'pickup' | 'crash' | 'finish';

export default abstract class Entity {
    private readonly distanceToCollide: number
    public readonly collideAction?: CollideAction
    public abstract mesh: AbstractMesh
    public isCollided: boolean

    protected constructor(collideAction?: CollideAction, distanceToCollide = 1) {
        this.collideAction = collideAction;
        this.distanceToCollide = distanceToCollide;
        this.isCollided = false;
    }

    isCollideWith(collideMesh: AbstractMesh): boolean {
        if (this.isCollided)
            return false;

        return getDistanceBetweenPoints2D(this.mesh.position, collideMesh.position) < this.distanceToCollide;
    }

    reset(): void {
        this.isCollided = false;
    }

    onCollide(): void {
        this.isCollided = true;
    }
}
