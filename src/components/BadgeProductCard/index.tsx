import { FC } from "react";
import style from "./BadgeProductCard.module.css";

type BadgeProps = {
    rating: number,
    isNew?: boolean,
    salePrice?: number,
}


export const BadgeProductCard: FC<BadgeProps> = ({ rating, isNew = false, salePrice}) => {
    return (
        <div className={style.badge_container}>
            {isNew && <span className={style.new_badge}>🌟 Новинка</span>}
            {rating === 10 && (
                <span className={style.top_badge}>🔥 Хіт продажів</span>
            )}
            {salePrice && <span className={style.sale_badge}>🔖 Суперціна</span>}
        </div>
    );
};
