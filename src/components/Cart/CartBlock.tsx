import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";

import { clearItems } from "../../redux/slices/cartSlice";
import { RootState, useAppDispatch } from "./../../redux/store";

import { CartItem } from "./CartItem";

import style from "./Cart.module.css";
import { OrderModal } from "../OrderModal";

export const CartBlock: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const { items, totalPrice, totalCount } = useSelector(
        (state: RootState) => state.cart
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    return (
        <>
            <div className={style.cart}>
                <div className={style.cart__wrapper}>
                    <h3 className={style.cart__title}>
                        <svg
                            width={31}
                            height={31}
                            viewBox="0 0 31 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.6667 28.7917C12.0014 28.7917 13.0833 27.7097 13.0833 26.375C13.0833 25.0403 12.0014 23.9583 10.6667 23.9583C9.33198 23.9583 8.25 25.0403 8.25 26.375C8.25 27.7097 9.33198 28.7917 10.6667 28.7917Z"
                                stroke="#3F3F3F"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M25.1667 28.7917C26.5014 28.7917 27.5833 27.7097 27.5833 26.375C27.5833 25.0403 26.5014 23.9583 25.1667 23.9583C23.832 23.9583 22.75 25.0403 22.75 26.375C22.75 27.7097 23.832 28.7917 25.1667 28.7917Z"
                                stroke="#3F3F3F"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.85117 8.24999H28.7916L26.7616 18.3879C26.6511 18.9442 26.3484 19.4439 25.9066 19.7996C25.4648 20.1553 24.912 20.3442 24.3449 20.3333H11.5728C10.9828 20.3383 10.4113 20.1273 9.96612 19.74C9.52095 19.3527 9.23286 18.8159 9.15617 18.2308L7.3195 4.31083C7.24334 3.72991 6.95872 3.19643 6.51862 2.80968C6.07852 2.42292 5.5129 2.20922 4.927 2.20833H2.20825"
                                stroke="#3F3F3F"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Кошик
                    </h3>

                    <button
                        onClick={() => dispatch(clearItems())}
                        className={style.cart__button}
                    >
                        <svg
                            fill="currentColor"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="20px"
                            height="20px"
                            viewBox="0 0 482.428 482.429"
                            xmlSpace="preserve"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"
                                    />
                                    <path
                                        d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                                    />
                                    <path
                                        d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                                    />
                                    <path
                                        d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                                    />
                                </g>
                            </g>
                        </svg>
                        Очистити кошик
                    </button>
                </div>

                {items.map((item: any) => (
                    <CartItem key={item.id} {...item} />
                ))}

                <div className={style.order__info}>
                    <p className={style.order__info_count}>
                        Всього товарів: <b>{totalCount} шт</b>
                    </p>
                    <p className={style.order__info_price}>
                        Сума замовлення: <b>{totalPrice}&nbsp;₴</b>
                    </p>
                </div>

                <div className={style.order__bottom}>
                    <Link className={style.order__bottom_back} to={"/"}>
                        Повернутися на головну
                    </Link>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={style.order__bottom_next}
                    >
                        Оформити замовлення
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <OrderModal
                    items={items}
                    totalPrice={totalPrice}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};
