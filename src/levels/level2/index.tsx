import React, {useEffect, useState} from "react";
import './styles.sass';
import SceneComponent from "../../SceneComponent";
import {generateLevel2} from "./level_generator";
import {AbstractMesh, Scene, ShadowGenerator} from "@babylonjs/core";
import IEntity from "./objects/IEntity";
import Overlay, {createOverlayObj} from "../../components/overlay";
import QuestsMenu from "./components/questsMenu";
import {ObjectType} from "./objects/ObjectType";
import ProductsQuest from "./quests/products";

interface Level2Props {
    onFinish: () => void
}

enum QuestsEnum {
    None,
    Products,
    Donuts,
    Kettle,
    Wash,
}

export default function Level2({}: Level2Props) {
    const [currentQuest, setCurrentQuest] = useState(QuestsEnum.Products);

    let scene: Scene;
    let entities: IEntity[] = [];
    let pickedEntity: IEntity | null;
    let questsOverlay = createOverlayObj();

    const onMouseClick = (event: MouseEvent) => {
        if (!pickedEntity)
            return;

        if (pickedEntity.type === ObjectType.Fridge) {
            setCurrentQuest(QuestsEnum.Products);
        }
        // TODO: open correct quest
    }

    const onMouseMove = (event: MouseEvent) => {
        if (questsOverlay.isShow) {
            pickedEntity?.highlightEntity(false);
            pickedEntity = null;
            return;
        }

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

    const roomPage = () => {return (
        <>
            <div className="level2">
                <SceneComponent
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
                    <div className="level2_gui-item" onClick={() => questsOverlay.show()}>
                        <img src="/images/quests.png" />
                        <span>Квесты</span>
                    </div>
                </div>
            </div>
            <Overlay obj={questsOverlay} hiddenDefault>
                <QuestsMenu onClose={() => questsOverlay.hide()} />
            </Overlay>
        </>
    )}

    const getPage = () => {
        switch (currentQuest) {
            case QuestsEnum.None:
                return roomPage();
            case QuestsEnum.Products:
                return <ProductsQuest />;
            case QuestsEnum.Donuts:
                break;
            case QuestsEnum.Kettle:
                break;
            case QuestsEnum.Wash:
                break;
        }
    }

    return (
        <>
            {getPage()}
        </>
    )
}
