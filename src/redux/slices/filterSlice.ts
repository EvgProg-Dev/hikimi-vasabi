import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  CategoryListType, SortListType } from "src/types";

interface FilterSliceInterface {
    activeCategory: CategoryListType;
    activeSort: SortListType;
    totalPages: number;
    currentPage: number;
}
const initialState: FilterSliceInterface = {
    activeCategory: { id: "rolls", title: "🍣 Роли" },
    activeSort: {
        name: "рейтингом ▼",
        sort: "-rating",
    },
    totalPages: 1,
    currentPage: 1,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeActiveCategory: (state, action: PayloadAction<CategoryListType>) => {
            state.activeCategory = action.payload;
        },
        changeActiveSort: (state, action: PayloadAction<SortListType>) => {
            state.activeSort = action.payload;
        },
        changeTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = Math.max(1, action.payload);
        },
        changeCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        changeFilters: (
            state,
            action: PayloadAction<Partial<FilterSliceInterface>>
        ) => {
            const {
                currentPage: page,
                activeCategory: category,
                activeSort,
            } = action.payload;

            state.currentPage = page ? +page : 1;
            state.activeCategory = category || state.activeCategory;
            state.activeSort = activeSort || state.activeSort;
        },
    },
});

export const {
    changeActiveCategory,
    changeActiveSort,
    changeTotalPages,
    changeCurrentPage,
    changeFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
