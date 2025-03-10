import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

import style from "./AdminMenu.module.css";

export const AdminMenu = () => {
    const dispatch = useAppDispatch();
    return (
        <div className={style.admin__menu}>
            <Link to={"/create-product"}>Додати новий товар</Link>
            <Link to={"/order"}>Замовлення</Link>

            <button onClick={() => dispatch(logout())}>Вийти</button>
        </div>
    );
};
