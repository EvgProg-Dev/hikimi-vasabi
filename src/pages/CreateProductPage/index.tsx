import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import axios from "../../axios";

import { categoriesList } from "../../list/categoriesList";
import { RootState } from "src/redux/store";

import style from "./CreateProductPage.module.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const CreateProduct = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigate = useNavigate();

    const isAuth = useSelector((state: RootState) => Boolean(state.auth.data));

    if (window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/"} />;
    }

    const [formData, setFormData] = useState({
        title: "",
        composition: "",
        price: "",
        weight: "",
        category: "",
        rating: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (id) {
            axios
                .get(`/products/${id}`)
                .then((res) => {
                    setFormData({
                        title: res.data.title || "",
                        composition: res.data.composition || "",
                        price: res.data.price || "",
                        weight: res.data.weight || "",
                        category: res.data.category || "",
                        rating: res.data.rating || "",
                        imageUrl: res.data.imageUrl || "",
                    });
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = isEditing
                ? await axios.patch(`/products/${id}`, filteredData)
                : await axios.post("/products", filteredData);

            const _id = isEditing ? id : data._id;

            navigate(`/product-info/${_id}`);
            toast.success(
                `${isEditing ? "Товар оновлено!" : "Товар створено!"}`
            );
        } catch (error) {
            console.error("error: ", error);
            toast.error(`Помилка! ${error}`);
        }
    };

    return (
        <>
            <Helmet>
                <title>Hikimi Vasabi - Додати новий товар</title>
            </Helmet>
            <form
                className={style.create_product__form}
                onSubmit={handleSubmit}
            >
                <label>
                    <div>
                        <span className={style.required}>*</span>Назва товару:
                    </div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="title"
                        placeholder="Введіть назву"
                        value={formData.title}
                        required
                    />
                </label>

                <label>
                    Склад:
                    <input
                        onChange={handleChange}
                        type="text"
                        name="composition"
                        placeholder="Введіть склад"
                        value={formData.composition}
                    />
                </label>

                <label>
                    <div>
                        <span className={style.required}>*</span>Ціна:
                    </div>

                    <input
                        onChange={handleChange}
                        type="number"
                        name="price"
                        placeholder="Введіть ціну"
                        value={formData.price}
                        required
                    />
                </label>

                <label>
                    Вага:
                    <input
                        onChange={handleChange}
                        type="number"
                        name="weight"
                        placeholder="Введіть вагу (г)"
                        value={formData.weight}
                    />
                </label>

                <label htmlFor="category">
                    <div>
                        <span className={style.required}>*</span>Категорія:
                    </div>
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                >
                    <option value="" disabled>
                        Оберіть категорію
                    </option>
                    {categoriesList.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>

                <label>
                    <div>
                        <span className={style.required}>*</span>Рейтинг (від 1
                        до 10):
                    </div>
                    <input
                        onChange={handleChange}
                        type="number"
                        name="rating"
                        placeholder="Введіть рейтинг"
                        value={formData.rating}
                        required
                    />
                </label>

                <label>
                    <div>
                        <span className={style.required}>*</span>Зображення
                        (URL):
                    </div>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="imageUrl"
                        placeholder="Посилання на зображення"
                        value={formData.imageUrl}
                        required
                    />
                </label>

                <div className={style.button__wrapper}>
                    <Link to={"/"} className={style.button}>
                        Повернутися на головну
                    </Link>
                    <button type="submit" className={style.button}>
                        {isEditing ? "Оновити товар" : "Додати товар"}
                    </button>
                </div>
            </form>
        </>
    );
};


export default CreateProduct;