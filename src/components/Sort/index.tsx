import { FC, memo, useEffect, useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import style from "./Sort.module.css";

import { RootState, useAppDispatch } from "../../redux/store";
import { changeActiveSort } from "../../redux/slices/filterSlice";
import { sortList } from "../../list/sortList";
import { SortListType } from "src/types";

export const Sort: FC = memo(() => {
    const dispatch = useAppDispatch();
    const sortRef = useRef<HTMLDivElement>(null);

    const activeSort = useSelector(
        (state: RootState) => state.filter.activeSort,
        shallowEqual
    );

    const [open, setOpen] = useState(false);

    const onClickList = (sortObj: SortListType) => {
        if (sortObj.sort !== activeSort.sort) {
            dispatch(changeActiveSort(sortObj));
        }
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                sortRef.current &&
                !sortRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);

        return () =>
            document.body.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={sortRef} className={style.sort}>
            <div className={style.sort__label}>
                <svg
                    width={10}
                    height={6}
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортування за:</b>
                <span onClick={() => setOpen(!open)}>{activeSort.name}</span>
            </div>
            {open && (
                <div className={style.sort__popup}>
                    <ul>
                        {sortList.map((sortObj, i) => (
                            <li
                                key={i}
                                className={
                                    activeSort.sort === sortObj.sort
                                        ? style.active
                                        : ""
                                }
                                onClick={() => onClickList(sortObj)}
                            >
                                <span>{sortObj.name.split(" ")[0]}</span>
                                <span className={style.sort__arrow}>
                                    {sortObj.name.split(" ")[1]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});
