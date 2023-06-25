import React from "react";
import './styles.sass';

interface QuestsMenuProps {
    onClose?: () => void
}

export default function QuestsMenu({ onClose }: QuestsMenuProps) {
    return (
        <div className="quests-menu">
            <div className="quests-menu_header">
                <h1>Твои задания:</h1>
                <img src="/images/closeIcon.svg" onClick={onClose} />
            </div>
            <ul className="quests-menu_list">
                <li className="quests-menu_list_item completed">
                    • Собрать продукты для пончиков
                    <span>0/1</span>
                </li>
                <li className="quests-menu_list_item">
                    • Приготовить пончики
                    <span>0/3</span>
                </li>
                <li className="quests-menu_list_item">
                    • Вскипятить чайник
                    <span>0/1</span>
                </li>
                <li className="quests-menu_list_item">
                    • Помыть посуду
                    <span>0/1</span>
                </li>
            </ul>
        </div>
    )
}
