import React, {useState} from "react";
import FullscreenComics from "./components/fullscreenComics";
import Level1 from "./levels/level1";
import {generateSubLevel1} from "./levels/level1/generators/subLevel1_generator";
import {generateSubLevel2} from "./levels/level1/generators/subLevel2_generator";
import Level2 from "./levels/level2";

export default function GameProcessor() {
    const [step, setStep] = useState(11);

    const nextStep = () => {
        setStep(step + 1);
    }

    const getStep = () => {
        switch (step) {
            case 1:
                return <FullscreenComics imageSrc="/images/comics_1.jpg" backgroundColor="#1D0F40" onClick={nextStep} />
            case 2:
                return <FullscreenComics imageSrc="/images/comics_2.jpg" backgroundColor="#1D0F40" onClick={nextStep} />
            case 3:
                return <FullscreenComics imageSrc="/images/comics_3.jpg" backgroundColor="#1D0F40" onClick={nextStep} />
            case 4:
                return <FullscreenComics imageSrc="/images/comics_4.jpg" backgroundColor="#1D0F40" onClick={nextStep} />
            case 5:
                return <Level1 requiredGears={1} maxControls={3} sublevelGenerator={generateSubLevel1} onFinish={nextStep} />
            case 6:
                return <FullscreenComics imageSrc="/images/comics_5.png" backgroundColor="#9ADEE3" onClick={nextStep} />
            case 7:
                return <Level1 requiredGears={2} maxControls={5} sublevelGenerator={generateSubLevel2} onFinish={nextStep} />
            case 8:
                return <FullscreenComics imageSrc="/images/comics_6.png" backgroundColor="#9ADEE3" onClick={nextStep} />
            case 9:
                return <FullscreenComics imageSrc="/images/comics_7.png" backgroundColor="#F7F2BA" onClick={nextStep} />
            case 10:
                return <FullscreenComics imageSrc="/images/comics_8.png" backgroundColor="#FFFFFF" onClick={nextStep} />
            case 11:
                return <Level2 onFinish={nextStep} />
            default:
                return <FullscreenComics imageSrc="/images/comics_default.jpg" backgroundColor="#9ADEE3" onClick={nextStep} />
        }
    }

    return (
        <>
            {getStep()}
        </>
    )
}
