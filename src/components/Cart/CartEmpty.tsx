import { FC } from "react";
import { Link } from "react-router-dom";

import style from "./Cart.module.css";

import image from "./../../assets/cart-empty.png";


export const CartEmpty: FC = () => {
    return (
        <div className={style.empty__cart}>
            <img
                className={style.empty__cart_img}
                src={image}
                alt="Порожній кошик – додайте товари, щоб оформити замовлення"
            />
            <h2 className={style.empty__cart_title}>
                Здається, ви ще не додали жодного товару. <br />
                Перегляньте наше меню та знайдіть щось смачненьке! 🍣
            </h2>
            <Link className={style.order__bottom_back} to={"/"}>
                Повернутися на головну
            </Link>
        </div>
    );
};
