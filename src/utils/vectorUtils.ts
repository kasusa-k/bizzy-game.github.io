import {Vector3} from "@babylonjs/core";

export function getDistanceBetweenPoints2D(a: Vector3, b: Vector3) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2))
}
