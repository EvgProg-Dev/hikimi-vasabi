import { FC } from "react";

import style from "./Cart.module.css";

import { minusItem, plusItem, removeItem } from "../../redux/slices/cartSlice";
import { useAppDispatch } from "././../../redux/store";

import { CartItemType } from "src/types";

export const CartItem: FC<CartItemType> = ({
    id,
    title,
    composition,
    weight,
    imageUrl,
    count,
    price,
}) => {
    const dispatch = useAppDispatch();

    return (
        <div key={id} className={style.cart__product}>
            <div className={style.product_info}>
                <img src={imageUrl} alt={title} />
                <div className={style.product_info__wrapper}>
                    <h4 className={style.product_info__title}>{title}</h4>
                    {composition && (
                        <p className={style.product_info__descr}>
                            <b>Склад:</b> {composition}
                        </p>
                    )}
                    {weight && (
                        <p className={style.product_info__weight}>
                            <b>Вага:</b> {weight} г
                        </p>
                    )}
                </div>
            </div>
            <div className={style.product_count}>
                <button
                    onClick={() =>
                        count > 1
                            ? dispatch(minusItem(id))
                            : dispatch(removeItem(id))
                    }
                >
                    -
                </button>
                <span>{count}</span>
                <button onClick={() => dispatch(plusItem(id))}>+</button>
            </div>

            <span className={style.product__price}>{count * price}&nbsp;₴</span>

            <button
                onClick={() => dispatch(removeItem(id))}
                className={style.product__delete}
            >
                X
            </button>
        </div>
    );
};
