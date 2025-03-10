import { FC, memo } from "react";
import { clsx } from "clsx";
import { shallowEqual, useSelector } from "react-redux";



import {
    changeActiveCategory,
    changeCurrentPage,
} from "../../redux/slices/filterSlice";
import { RootState, useAppDispatch } from "../../redux/store";

import { categoriesList } from "../../list/categoriesList";
import { CategoryListType } from "src/types";


import style from "./Categories.module.css";


export const Categories: FC = memo(() => {
    const dispatch = useAppDispatch();

    const activeCategory = useSelector((state: RootState) => state.filter.activeCategory, shallowEqual);

    const onChangeActiveCategory = (category: CategoryListType) => {
        dispatch(changeActiveCategory(category));
        dispatch(changeCurrentPage(1));
    };

    return (
        <div className={style.categories}>
            <ul className={style.categories__list}>
                {categoriesList.map((category) => (
                    <li
                        key={category.id}
                        className={clsx(style.categories__item, {
                            [style.active]: activeCategory.id === category.id,
                        })}
                        onClick={() => onChangeActiveCategory(category)}
                    >
                        {category.title}
                    </li>
                ))}
            </ul>
        </div>
    );
});
