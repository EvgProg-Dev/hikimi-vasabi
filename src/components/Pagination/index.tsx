// import ReactPaginate from "react-paginate";
// import { useSelector } from "react-redux";
// import { FC, memo } from "react";



// import { RootState, useAppDispatch } from "./../../../src/redux/store";

// import { changeCurrentPage } from "../../redux/slices/filterSlice";

// import style from "./Pagination.module.css";


// export const Pagination: FC = memo(({totalPages, currentPage, changeCurrentPage}) => {


//     return (
//         <ReactPaginate
//             className={style.pagination}
//             forcePage={currentPage - 1}
//             breakLabel="..."
//             nextLabel="▶"
//             onPageChange={(e) => dispatch(changeCurrentPage(e.selected + 1))}
//             pageRangeDisplayed={5}
//             pageCount={totalPages}
//             previousLabel="◀"
//             renderOnZeroPageCount={null}
//             containerClassName={style.pagination}
//             pageClassName={style.pageItem}
//             activeClassName={style.selected}
//             previousClassName={style.previous}
//             nextClassName={style.next}
//             disabledClassName={style.disabled}
//         />
//     );
// });



import ReactPaginate from "react-paginate";
import { FC, memo } from "react";
import style from "./Pagination.module.css";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = memo(({ totalPages, currentPage, onPageChange }) => {
    return (
        <ReactPaginate
            className={style.pagination}
            forcePage={currentPage - 1}
            breakLabel="..."
            nextLabel="▶"
            onPageChange={(e) => onPageChange(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="◀"
            renderOnZeroPageCount={null}
            containerClassName={style.pagination}
            pageClassName={style.pageItem}
            activeClassName={style.selected}
            previousClassName={style.previous}
            nextClassName={style.next}
            disabledClassName={style.disabled}
        />
    );
});
