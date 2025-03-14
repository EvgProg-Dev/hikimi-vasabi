import { FC } from "react";
import { Link } from "react-router-dom";

import style from "./ProductCard.module.css";

import { ProductType } from "src/types";
import { ButtonAddToCart } from "../ButtonAddToCart";


export const ProductCard: FC<ProductType> = (product) => {
    const { _id, title, price, weight, composition, imageUrl } = product;

    return (
        <div className={`${style.card} product-card__global`}>
            <Link to={`/product-info/${_id}`} className={style.card__link}>
                <img className={style.card__img} src={imageUrl} alt={title} />

                <h3 className={style.card__title}>{title}</h3>

                {composition && (
                    <p className={style.card__description}>
                        <b>Склад:</b> {composition}
                    </p>
                )}

                <div className={style.card__info}>
                    {weight && (
                        <>
                            <span className={style.card__weigth}>
                                {weight}г
                            </span>{" "}
                            |
                        </>
                    )}

                    <span className={style.card__price}>{price}₴</span>
                </div>
            </Link>

            <ButtonAddToCart {...product} />
        </div>
    );
};
