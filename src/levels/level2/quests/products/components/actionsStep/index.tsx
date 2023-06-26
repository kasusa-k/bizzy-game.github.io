import React, {ReactNode, useState} from "react";
import './styles.sass';
import Bizzy from "../../../../../../components/bizzy";
import Overlay, {createOverlayObj} from "../../../../../../components/overlay";
import BizzyDialog from "../../../../../../components/bizzyDialog";

type BizzyAction = 'банку' | 'дверь' | 'холодильник';
type MarkAction = 'список' | 'стул' | 'тарелку';

interface IAction<TAction> {
    who?: 'Bizzy' | 'Марк',
    what?: 'открыть' | 'взять' | 'закрыть',
    action?: TAction
}

const getDefaultActions = (): [IAction<BizzyAction>, IAction<MarkAction>] => {
    return [
        {},
        {},
    ];
}

const correctActions = [
    { who: 'Bizzy', what: 'открыть', action: 'холодильник' },
    { who: 'Марк', what: 'взять', action: 'список' },
]

interface ActionsStepProps {
    onFinish?: () => void
}

export default function ActionsStep({ onFinish }: ActionsStepProps) {
    const failOverlay = createOverlayObj();
    const [actions, setActions] = useState(getDefaultActions())

    const getActionBlock = (action: IAction<string>) => (
        <div className="products-quest_actions-step_main_action_wrap">
            <div className="products-quest_actions-step_main_action who">
                {action.who ?? '?'}
            </div>
            <span>.</span>
            <div className="products-quest_actions-step_main_action what">
                {action.who && (action.what ?? '?')}
            </div>
            <div className="products-quest_actions-step_main_action action">
                {action.who && action.what && (action.action ?? '?')}
            </div>
        </div>
    )

    const getActions = () => {
        const result: ReactNode[] = [];

        for (let action of actions) {
            result.push(getActionBlock(action));

            if (!(action.who && action.what && action.action)) {
                break;
            }
        }

        return (
            <div className="products-quest_actions-step_main_actions-list">
                {result.map(result => result)}
            </div>
        );
    }

    const chooses = [
        { title: 'Выбери КТО будет делать:', variants: ['Bizzy', 'Марк'], variantColor: '#EBDB49B2' },
        { title: 'Выбери ЧТО будет делать:', variants: ['открыть', 'взять', 'закрыть'], variantColor: '#88DE5FB2' },
        { title: 'Выбери что ты положишь в кармашек действия:', variants: ['банку', 'дверь', 'холодильник'], variantColor: '#FFF', border: '1px solid black' },
        { title: 'Выбери КТО будет делать:', variants: ['Bizzy', 'Марк'], variantColor: '#EBDB49B2' },
        { title: 'Выбери ЧТО будет делать:', variants: ['открыть', 'взять', 'закрыть'], variantColor: '#88DE5FB2' },
        { title: 'Выбери что ты положишь в кармашек действия:', variants: ['список', 'стул', 'тарелку'], variantColor: '#FFF', border: '1px solid black' },
    ];

    const onChoose = (variant: string) => {
        const baseIdx = actions.findIndex(action => !action.who || !action.what || !action.action);
        const action = actions[baseIdx];

        if (!action.who) {
            action.who = variant as any;
        } else if (!action.what) {
            action.what = variant as any;
        } else if (!action.action) {
            action.action = variant as any;
        }

        setActions([...actions])
    }

    const getChoose = (title: string, variants: string[], variantColor: string, border?: string) => (
        <div className="products-quest_actions-step_main_choose">
            <h1>{title}</h1>

            <div className="products-quest_actions-step_main_choose_variants">
                {variants.map(variant => {
                    return (
                        <div onClick={() => onChoose(variant)}
                             style={{ backgroundColor: variantColor, border: border }}
                             className="products-quest_actions-step_main_choose_variant"
                        >
                            {variant}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    const getChooseBlock = () => {
        let baseIdx = 0;
        for (let action of actions) {
            const idx = !action.who
                ? 0 : !action.what
                    ? 1 : !action.action
                        ? 2 : -1;

            if (idx !== -1) {
                return getChoose(
                    chooses[baseIdx + idx].title,
                    chooses[baseIdx + idx].variants,
                    chooses[baseIdx + idx].variantColor,
                    chooses[baseIdx + idx].border
                )
            }

            baseIdx += 3;
        }

        return (
            <div className="products-quest_actions-step_main_end" onClick={onClickFinish}>
                Собрать список
            </div>
        )
    }

    const getMainBlock = () => (
        <div className="products-quest_actions-step_main">
            <h1>Собрать продукты для пончиков:</h1>

            {getActions()}

            {getChooseBlock()}
        </div>
    )

    const onClickFinish = () => {
        if (actions.every((action, index) => {
            const correctAction = correctActions[index];
            return action.who === correctAction.who
                && action.what === correctAction.what
                && action.action === correctAction.action
        })) {
            onFinish?.();
        } else {
            failOverlay.show();
        }
    }

    const onClickFailOverlayButton = () => {
        setActions(getDefaultActions())
        failOverlay.hide();
    }

    return (
        <>
            <div className="products-quest_actions-step">
                <Bizzy className="bizzy-attached-left-top"/>

                {getMainBlock()}

                <div className="products-quest_actions-step_hint">
                    <img src="/images/mark.png" />
                    <span>Мы договорились, что я беру продукты, а Bizzy открывает холодильник</span>
                </div>
            </div>
            <Overlay obj={failOverlay} hiddenDefault>
                <BizzyDialog
                    title="Так не получится"
                    subtitle="С таким набором действий ребята не смогут собрать продукты для пончиков, попробуй по-другому."
                    buttonText="Попробовать еще раз!"
                    onButtonClick={onClickFailOverlayButton}
                />
            </Overlay>
        </>
    )
}
