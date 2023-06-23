import React, {useEffect, useState} from "react";
import './styles.sass';

interface ControlsProps {
    maxElements: number,
    onChange?: (controls: PersonControl[]) => void
}

export interface PersonControl {
    operator: string,
    direction: string,
    count: number
}

export const defaultPersonControl = (): PersonControl => ({
    operator: "bizzy",
    direction: "forward",
    count: 1
})

export default function Controls({ maxElements, onChange }: ControlsProps) {
    const [controls, setControls] = useState<PersonControl[]>([defaultPersonControl()]);

    useEffect(() => {
        onChange?.(controls);
    }, [controls])

    const onChangeOperator = (idx: number, value: string) => {
        controls[idx].operator = value;
        setControls([...controls]);
    }

    const onChangeDirection = (idx: number, value: string) => {
        controls[idx].direction = value;
        setControls([...controls]);
    }

    const onChangeCount = (idx: number, value: string) => {
        controls[idx].count = parseInt(value);
        setControls([...controls]);
    }

    const getControls = () => controls.map((control, idx) => (
        <div className="level1_controls-item" key={idx}>
            <select onChange={(e) => onChangeOperator(idx, e.target.value)}>
                <option value="bizzy">Bizzy</option>
            </select>
            <select onChange={(e) => onChangeDirection(idx, e.target.value)}>
                <option value="forward">Вперед</option>
                <option value="back">Назад</option>
                <option value="left">Влево</option>
                <option value="right">Вправо</option>
            </select>
            <select onChange={(e) => onChangeCount(idx, e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
        </div>
    ))

    return (
        <div className="level1_controls_container">
            <div className="level1_controls">
                {getControls()}
            </div>
            {controls.length < maxElements && <div
                onClick={() => controls.length < maxElements && setControls([...controls, defaultPersonControl()])}
                className="level1_controls_plusButton"
            >+</div>
            }
        </div>
    )
}
