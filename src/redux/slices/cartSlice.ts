import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "./../../types";
import { getCartFromLS } from "./../../utils/getCartFromLS";
import { calcTotalCart } from "../../utils/calcTotalCart";

interface CartSliceInterface {
    totalPrice: number;
    totalCount: number;
    items: CartItemType[];
}

const { items, totalCart } = getCartFromLS();

const updateCartTotals = (state: CartSliceInterface) => {
    const { totalCount, totalPrice } = calcTotalCart(state.items);
    state.totalCount = totalCount;
    state.totalPrice = totalPrice;
};

const initialState: CartSliceInterface = {
    items,
    totalPrice: totalCart.totalPrice,
    totalCount: totalCart.totalCount,
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            updateCartTotals(state);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            );
            updateCartTotals(state);
        },
        plusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) {
                findItem.count++;
            }
            updateCartTotals(state);
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem && findItem.count > 1) {
                findItem.count--;
            }
            updateCartTotals(state);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        },
    },
});

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
    cartSlice.actions;
export default cartSlice.reducer;
