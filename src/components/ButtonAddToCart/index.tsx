import { FC, useState } from "react";
import { addItem } from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../redux/store";
import { CartItemType, ProductType } from "src/types";

import style from "./ButtonAddToCart.module.css";

export const ButtonAddToCart: FC<ProductType> = ({
    _id,
    title,
    price,
    weight,
    composition,
    imageUrl,
}) => {
    const dispatch = useAppDispatch();

    const [added, setAdded] = useState(false);

    const onClickAdd = () => {
        setAdded(true);

        const item: CartItemType = {
            id: _id,
            title,
            price,
            weight,
            composition,
            imageUrl,
            count: 1,
        };

        setTimeout(() => setAdded(false), 1500);

        dispatch(addItem(item));
    };

    return (
        <button
            disabled={added}
            onClick={onClickAdd}
            className={`${style.card__button} ${added ? style.added : ""}`}
        >
            {added ? "Додано ✅" : "Додати в кошик 🛒"}
        </button>
    );
};
