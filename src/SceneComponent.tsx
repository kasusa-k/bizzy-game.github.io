import React, {CSSProperties, useEffect, useRef} from "react";
import createEngine from "./EngineLoader";
import {CameraOptions, LevelGenerator, ModelOptions} from "./utils/engineTypes";
import {Engine, Scene} from "@babylonjs/core";

interface SceneProps {
    canvasStyle: CSSProperties,
    models: ModelOptions[] | any[],
    cameraOptions: CameraOptions,
    levelGenerator: LevelGenerator,
    onRender?: (engine: Engine, scene: Scene) => void
}

export default function SceneComponent({ canvasStyle, models, cameraOptions, levelGenerator, onRender }: SceneProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const { current: canvas } = canvasRef;

        if (!canvas) return;

        const { engine, scene, dispose } = createEngine(canvas, models, cameraOptions, levelGenerator);

        engine.runRenderLoop(() => {
            if (!scene.isLoading) {
                onRender?.(engine, scene);
            }

            scene.render();
        })

        return () => {
            dispose();
        }
    });

    return <canvas ref={canvasRef} style={{ ...canvasStyle, outline: "none" }} />
}
