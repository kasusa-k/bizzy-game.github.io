import {
    AbstractMesh,
    ArcRotateCamera,
    Color3,
    CreateBox,
    Engine,
    PointLight,
    Scene,
    ShadowGenerator,
    Texture,
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
import {NormalMaterial} from "@babylonjs/materials";
import {Stone} from "./Interactive/Stone";
import {Bridge} from "./Interactive/Bridge";
import {Road} from "./Interactive/Road";

let moving = [
    {direction: 'left', count: 2},
    {direction: 'forward', count: 4},
    {direction: 'forward', count: 3},
    {direction: 'back', count: 3},
    {direction: 'right', count: 2},
    {direction: 'forward', count: 4}
]

export class AppOne {
    engine: Engine;
    scene: Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        this.engine.adaptToDeviceRatio = true;
        this.engine.renderEvenInBackground = true;
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
    if (person.crashed) return
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
        // scene.enablePhysics()
        scene.createDefaultEnvironment({
            createSkybox: false,
            createGround: false,
            cameraContrast: .7,
            cameraExposure: 1
        })
        scene.useRightHandedSystem = true;

        const evenMaterial = new NormalMaterial(`Material_even`, scene)
        evenMaterial.diffuseTexture = new Texture("/models/darkGreen.png", scene);
        // evenMaterial.diffuseColor = new Color3(14.0, 124.0, 11.0)
        // evenMaterial.diffuseColor = new Color3(255, 0, 0)
        // evenMaterial.alpha = 1
        const oddMaterial = new NormalMaterial(`Material_odd`, scene)
        oddMaterial.diffuseTexture = new Texture("/models/lightGreen.png", scene);
        // oddMaterial.diffuseColor = new Color3(9.0, 153.0, 11.0)
        // oddMaterial.alpha = 5


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

        camera.upperBetaLimit = .54;
        camera.lowerBetaLimit = .54;
        camera.lowerAlphaLimit = 4.7;
        camera.upperAlphaLimit = 4.7;

        // const light1 = new HemisphericLight("light1", new Vector3(0, 50, -20), scene);
        // light1.diffuse = new Color3(1, 1, 1);
        // light1.intensity = 0.5;

        let light = new PointLight('light', new Vector3(Math.PI / 2, 10, -2), scene);
        light.intensity = .7;
        light.diffuse = new Color3(1, 1, 1)

        const GUI = AdvancedDynamicTexture.CreateFullscreenUI("UI")

        const shadowGenerator = new ShadowGenerator(1024, light);

        const person = new Person({scene, position: new Vector3(0, -1, -10), shadowGenerator});

        const boxArray: AbstractMesh[] = []

        new Tree({scene, position: new Vector3(8, -1, 6), boxArray, shadowGenerator});
        new Tree({scene, position: new Vector3(0, -1, 8), boxArray, shadowGenerator});
        new Tree({scene, position: new Vector3(8, -1, -2), boxArray, shadowGenerator});
        new Tree({scene, position: new Vector3(8, -1, -8), boxArray, shadowGenerator});

        new Tree({scene, position: new Vector3(-8, -1, 8), boxArray, shadowGenerator});
        new Stone({scene, position: new Vector3(-4, -1, 8), boxArray})
        new ChristmasTree({scene, position: new Vector3(-6, -1, 8), boxArray, shadowGenerator});
        new Tree({scene, position: new Vector3(-4, -1, 8), boxArray, shadowGenerator});

        new Tree({scene, position: new Vector3(-2, -1, 0), boxArray, shadowGenerator});

        new Stone({scene, position: new Vector3(8, -1, -10), boxArray})
        new Stone({scene, position: new Vector3(8, -1, 2), boxArray})

        new Stone({scene, position: new Vector3(-10, -1, 2), boxArray})
        new ChristmasTree({scene, position: new Vector3(-10, -1, 0), boxArray, shadowGenerator});
        new Tree({scene, position: new Vector3(-10, -1, -2), boxArray, shadowGenerator});
        new ChristmasTree({scene, position: new Vector3(-10, -1, -4), boxArray, shadowGenerator});
        new Tree({scene, position: new Vector3(-10, -1, -6), boxArray, shadowGenerator});
        new ChristmasTree({scene, position: new Vector3(-10, -1, -8), boxArray, shadowGenerator});
        new Stone({scene, position: new Vector3(-10, -1, -10), boxArray})

        new ChristmasTree({scene, position: new Vector3(6, -1, 8), boxArray, shadowGenerator});
        new ChristmasTree({scene, position: new Vector3(6, -1, 0), boxArray, shadowGenerator});
        new ChristmasTree({scene, position: new Vector3(6, -1, -6), boxArray, shadowGenerator});
        new ChristmasTree({scene, position: new Vector3(-10, -1, 6), boxArray, shadowGenerator});
        new Stone({scene, position: new Vector3(6, -1, -4), boxArray})
        new Stone({scene, position: new Vector3(6, -1, -2), boxArray})

        new Bridge({scene, position: new Vector3(4, -.5, 4), boxArray})

        new River({scene, position: new Vector3(-1, -1, 4), boxArray});

        new Road({scene, position: new Vector3(4, -.5, 2), boxArray});
        new Road({scene, position: new Vector3(4, -.5, 6), boxArray});
        new Road({scene, position: new Vector3(4, -.5, 0), boxArray});


        const forwardButton = new Button({
            name: 'start', text: 'start', onClick: async () => {
                person.resetPosition()
                person.crashed = false
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

        const blockWidth = 2;
        const blockHeight = 2;

        const rowCount = 10;
        const columnCount = 10;

        const startX = -((rowCount / 2) * blockWidth);
        const startZ = -((columnCount / 2) * blockHeight);

        for (let row = 0; row < rowCount; row++) {
            for (let column = 0; column < columnCount; column++) {
                const x = startX + (column * blockWidth);
                const z = startZ + (row * blockHeight);
                const isEven = (row + column) % 2 === 0;

                const block = CreateBox(
                    `Block_${row}_${column}`,
                    {width: blockWidth, height: .2, depth: blockHeight},
                    scene
                );

                block.position.x = x;
                block.position.y = -1;
                block.position.z = z;

                block.material = isEven ? evenMaterial : oddMaterial;
            }
        }

        new Floor(scene, {size: 20});

        camera.attachControl(person, true);
        scene.registerBeforeRender(() => {
            for (let i = 0; i < boxArray.length; i++) {
                const currentBox = boxArray[i]
                // console.log(currentBox.name)
                // if (currentBox.id === 'bridge') {
                //     console.log(currentBox)
                // }
                if (person.robot.intersectsMesh(currentBox, true)) {
                    if (currentBox.id === 'bridge') {
                        alert('you won!')
                    }
                    console.log(i, boxArray[i])
                    // alert('врезался')
                    person.crashed = true
                    person.resetPosition()
                }
            }
        })

        console.log(shadowGenerator.getShadowMap()?.renderList)

        // shadowGenerator.u = true;
        // shadowGenerator.bias = 0;
        // shadowGenerator.normalBias = 0.05;
        // shadowGenerator.blurScale = 2;

        scene.shadowsEnabled = true;

        // new Start(AdvancedDynamicTexture.CreateFullscreenUI("UI"));

        return scene;
    }
;
