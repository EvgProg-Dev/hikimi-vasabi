import { FC } from "react";
import { ProductType } from "src/types";

import { ButtonAddToCart } from "../ButtonAddToCart";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchRemoveProduct } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import style from "./ProductInfoCard.module.css";

import { BadgeProductCard } from "../BadgeProductCard";

export const ProductInfoCard: FC<ProductType> = (product) => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.data));
    const dispatch = useAppDispatch();

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

    const onClickRemoveProduct = (id: string) => {
        dispatch(fetchRemoveProduct({ id }));
        toast.success("Товар видалено!");
        navigate("/");
    };

    return (
        <div className={style.product__card}>
            <BadgeProductCard
                rating={rating}
                isNew={isNewProduct}
                salePrice={salePrice}
            />

            <div className={style.image__wrapper}>
                <img src={imageUrl} alt={title} />
                {gift && (
                    <span className={style.card__gift}>
                        🎁 Подарунок:
                        <br />
                        <strong>{gift}</strong>
                    </span>
                )}
            </div>
            <div className={style.product__card_info}>
                {isAuth && (
                    <div className={style.admin__buttons}>
                        <button
                            onClick={() =>
                                navigate(`/product-info/${_id}/edit`)
                            }
                        >
                            ✏️ Редагувати товар
                        </button>
                        <button onClick={() => onClickRemoveProduct(_id)}>
                            🗑️ Видалити товар
                        </button>
                    </div>
                )}
                <h2 className={style.product__card_title}>{title}</h2>
                {composition && (
                    <p className={style.product__card_composition}>
                        <b>Склад:</b> {composition}
                    </p>
                )}
                {weight && (
                    <p className={style.product__card_weight}>
                        <b>Вага:</b> {weight}г
                    </p>
                )}

                {salePrice ? (
                    <div className={style.card__price_wrapper}>
                        <span className={style.card__price_old}>{price}₴</span>
                        <span className={style.card__price_sale}>
                            {salePrice}₴
                        </span>
                    </div>
                ) : (
                    <h3 className={style.product__card_price}>{price}₴</h3>
                )}

                <ButtonAddToCart {...product} />
            </div>
        </div>
    );
};
