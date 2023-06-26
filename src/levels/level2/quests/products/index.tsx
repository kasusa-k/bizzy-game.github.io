import QuestBase from "../../components/questBase";
import {useState} from "react";
import ActionsStep from "./components/actionsStep";
import ListStep from "./components/listStep";

enum StepsEnum {
    Actions,
    List,
}

interface ProductsQuestProps {

}

export default function ProductsQuest({}: ProductsQuestProps) {
    const [step, setStep] = useState(StepsEnum.Actions);

    const getStep = () => {
        switch (step) {
            case StepsEnum.Actions:
                return <ActionsStep onFinish={() => setStep(StepsEnum.List)} />;
            case StepsEnum.List:
                return <ListStep />;
        }
    }

    return (
        <QuestBase>
            {getStep()}
        </QuestBase>
    )
}
