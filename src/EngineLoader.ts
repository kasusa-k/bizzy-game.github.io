import {
    AbstractMesh,
    ArcRotateCamera, CannonJSPlugin,
    Color3,
    Color4,
    Engine,
    PointLight,
    Scene,
    SceneLoader, ShadowGenerator,
    Vector3
} from "@babylonjs/core";
import {CameraOptions, EngineLoaderResult, LevelGenerator, ModelOptions} from "./utils/engineTypes";

export default function createEngine(
    canvas: HTMLCanvasElement,
    models: ModelOptions[],
    cameraOptions: CameraOptions,
    levelGenerator: LevelGenerator
): EngineLoaderResult {
    const engine = new Engine(canvas, true, {
        stencil: true,
    });
    engine.adaptToDeviceRatio = true;
    engine.renderEvenInBackground = true;

    const scene = createScene(engine, models, levelGenerator);
    spawnCamera(scene, cameraOptions);

    const resize = () => {
        scene.getEngine().resize();
    }

    window.addEventListener('resize', resize);

    return {
        engine,
        scene,
        dispose: () => {
            scene.getEngine().dispose();

            window.removeEventListener('resize', resize);
        }
    }
}

function createScene(
    engine: Engine,
    models: ModelOptions[] | any[],
    levelGenerator: LevelGenerator
) {
    console.log('createScene before loader');

    for (let [modelRootPath, modelFilename] of models) {
        SceneLoader.Load(modelRootPath, modelFilename, engine);
    }

    const scene = new Scene(engine);
    scene.useRightHandedSystem = true;
    scene.shadowsEnabled = true;
    scene.collisionsEnabled = true;
    scene.enablePhysics(null, new CannonJSPlugin());

    scene.createDefaultEnvironment({
        createSkybox: false,
        createGround: false,
        cameraContrast: 0.7,
        cameraExposure: 1,
    });
    scene.clearColor = new Color4(255, 255, 255, 255);

    const light = new PointLight(
        'light',
        new Vector3(Math.PI / 2, 10, -2),
        scene,
    );
    light.intensity = 0.7;
    light.diffuse = new Color3(1, 1, 1);

    const meshes: AbstractMesh[] = [];
    const shadowGenerator = new ShadowGenerator(1024, light);
    levelGenerator(scene, meshes, shadowGenerator);

    return scene;
}

function spawnCamera(scene: Scene, cameraOptions: CameraOptions) {
    const [x, y, z] = cameraOptions.xyz;
    const [alpha, beta, radius] = cameraOptions.abr;
    const [lBeta, uBeta] = cameraOptions.betaLimit;
    const [lAlpha, uAlpha] = cameraOptions.alphaLimit;

    const camera = new ArcRotateCamera(
        'camera1',
        alpha,
        beta,
        radius,
        new Vector3(x, y, z),
        scene,
    );

    camera.mapPanning = true;
    camera.noRotationConstraint = true;

    // lock position camera
    camera.lowerBetaLimit = lBeta;
    camera.upperBetaLimit = uBeta;
    camera.lowerAlphaLimit = lAlpha;
    camera.upperAlphaLimit = uAlpha;
}
