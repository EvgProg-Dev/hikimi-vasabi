import { FC } from "react";

import footerlogo from "./../../assets/footer-logo.png";

import style from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer: FC = () => {

    return (
        <footer className={style.footer}>
            <div className="container">
                <img
                    src={footerlogo}
                    className={style.footer__logo}
                    alt="Логотип Hikimi Vasabi"
                />
                <div className={style.footer__wrapper}>
                    <div className={style.footer__address}>Наша адреса</div>
                    <div className={style.footer__contacts}>Контакти</div>
                    <div className={style.footer__info}>Графік роботи</div>
                </div>

                <div className={style.admin__footer}>
                    <Link to={"/login"}>Admin Panel</Link>
                </div>
            </div>
        </footer>
    );
};
