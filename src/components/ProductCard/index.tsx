import { FC } from "react";
import { Link } from "react-router-dom";

import style from "./ProductCard.module.css";

import { ProductType } from "src/types";
import { ButtonAddToCart } from "../ButtonAddToCart";
import { BadgeProductCard } from "../BadgeProductCard";

export const ProductCard: FC<ProductType> = (product) => {
    const {
        _id,
        title,
        price,
        weight,
        composition,
        imageUrl,
        rating,
        isNewProduct,
        salePrice,
        gift,
    } = product;

    return (
        <div className={`${style.card} product-card__global`}>
            <Link to={`/product-info/${_id}`} className={style.card__link}>
                <BadgeProductCard
                    rating={rating}
                    isNew={isNewProduct}
                    salePrice={salePrice}
                />

                <div className={style.image__wrapper}>
                    <img
                        className={style.card__img}
                        src={imageUrl}
                        alt={title}
                    />
                    {gift && (
                        <span className={style.card__gift}>
                            🎁 Подарунок:
                            <br />
                            <strong>{gift}</strong>
                        </span>
                    )}
                </div>

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

                    {salePrice ? (
                        <div className={style.card__price_wrapper}>
                            <span className={style.card__price_old}>
                                {price}₴
                            </span>
                            <span className={style.card__price_sale}>
                                {salePrice}₴
                            </span>
                        </div>
                    ) : (
                        <span className={style.card__price}>{price}₴</span>
                    )}
                </div>
            </Link>

            <ButtonAddToCart {...product} />
        </div>
    );
};
