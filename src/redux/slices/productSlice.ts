import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "./../../axios";
import { changeTotalPages } from "./filterSlice";
import {
    FetchProductsAgrs,
    ProductSliceInterface,
    ProductType,
    Status,
} from "./../../types";

export const fetchProducts = createAsyncThunk<ProductType[], FetchProductsAgrs>(
    "products/fetchProducts",
    async ({ activeCategory, activeSort, currentPage }, thunkAPI) => {
        try {
            const { data } = await axios.get(
                `/products?category=${activeCategory}&sort=${activeSort}&limit=10&page=${currentPage}`
            );

            thunkAPI.dispatch(changeTotalPages(data.totalPages ?? 1));

            return data.products as ProductType[];
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue("ERROR!");
        }
    }
);

export const fetchRemoveProduct = createAsyncThunk<
    void,
    { id: string },
    { rejectValue: string }
>("products/fetchRemoveProduct", async ({ id }, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/products/${id}`);

        return data.products;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("ERROR!");
    }
});

const initialState: ProductSliceInterface = {
    products: [],
    status: Status.IDLE,
    errors: "",
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products = [];
                state.status = Status.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products = [];
                state.status = Status.ERROR;
                state.errors = action.payload as string;
            })

            .addCase(fetchRemoveProduct.pending, (state, action) => {
                state.products = state.products.filter(
                    (obj) => obj._id !== action.payload
                );
            })

            .addCase(fetchRemoveProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (obj) => obj._id !== action.meta.arg.id
                );
            });
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
