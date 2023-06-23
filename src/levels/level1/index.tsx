import React, {ReactElement, useEffect, useRef, useState} from "react";
import './styles.sass';
import SceneComponent from "../../SceneComponent";
import {generateGeneralLevel} from "./generalLevel_generator";
import {AbstractMesh, Scene, ShadowGenerator, Vector3} from "@babylonjs/core";
import Controls, {PersonControl} from "./components/controls";
import Person from "./objects/Person";
import IEntity from "./objects/IEntity";
import Overlay from "../../components/overlay";
import BizzyDialog from "../../components/bizzyDialog";

function getIsMeshOutsideOfMap(mesh: AbstractMesh, [xMax, xMin]: [number, number], [zMax, zMin]: [number, number]) {
    return mesh.position.x > xMax || mesh.position.x < xMin
        || mesh.position.z > zMax || mesh.position.z < zMin;
}

interface Level1Props {
    onFinish?: () => void
    requiredGears: number
    maxControls: number
    sublevelGenerator: (scene: Scene,
                        boxArray: AbstractMesh[],
                        shadowGenerator: ShadowGenerator,
    ) => [Person, IEntity[]]
}

export default function Level1({ onFinish, requiredGears, sublevelGenerator, maxControls }: Level1Props) {
    const taskOverlay: { hide?: () => void } = {};
    const oopsOverlay: { hide?: () => void, show?: () => void } = {};
    const notCompletedOverlay: { hide?: () => void, show?: () => void } = {};

    let person: Person;
    let entities: IEntity[];
    let controls: PersonControl[] = [];
    let isRobotOutside: boolean = false;
    let pickedGears = 0;
    let finished = false;

    const onClickGotTask = () => {
        taskOverlay.hide?.();
    }

    const reset = () => {
        finished = false;
        pickedGears = 0;
        person.resetPosition();

        for (let entity of entities)
            entity.reset();

        isRobotOutside = false;
    }

    const onClickExecute = () => {
        console.log('execute', controls);

        person.move(controls.map(control => ({ direction: control.direction, count: control.count })))
            .then(() => {
                if (!finished)
                    callNotCompleted();
            });
    }

    const callOops = () => {
        reset();
        oopsOverlay.show?.();
    }

    const callNotCompleted = () => {
        reset();
        notCompletedOverlay.show?.();
    }

    const onClickAgain = () => {
        oopsOverlay.hide?.();
        notCompletedOverlay.hide?.();
    }

    const onRender = () => {
        if (!person || !entities.length) {
            return;
        }

        if (!isRobotOutside && getIsMeshOutsideOfMap(person.robot, [9, -11], [9, -11])) {
            isRobotOutside = true;
            callOops();
        }

        for (let entity of entities) {
            if (entity.collideAction == null)
                continue;

            if (entity.isCollideWith(person.robot)) {
                entity.onCollide();

                if (entity.collideAction === "crash") {
                    callOops();
                } else if (entity.collideAction === "finish") {
                    finished = true;

                    if (pickedGears !== requiredGears) {
                        callNotCompleted();
                    } else {
                        onFinish?.();
                    }
                } else if (entity.collideAction === "pickup") {
                    pickedGears++;
                }
            }
        }
    }

    return (
        <>
            <div className="level1">
                <SceneComponent
                    onRender={onRender}
                    canvasStyle={{ width: '60%', height: '100%' }}
                    models={[
                        ['/models/', 'bridge.glb'],
                        ['/models/', 'robot.glb'],
                        ['/models/', 'road.glb'],
                        ['/models/', 'stone.glb'],
                        ['/models/', 'bridge.glb'],
                        ['/models/', 'tree-2.glb'],
                        ['/models/', 'tree-1.glb']
                    ]}
                    cameraOptions={{
                        xyz: [0, 0, -2],
                        abr: [-1.57, 0.54, 28],
                        betaLimit: [0.7, 0.7],
                        alphaLimit: [4.715, 4.715]
                    }}
                    levelGenerator={(scene: Scene, boxArray: AbstractMesh[], shadowGenerator: ShadowGenerator) => {
                        const gE = generateGeneralLevel(scene, boxArray, shadowGenerator);
                        const [p, sEntities] = sublevelGenerator(scene, boxArray, shadowGenerator);
                        person = p;
                        entities = [...gE, ...sEntities];
                    }}
                />
                <div className="level1_gui">
                    <div className="level1_gui_header">
                        <img src="/images/bizzy.png" />
                        <span>Bizzy</span>
                    </div>
                    <Controls maxElements={maxControls} onChange={(newControls) => controls = newControls} />
                    <div className="level1_gui_run" onClick={onClickExecute}>
                        выполнить
                        <img src="/images/play.svg" />
                    </div>
                </div>
            </div>
            <Overlay obj={taskOverlay}>
                <BizzyDialog
                    title="Задание:"
                    subtitle={`Нужно дойти до моста за ${maxControls} команды и собрать все детали.`}
                    buttonText="Вперед!"
                    onButtonClick={onClickGotTask}
                    textWithImg={{
                        text: "Детали выглядят так:",
                        imgSrc: "/images/gear.png"
                    }}
                />
            </Overlay>
            <Overlay obj={oopsOverlay} hiddenDefault>
                <BizzyDialog
                    title="Упс..."
                    subtitle="Кажется там нет дороги или ты во что-то врезался. Попробуй выбрать что-то другое."
                    buttonText="Еще раз!"
                    onButtonClick={onClickAgain}
                />
            </Overlay>
            <Overlay obj={notCompletedOverlay} hiddenDefault>
                <BizzyDialog
                    title="Эх..."
                    subtitle="Ты не собрал все детали или не дошел до моста, попробуй еще раз."
                    buttonText="Еще раз!"
                    onButtonClick={onClickAgain}
                />
            </Overlay>
        </>
    )
}
