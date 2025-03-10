import { Link } from "react-router-dom";
import { FC } from "react";

import notFoundImg from "./../../assets/404.svg";

import style from './NotFoundBlock.module.css'


export const NotFoundBlock: FC = () => {
    return (
        <div className={style.notFound}>
            <img className={style.notFound__img} src={notFoundImg} alt="404" />
            <h3 className={style.notFound__title}>
                Сторінку, яку ви шукаєте, не знайдено.
                <br />
                Можливо, вона була видалена або ніколи не існувала.
            </h3>
            <p className={style.notFound__descr}>✨ Повернемо вас назад у світ смачної їжі! 🍣</p>
            <Link className={style.notFound__button} to={"/"}>Повернутися на головну</Link>
        </div>
    );
};
