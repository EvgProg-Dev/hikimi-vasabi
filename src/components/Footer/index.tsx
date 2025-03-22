import { FC } from "react";

import footerlogo from "./../../assets/footer-logo.png";

import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import Map from "../Map";

export const Footer: FC = () => {
    return (
        <footer className={style.footer}>
            <div className="container">
                <img
                    src={footerlogo}
                    className={style.footer__logo}
                    alt="Логотип Hikimi Vasabi"
                />

                <hr /> 
                <div className={style.footer__wrapper}>
                    <div className={style.footer__address}>
                        <h3>Наша адреса</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Maiores voluptatum pariatur non eligendi nam
                            autem sint adipisci natus. Qui, tenetur!\
                        </p>
                    </div>
                    <div className={style.footer__contacts}>
                        <h3>Контакти</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Maiores voluptatum pariatur non eligendi nam
                            autem sint adipisci natus. Qui, tenetur!\
                        </p>
                    </div>
                    <div className={style.footer__info}>
                        <h3>Графік роботи</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Maiores voluptatum pariatur non eligendi nam
                            autem sint adipisci natus. Qui, tenetur!\
                        </p>
                    </div>
                </div>

                <hr /> 

                <div className={style.footer__map_container}>
                    <h3>Ми на карті</h3>
                    <Map />
                </div>

                <hr /> 

                <div className={style.admin__footer}>
                    <Link to={"/login"}>Admin Panel</Link>
                </div>
            </div>
        </footer>
    );
};
