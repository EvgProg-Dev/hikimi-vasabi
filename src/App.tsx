import { Route, Routes } from "react-router-dom";
import { FC, useEffect } from "react";
import { lazy, Suspense } from "react";

import { CreateProduct } from "./pages/CreateProductPage";
import { Home } from "./pages/HomePage";

import { Spinner } from "./components/Spinner";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Scroll } from "./components/Scroll";
import { AdminMenu } from "./components/AdminMenu";

import { RootState, useAppDispatch } from "./redux/store";
import { fetchAuthMe } from "./redux/slices/authSlice";
import { useSelector } from "react-redux";

import "./App.css";
import { Order } from "./pages/OrderPage";
import { ToastContainer } from "react-toastify";
import { OrderInfo } from "./components/OrderInfo";

const Cart = lazy(() => import("./pages/CartPage"));
const ProductInfo = lazy(() => import("./pages/ProductInfoPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));
const Login = lazy(() => import("./pages/LoginPage"));

export const App: FC = () => {
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.data));
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(fetchAuthMe());
        }
    }, [dispatch]);
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <ToastContainer
                    toastClassName="custom-toast"
                    position="bottom-center"
                    autoClose={3000}
                />

                {isAuth && <AdminMenu />}
                <Header />
                <main className="container">
                    <Scroll />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/product-info/:id"
                            element={<ProductInfo />}
                        />
                        <Route
                            path="/product-info/:id/edit"
                            element={<CreateProduct />}
                        />
                        <Route path="/order-info/:id" element={<OrderInfo />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/create-product"
                            element={<CreateProduct />}
                        />
                        <Route path="/order" element={<Order />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </Suspense>
        </>
    );
};
