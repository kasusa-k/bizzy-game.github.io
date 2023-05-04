import {
    ArcRotateCamera,
    Color3,
    Engine,
    HemisphericLight,
    Scene,
    Vector3,
} from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import Person from "./Interactive/Person";
import Floor from "./Interactive/Floor";
import {Button} from "./controls/Button";
import {AdvancedDynamicTexture} from "@babylonjs/gui";
// import {Start} from "./remiders/start";
import {ChristmasTree, Tree} from "./Interactive/Tree";
import {River} from "./Interactive/River";

const moving = [
    {direction: 'forward', count: 8},
    // {direction: 'forward', count: 4},
    {direction: 'back', count: 3},
    {direction: 'left', count: 2},
    {direction: 'right', count: 2},
    {direction: 'forward', count: 4}
]

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
    switch (direction) {
        case 'forward':
            await person.moveForward(count)
            break
        case 'back':
            await person.moveBack(count)
            break
        case 'left':
            await person.moveLeft(count)
            break
        case 'right':
            await person.moveRight(count)
            break
    }
}

const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
        const scene = new Scene(engine);
        scene.enablePhysics()
        scene.createDefaultEnvironment({
            createSkybox: false,
            createGround: false,
            cameraContrast: 1,
            cameraExposure: .5
        })
        scene.useRightHandedSystem = true;


        const camera = new ArcRotateCamera(
            "camera1",
            -1.57,
            0.54,
            30,
            new Vector3(0, 0, 0),
            scene
        );

        // camera.setPosition(new Vector3(0, 10, -20));

        camera.mapPanning = true;
        camera.noRotationConstraint = true;

        const light = new HemisphericLight("light", new Vector3(0, 50, -20), scene);
        light.diffuse = new Color3(1, 1, 1);
        light.intensity = 0.7;


        const GUI = AdvancedDynamicTexture.CreateFullscreenUI("UI")

        const person = new Person({scene, position: new Vector3(0, -1, -8)});

        new Tree({scene, position: new Vector3(8, -1, 8)});
        new ChristmasTree({scene, position: new Vector3(6, -1, 8)});
        new ChristmasTree({scene, position: new Vector3(4, -1, 8)});
        new River({scene, position: new Vector3(.9, -1, 6)});
        // new Tree({scene, position: new Vector3(8, 0, 2)});
        // new ChristmasTree({scene, position: new Vector3(4, 0, 6)});
        // new ChristmasTree({scene, position: new Vector3(2, 0, 6)});
        // new ChristmasTree({scene, position: new Vector3(0, 0, 6)});


        const forwardButton = new Button({
            name: 'start', text: 'start', onClick: async () => {
                person.resetPosition()
                if (moving) {
                    for await (const item of moving) {
                        await doMove(person, item.direction, item.count)
                    }
                } else {
                    console.log('no moving')
                }
            }
        }).getComponent();

        GUI.addControl(forwardButton)


        // scene.onKeyboardObservable.add((kbInfo) => {
        //     switch (kbInfo.type) {
        //         case KeyboardEventTypes.KEYDOWN:
        //             switch (kbInfo.event.key) {
        //                 case "w":
        //                     person.moveForward(); // Двигаем куб вперед
        //                     break;
        //                 case "s":
        //                     person.moveBack(); // Двигаем куб назад
        //                     break;
        //                 case "a":
        //                     person.moveLeft(); // Двигаем куб вперед
        //                     break;
        //                 case "d":
        //                     person.moveRight(); // Двигаем куб назад
        //                     break;
        //             }
        //             break;
        //     }
        // });


        new Floor(scene, {size: 20});

        camera.attachControl(person, true);

        // new Start(AdvancedDynamicTexture.CreateFullscreenUI("UI"));

        return scene;
    }
;
