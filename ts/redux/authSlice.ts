import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface userAuthState {
    uuid: string;
    isLoggened: boolean;
    token: string | null;
}

// Initial state
const initialState: userAuthState = {
    uuid: "",
    isLoggened: false,
    token: null
};

// Actual Slice
export const authSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {

        setUUID(state, action) {
            state.uuid = action.payload;
        },

        setIsLoggened(state, action) {
            state.isLoggened = action.payload;
        },

        setToken(state, action) {
            state.token = action.payload
        }
    },
});

export const { setUUID } = authSlice.actions;
export const { setIsLoggened } = authSlice.actions;
export const { setToken } = authSlice.actions;

export const selectUUID = (state: AppState) => state.userAuth.uuid;
export const selectIsLoggened = (state: AppState) => state.userAuth.isLoggened;
export const selectToken = (state: AppState) => state.userAuth.token;

export default authSlice.reducer;