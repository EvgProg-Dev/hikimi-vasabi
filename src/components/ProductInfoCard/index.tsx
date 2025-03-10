import { FC } from "react";
import { ProductType } from "src/types";

import { ButtonAddToCart } from "../ButtonAddToCart";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { fetchRemoveProduct } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

import style from "./ProductInfoCard.module.css";
import { toast } from "react-toastify";

export const ProductInfoCard: FC<ProductType> = (product) => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.data));
    const dispatch = useAppDispatch();

    const { _id, title, price, weight, composition, imageUrl } = product;

    const onClickRemoveProduct = (id: string) => {
        dispatch(fetchRemoveProduct({ id }));
        toast.success("Товар видалено!");
        navigate("/");
    };

    return (
        <div className={style.product__card}>
            <img src={imageUrl} alt={title} />
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
                <h3 className={style.product__card_price}>
                    {" "}
                    <span>{price}₴</span>
                </h3>

                <ButtonAddToCart {...product} />
            </div>
        </div>
    );
};
