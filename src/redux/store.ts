import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filterSlice from "./slices/filterSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import orderSlice from "./slices/orderSlice";


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        products: productSlice,
        cart: cartSlice,
        auth: authSlice,
        orders: orderSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
