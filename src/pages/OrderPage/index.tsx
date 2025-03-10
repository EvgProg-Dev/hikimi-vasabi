import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchOrders, setFilter } from "../../redux/slices/orderSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Pagination } from "../../components/Pagination";
import { Spinner } from "../../components/Spinner";
import style from "./OrderPage.module.css";

export interface Order {
    orderId: number;
    createdAt: string;
    lastName: string;
    status: string;
    totalPrice: number;
}

export const Order: FC = () => {
    const dispatch = useAppDispatch();

    const isAuth = useSelector((state: RootState) => Boolean(state.auth.data));

    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/"} />;
    }

    const { orders, filter, status } = useSelector(
        (state: RootState) => state.orders
    );

    useEffect(() => {
        if (status !== "loading") {
            dispatch(
                fetchOrders({
                    status: filter.status,
                    currentPage: filter.currentPage,
                })
            );
        }
    }, [filter.status, filter.currentPage]);

    const handleFilterChange = (status: string) => {
        dispatch(setFilter({ status, currentPage: 1 }));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setFilter({ currentPage: newPage }));
    };

    if (status === "loading") {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <title>Hikimi Vasabi - Замовлення</title>
            </Helmet>

            <div className={style.orders__container}>
                <div className={style.button__wrapper}>
                    {["new", "completed", "canceled"].map((status) => (
                        <button
                            key={status}
                            className={
                                filter.status === status ? style.active : ""
                            }
                            onClick={() => handleFilterChange(status)}
                        >
                            {status === "new"
                                ? "Нові"
                                : status === "completed"
                                ? "Виконані"
                                : "Скасовані"}
                        </button>
                    ))}
                </div>

                {orders.length > 0 ? (
                    orders.map((order: Order) => (
                        <Link
                            to={`/order-info/${order.orderId}`}
                            key={order.orderId}
                            className={style.order__card}
                        >
                            <span className={style.order__id}>
                                №{order.orderId}
                            </span>
                            <span className={style.order__date}>
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                            <span className={style.order__client}>
                                {order.lastName}
                            </span>
                            <span
                                className={`${style.order__status} ${
                                    style[order.status?.toLowerCase()]
                                }`}
                            >
                                {order.status}
                            </span>
                            <span className={style.order__price}>
                                {order.totalPrice}₴
                            </span>
                        </Link>
                    ))
                ) : (
                    <p className={style.no__orders}>Немає замовлень</p>
                )}

                {filter.totalPages > 1 && (
                    <Pagination
                        currentPage={filter.currentPage}
                        totalPages={filter.totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </>
    );
};
