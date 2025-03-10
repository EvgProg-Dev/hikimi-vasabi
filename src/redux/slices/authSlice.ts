import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthParams, AuthResponse, Status } from "./../../types";
import axios from "./../../axios";

export const fetchAuth = createAsyncThunk<
    AuthResponse | null,
    AuthParams,
    { rejectValue: string }
>("auth/fetchAuth", async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("/auth/login", params);
        return data;
    } catch (error) {
        console.error(error);
        return rejectWithValue("Failed to authenticate. Please try again.");
    }
});

export const fetchAuthMe = createAsyncThunk<AuthResponse | null, void, { rejectValue: string }>(
    "auth/fetchAuthMe",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/auth/me");
            return data;
        } catch (error) {
            return rejectWithValue("Не вдалося отримати дані користувача.");
        }
    }
);

const initialState = {
    data: null as AuthResponse | null,
    status: Status.IDLE,
    error: null as string | null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.data = null;
                state.status = Status.LOADING;
                state.error = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.data = null;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null;
            });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
