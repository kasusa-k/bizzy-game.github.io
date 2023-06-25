import React, {useEffect} from "react";
import './styles.sass';
import SceneComponent from "../../SceneComponent";
import {generateLevel2} from "./level_generator";
import {AbstractMesh, Scene, ShadowGenerator} from "@babylonjs/core";
import IEntity from "./objects/IEntity";

interface Level2Props {
    onFinish: () => void
}

export default function Level2({}: Level2Props) {
    let scene: Scene;
    let entities: IEntity[] = [];
    let pickedEntity: IEntity | null;

    const onMouseClick = (event: MouseEvent) => {
        if (!pickedEntity)
            return;
    }

    const onMouseMove = (event: MouseEvent) => {
        if (!scene)
            return;

        const pickResult = scene.pick(event.clientX, event.clientY);
        if (!pickResult) {
            pickedEntity?.highlightEntity(false);
            pickedEntity = null;
            return;
        }

        if (pickedEntity?.isPicked(pickResult)) {
            return;
        }

        pickedEntity?.highlightEntity(false);
        pickedEntity = null;

        for (let entity of entities) {
            if (entity.isPicked(pickResult)) {
                entity.highlightEntity(true);
                pickedEntity = entity;
                return;
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', onMouseClick);
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('click', onMouseClick)
            window.removeEventListener('mousemove', onMouseMove)
        };
    });

    const onRender = () => {

    }

    return (
        <>
            <div className="level2">
                <SceneComponent
                    onRender={onRender}
                    canvasStyle={{ width: '80%', height: '100%' }}
                    models={[
                        ['/models/', 'dishSink.glb'],
                        ['/models/', 'fridge.glb'],
                        ['/models/', 'fryingPan.glb'],
                        ['/models/', 'kettle.glb'],
                        ['/models/', 'kitchenRoom.glb'],
                    ]}
                    cameraOptions={{
                        xyz: [11, 0, 4],
                        abr: [-1.57, 0, 15],
                        betaLimit: [1.3, 1.3],
                        alphaLimit: [35.5, 35.5]
                    }}
                    levelGenerator={(_scene: Scene,
                                     boxArray: AbstractMesh[],
                                     shadowGenerator: ShadowGenerator) => {
                        scene = _scene;
                        entities = generateLevel2(_scene, boxArray, shadowGenerator);
                    }}
                />
                <div className="level2_gui">
                    <div className="level2_gui-item bizzy">
                        <img src="/images/bizzy.png" />
                        <span>Bizzy</span>
                    </div>
                    <div className="level2_gui-item">
                        <img src="/images/quests.png" />
                        <span>Квесты</span>
                    </div>
                </div>
            </div>
        </>
    )
}
