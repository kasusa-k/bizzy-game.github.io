import {AbstractMesh, Engine, Scene, ShadowGenerator} from "@babylonjs/core";

export interface EngineLoaderResult {
    engine: Engine,
    scene: Scene,
    dispose: () => void
}

export type ModelOptions = [string, string];

export type LevelGenerator = (scene: Scene, boxArray: AbstractMesh[], shadowGenerator: ShadowGenerator) => void;

export interface CameraOptions {
    xyz: [number, number, number],
    abr: [number, number, number],
    betaLimit: [number, number],
    alphaLimit: [number, number]
}
