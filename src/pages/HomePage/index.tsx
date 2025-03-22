import { useEffect, useRef } from "react";
import qs from "qs";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState, useAppDispatch } from "../../redux/store";
import {
    changeCurrentPage,
    changeFilters,
} from "../../redux/slices/filterSlice";
import { fetchProducts } from "../../redux/slices/productSlice";

import { sortList } from "../../list/sortList";
import { ErrorPage } from "../ErrorPage";

import { ProductType } from "src/types";

import { ProductCard } from "../../components/ProductCard";
import { Pagination } from "../../components/Pagination";
import { Categories } from "../../components/Categories";
import { Sort } from "../../components/Sort";
import { NoProductsFound } from "../../components/NoProductFound";
import { SkeletonProductCard } from "../../components/ProductCard/SkeletonProductCard";

import style from "./HomePage.module.css";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { activeCategory, activeSort, totalPages, currentPage } = useSelector(
        (state: RootState) => state.filter
    );
    const { products, status, errors } = useSelector(
        (state: RootState) => state.products
    );
    const handlePageChange = (page: number) => {
        dispatch(changeCurrentPage(page));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((obj) => obj.sort === params.sort);

            dispatch(
                changeFilters({
                    ...params,
                    activeSort: sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    const fetchData = async () => {
        try {
            dispatch(
                fetchProducts({
                    activeCategory: activeCategory.id,
                    activeSort: activeSort.sort,
                    currentPage,
                })
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("ERROR!");
            }
        }
    };

    useEffect(() => {
        if (!isSearch.current) {
            fetchData();
        }

        isSearch.current = false;
    }, [activeCategory, activeSort, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: activeSort.sort,
                category: activeCategory.id,
                page: currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [activeCategory, activeSort, currentPage]);

    if (status === "error") {
        return <ErrorPage errors={errors} />;
    }
    return (
        <>
            <Helmet>
                <title>Hikimi Vasabi - Суші шоп в Кременчуці</title>
            </Helmet>
{/* 
            <div>
                <h2 className={style.menu__title}>🏷️ Акції</h2>
                <div className={style.sales_card__wrapper}>
                    <SkeletonProductCard />
                    <SkeletonProductCard />
                    <SkeletonProductCard />
                    <SkeletonProductCard />
                    <SkeletonProductCard />
                </div>
            </div>

            <hr />

            <h2 className={style.menu__title}>📖 Меню</h2> */}

            <Categories />
            <Sort />

            <h2 className={style.product__title}>{activeCategory.title}</h2>

            {status === "loading" ? (
                <div className={style.product_card__wrapper}>
                    {[...Array(10)].map((_, i) => (
                        <SkeletonProductCard key={i} />
                    ))}
                </div>
            ) : products.length > 0 ? (
                <div className={style.product_card__wrapper}>
                    {products.map((product: ProductType) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            ) : (
                <NoProductsFound />
            )}

            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};
