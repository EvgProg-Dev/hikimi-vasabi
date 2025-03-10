import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { Status } from "../../types";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (
        { status, currentPage }: { status: string; currentPage: number },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await axios.get(
                `/orders?status=${status}&page=${currentPage}&limit=10`
            );
            return data;
        } catch (error) {
            return rejectWithValue("Ошибка при получении заказов");
        }
    }
);

const initialState = {
    orders: [],
    filter: {
        status: "new",
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
    },
    status: Status.IDLE,
    errors: "",
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders(state, action) {
            state.orders = action.payload.orders;
            state.filter.totalPages = action.payload.totalPages;
        },
        setFilter(state, action) {
            state.orders = [];
            state.filter = { ...state.filter, ...action.payload };
        },
        setError(state, action) {
            state.errors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload.orders;
                state.filter.totalPages = action.payload.totalPages;
                state.filter.totalItems = action.payload.totalItems;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.orders = [];
                state.status = Status.ERROR;
                state.errors = action.payload as string;
            });
    },
});

export const { setOrders, setFilter, setError } = orderSlice.actions;
export default orderSlice.reducer;
