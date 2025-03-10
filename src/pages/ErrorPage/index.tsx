import { FC } from "react";
import { Helmet } from "react-helmet-async";

import style from "./ErrorPage.module.css";

interface ErrorPageProps {
    errors: string;
}
export const ErrorPage: FC<ErrorPageProps> = ({ errors }) => {
    return (
        <>
            <Helmet>
                <title>Серверна помилка 😞 - Hikimi Vasabi</title>
            </Helmet>
            <div className={style.error__message}>
                <h2>
                    ❌ Виникла помилка! <br />
                    Ми вже працюємо над її виправленням. <br />({errors})
                </h2>
            </div>
        </>
    );
};
