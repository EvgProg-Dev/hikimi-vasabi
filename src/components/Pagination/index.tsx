import ReactPaginate from "react-paginate";
import { FC, memo } from "react";
import style from "./Pagination.module.css";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = memo(
    ({ totalPages, currentPage, onPageChange }) => {
        return (
            <ReactPaginate
                className={style.pagination}
                forcePage={currentPage - 1}
                breakLabel="..."
                nextLabel={
                    <svg
                        className={style.arrow}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
                    </svg>
                }
                onPageChange={(e) => onPageChange(e.selected + 1)}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel={
                    <svg
                        className={style.arrow}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
                    </svg>
                }
                renderOnZeroPageCount={null}
                containerClassName={style.pagination}
                pageClassName={style.pageItem}
                activeClassName={style.selected}
                previousClassName={style.previous}
                nextClassName={style.next}
                disabledClassName={style.disabled}
            />
        );
    }
);
