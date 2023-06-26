import React, {ReactNode} from "react";
import './styles.sass';

interface QuestBaseProps {
    children: ReactNode
}

export default function QuestBase({ children }: QuestBaseProps) {
    return (
        <div className="quests-base">
            <div className="quests-base_children">
                {children}
            </div>
        </div>
    )
}
