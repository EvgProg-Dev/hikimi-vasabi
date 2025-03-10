import { FC } from "react";
import style from './NoProductFound.module.css'


export const NoProductsFound: FC = () => {
    return (
        <div className={style.no_product_found}>
            <h2>Товарів в цій категорії не знайдено.</h2>
            <p>Будь ласка, виберіть іншу категорію або спробуйте пізніше.</p>
        </div>
    );
};

