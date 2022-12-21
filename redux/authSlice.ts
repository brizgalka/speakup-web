import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
    authState: boolean;
    authPage: string;
}

// Initial state
const initialState: AuthState = {
    authState: false,
    authPage: "register"
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setAuthState(state, action) {
            state.authState = action.payload;
        },

        setAuthPage(state, action) {
            state.authPage = action.payload;
        },
    },
});

export const { setAuthState } = authSlice.actions;
export const { setAuthPage } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectAuthPage = (state: AppState) => state.auth.authPage;

export default authSlice.reducer;