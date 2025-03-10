import { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import style from "./OrderModal.module.css";
import { useAppDispatch } from "./../../redux/store";
import { clearItems } from "./../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { CartItemType } from "src/types";
import axios from "./../../axios";

type OrderModalProps = {
    items: CartItemType[];
    totalPrice: number;
    onClose: () => void;
};

export const OrderModal: FC<OrderModalProps> = ({
    items,
    totalPrice,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [delivery, setDelivery] = useState("pickup");
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const orderInfo = {
                firstName,
                lastName,
                phone,
                delivery,
                comment,
                orderItems: items,
                totalPrice,
            };
            axios.post("/orders", orderInfo);
            onClose();
            navigate("/");
            dispatch(clearItems());
            toast.success("Ваше замовлення оформлене!");
        } catch (error) {
            toast.error("Сталася помилка при оформленні замовлення.");
            console.error("error: ", error);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className={style.modal} onClick={handleOverlayClick}>
            <div className={style.modal__content}>
                <span onClick={onClose} className={style.close__btn}>
                    &times;
                </span>
                <h2>Оформлення замовлення</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.form__group}>
                        <label htmlFor="firstName">Ім'я:</label>
                        <input
                            placeholder="Введіть ім'я"
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.form__group}>
                        <label htmlFor="lastName">Прізвище:</label>
                        <input
                            placeholder="Введіть прізвище"
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.form__group}>
                        <label htmlFor="phone">Номер телефону:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            pattern="^\+?\d{1,4}?\d{7,15}$"
                            placeholder="Введіть номер телефону"
                        />
                    </div>

                    <div className={style.form__group}>
                        <label className={style.form__group_radio_label}>
                            Спосіб доставки:
                        </label>
                        <div className={style.radio__group}>
                            <label>
                                <input
                                    checked={delivery === "pickup"}
                                    type="radio"
                                    name="delivery"
                                    value="pickup"
                                    onChange={(e) =>
                                        setDelivery(e.target.value)
                                    }
                                    required
                                />
                                Самовивіз
                            </label>
                            <label>
                                <input
                                    checked={delivery === "courier"}
                                    type="radio"
                                    name="delivery"
                                    value="courier"
                                    onChange={(e) =>
                                        setDelivery(e.target.value)
                                    }
                                    required
                                />
                                Кур'єр
                            </label>
                        </div>
                    </div>

                    <div className={style.form__group}>
                        <label htmlFor="comment">Коментар</label>
                        <textarea
                            placeholder="Опишіть ваші побажання до замовлення, вкажіть точну адресу для доставки кур'єром або бажаний час доставки."
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className={style.cart__summary}>
                        <h3>Ваше замовлення:</h3>
                        <ul className={style.cart__list}>
                            {items.map((item) => (
                                <li key={item.id} className={style.cart__item}>
                                    <span className={style.cart__item_title}>
                                        {item.title}
                                    </span>{" "}
                                    <span className={style.cart__item_count}>
                                        x{item.count}
                                    </span>
                                    <span>{item.price * item.count}₴</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className={style.total__price}>
                            Сумма до сплати: <b>{totalPrice}₴</b>
                        </h3>
                    </div>

                    <button type="submit" className={style.order__bottom_next}>
                        Оформити замовлення
                    </button>
                </form>
            </div>
        </div>
    );
};
