import {ArcRotateCamera, Scene, Vector3} from "@babylonjs/core";

export const spawnCamera = (scene: Scene) => {
    const camera = new ArcRotateCamera(
        "camera1",
        -1.57,
        0.54,
        30,
        new Vector3(0, 0, 0),
        scene
    );

    camera.mapPanning = true;
    camera.noRotationConstraint = true;
    
    // lock position camera
    camera.upperBetaLimit = .54;
    camera.lowerBetaLimit = .54;
    camera.lowerAlphaLimit = 4.7;
    camera.upperAlphaLimit = 4.7;
}
