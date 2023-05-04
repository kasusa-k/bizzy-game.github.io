import {
    ArcRotateCamera,
    Color3,
    Engine,
    HemisphericLight, KeyboardEventTypes,
    MeshBuilder,
    Scene, SceneLoader,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import Person from "./Interactive/Person";
import Floor from "./Interactive/Floor";
import Box from "./Interactive/Box";
import {Button} from "./controls/Button";
import {AdvancedDynamicTexture} from "@babylonjs/gui";
import {Start} from "./remiders/start";

// import Canon from 'cannon'

// const moving = [
//     {direction: 'forward', count: 1},
//     {direction: 'back', count: 2},
//     {direction: 'forward', count: 2},
//     {direction: 'left', count: 2},
//     {direction: 'right', count: 2},
//     {direction: 'forward', count: 4}
// ]

const moving = [
    {direction: 'forward', count: 1},
    {direction: 'forward', count: 4},
    {direction: 'back', count: 3},
    {direction: 'left', count: 2},
    {direction: 'right', count: 2},
    {direction: 'forward', count: 4}
]

const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

let meshPlayer;

export class AppOne {
    engine: Engine;
    scene: Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        this.engine.adaptToDeviceRatio = true;
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.scene = createScene(this.engine, this.canvas);
    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({overlay: true});
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

const doMove = async (person: Person, direction: string, count: number) => {
    console.log('doMove', direction, count)
    try {
        for (let i = 0; i < count; i++) {
            switch (direction) {
                case 'forward':
                    person.moveForward()
                    break
                case 'back':
                    person.moveBack()
                    break
                case 'left':
                    person.moveLeft()
                    break
                case 'right':
                    person.moveRight()
                    break
            }
            await delay(1000)
            return Promise.resolve()
        }
    } catch (e) {
        console.log(e)
    }
}

const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
        const scene = new Scene(engine);
        scene.enablePhysics()
        scene.createDefaultEnvironment({
            createSkybox: false,
            createGround: false,
            cameraContrast: 2.5,
            cameraExposure: 1
        })
        scene.useRightHandedSystem = true;


        const camera = new ArcRotateCamera(
            "camera1",
            0,
            0,
            10,
            new Vector3(0, 0, 0),
            scene
        );

        camera.setPosition(new Vector3(0, 10, -20));

        camera.mapPanning = false;
        camera.noRotationConstraint = false;

        const light = new HemisphericLight("light", new Vector3(0, 50, -20), scene);
        light.diffuse = new Color3(1, 1, 1);
        light.intensity = 0.7;


        new Box({scene, position: new Vector3(0, 0, 6)});

        const GUI = AdvancedDynamicTexture.CreateFullscreenUI("UI")

        const person = new Person({scene, position: new Vector3(0, 0, 0)});


        const forwardButton = new Button({
            name: 'start', text: 'start', onClick: async () => {
                person.resetPosition()
                if (moving) {
                    for (let i = 0; i < moving.length; i++) {
                        await doMove(person, moving[i].direction, moving[i].count)
                    }
                } else {
                    console.log('no moving')
                }
            }
        }).getComponent();

        GUI.addControl(forwardButton)


        // scene.onPointerUp = (event, pickInfo, type) => {
        //     console.log(pickInfo)
        //     if (pickInfo?.pickedMesh?.id === "person") {
        //         person.moveForward()
        //         //   Animation.CreateMergeAndStartAnimation()
        //         //   Animation.CreateAndStartAnimation(
        //         //     "moveZ",
        //         //     person,
        //         //     "position.z",
        //         //     120,
        //         //     10,
        //         //     person.position.z,
        //         //     person.position.z + 1,
        //         //     Animation.ANIMATIONLOOPMODE_CONSTANT,
        //         //     undefined,
        //         //     () => {
        //         //       console.log("end");
        //         //     }
        //         //   );
        //     }
        // };


        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case "w":
                            person.moveForward(); // Двигаем куб вперед
                            break;
                        case "s":
                            person.moveBack(); // Двигаем куб назад
                            break;
                        case "a":
                            person.moveLeft(); // Двигаем куб вперед
                            break;
                        case "d":
                            person.moveRight(); // Двигаем куб назад
                            break;
                    }
                    break;
            }
        });


        new Floor(scene, {size: 20});

        camera.attachControl(person, true);

        // new Start(AdvancedDynamicTexture.CreateFullscreenUI("UI"));

        return scene;
    }
;
