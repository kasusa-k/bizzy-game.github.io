import React, {ReactNode, useEffect, useState} from "react";
import './styles.sass';
import QuestBase from "../../../../components/questBase";
import Bizzy from "../../../../../../components/bizzy";
import Overlay, {createOverlayObj} from "../../../../../../components/overlay";
import BizzyDialog from "../../../../../../components/bizzyDialog";

interface ListStepProps {
    onFinish?: () => void
}

const allProducts = [
    'Молоко', 'Дрожжи',
    'Мука', 'Масло',
    'Яйца', 'Рис',
    'Рыба', 'Сахар',
    'Соль', 'Огурец',
];

const correctProducts = [
    'Молоко',
    'Дрожжи',
    'Мука',
    'Масло',
    'Яйца',
    'Сахар',
    'Соль',
];

export default function ListStep({ onFinish }: ListStepProps) {
    const failOverlay = createOverlayObj();
    const [products, setProducts] = useState<string[]>([]);

    const onClickProduct = (product: string) => {
        if (products.includes(product) || products.length >= 7)
            return;

        products.push(product);

        if (products.length === 7) {
            if (products.every(product => correctProducts.includes(product))) {
                onFinish?.()
            } else {
                failOverlay.show();
            }
        }

        setProducts([...products]);
    }

    const getFridgeItems = () => {
        return allProducts.map(product => ((
            <div className="products-quest_list-step_fridge_item"
                 onClick={() => onClickProduct(product)}
                 style={{ opacity: products.includes(product) ? 0 : 100 }}
            >
                {product}
            </div>
        )));
    }

    const getProductsList = () => {
        const result: ReactNode[] = [];

        for (let i = 0; i < 7; i++) {
            const product = products[i];
            result.push((
                <div className="products-quest_list-step_products-list_item"
                     style={{ backgroundColor: product ? '#ACE88F' : '#FFF' }}
                >
                    {product}
                </div>
            ));
        }

        return result;
    }

    const onClickFailOverlayButton = () => {
        setProducts([]);
        failOverlay.hide();
    }

    return (
        <>
            <div className="products-quest_list-step">
                <Bizzy className="bizzy-attached-left-top" />

                <div className="products-quest_list-step_main">

                    <div className="products-quest_list-step_wrapper_horizontal">
                        <div className="products-quest_list-step_wrapper_vertical">
                            <h1>Холодильник</h1>

                            <div className="products-quest_list-step_fridge" style={{ backgroundImage: 'url("/images/fridgeBackground.png")' }}>
                                {getFridgeItems()}
                            </div>
                        </div>


                        <div className="products-quest_list-step_wrapper_vertical">
                            <h1>Список продуктов:</h1>

                            <div className="products-quest_list-step_products-list">
                                {getProductsList()}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="attached-left-bottom">Выбери все продукты, которые нужны для приготовления пончиков</h2>
            </div>
            <Overlay obj={failOverlay} hiddenDefault>
                <BizzyDialog
                    title="Так не получится"
                    subtitle="С таким набором продуктов не приготовишь пончики, попробуй другие."
                    buttonText="Попробовать еще раз!"
                    onButtonClick={onClickFailOverlayButton}
                />
            </Overlay>
        </>
    )
}
