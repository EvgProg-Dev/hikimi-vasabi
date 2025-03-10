import React, { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { ErrorPage } from "../../pages/ErrorPage";
import NotFound from "../../pages/NotFoundPage";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import styles from "./OrderInfo.module.css";

export const OrderInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({});

    const fetchOrder = async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            const response = await axios.get(`/orders/${id}`);
            setData(response.data);
            setFormData(response.data);
        } catch (error: any) {
            if (error.response) {
                console.error("Axios error response:", error.response);
                setError(error.response.data?.message || "Server error");
            } else if (error.request) {
                console.error("Axios error request:", error.request);
                setError("No response from server");
            } else {
                console.error("Unexpected error:", error.message);
                setError("Unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.patch(`/orders/${id}`, formData);
            setIsEditing(false);
            toast.success("Зміни збережено!");
        } catch (error) {
            toast.error("Не вдалося зберегти зміни!");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(data); 
    };

    if (isLoading) {
        return (
            <div className={styles.spinnerContainer}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        toast.error(`Виникла помилка! ${error}`);
        return <ErrorPage errors={error} />;
    }

    if (!data) {
        return <NotFound />;
    }

    return (
        <div className={styles.orderDetails}>
            <h2>Деталі замовлення</h2>
            <div className={styles.orderInfo}>
                <div className={styles.infoRow}>
                    <label htmlFor="firstName">Ім'я</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className={styles.infoRow}>
                    <label htmlFor="lastName">Прізвище</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className={styles.infoRow}>
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className={styles.infoRow}>
                    <label htmlFor="delivery">Спосіб доставки</label>
                    <select
                        id="delivery"
                        name="delivery"
                        value={formData.delivery}
                        onChange={handleChange}
                        disabled={!isEditing}
                    >
                        <option value="courier">Кур'єр</option>
                        <option value="pickup">Самовивіз</option>
                    </select>
                </div>
                <div className={styles.infoRow}>
                    <label htmlFor="comment">Коментар</label>
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        value={formData.comment || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <div className={styles.infoRow}>
                    <label htmlFor="status">Статус</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={!isEditing}
                    >
                        <option value="new">В обробці</option>
                        <option value="completed">Виконано</option>
                        <option value="canceled">Скасовано</option>
                    </select>
                </div>
            </div>

            <h3 className={styles.orderTitle}>Склад замовлення:</h3>
            <ul className={styles.orderItems}>
                {data.orderItems.map((item: any, index: number) => (
                    <li key={index} className={styles.orderItem}>
                        <div className={styles.itemImage}>
                            <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <div className={styles.itemDetails}>
                            <p>
                                <strong>Товар:</strong> {item.title}
                            </p>
                            <p>
                                <strong>Кількість:</strong> {item.count}шт
                            </p>
                            <p>
                                <strong>Ціна:</strong> {item.price}₴
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.orderTotal}>
                <p>
                    Загальна сума: <span>{data.totalPrice}₴</span>
                </p>
            </div>

            {isEditing ? (
                <div className={styles.buttonContainer}>
                    <button className="save" onClick={handleSave}>
                        Зберегти
                    </button>
                    <button className="cancel" onClick={handleCancel}>
                        Скасувати
                    </button>
                </div>
            ) : (
                <div className={styles.buttonContainer}>
                    <button className="save" onClick={() => setIsEditing(true)}>
                        Редагувати
                    </button>
                </div>
            )}
        </div>
    );
};
