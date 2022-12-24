import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface userAuthState {
    uuid: string | undefined;
    isLoggened: string | undefined;
    username: string | undefined;
    registerConfirm: boolean | undefined;
}

// Initial state
const initialState: userAuthState = {
    uuid: undefined,
    isLoggened: undefined,
    username: undefined,
    registerConfirm: undefined
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

        setUsername(state, action) {
            state.username = action.payload
        },

        setRegisterConfirm(state, action) {
            state.registerConfirm = action.payload
        }

    },
});

export const { setUUID } = authSlice.actions;
export const { setIsLoggened } = authSlice.actions;
export const { setUsername } = authSlice.actions;
export const { setRegisterConfirm } = authSlice.actions;

export const selectUUID = (state: AppState) => state.userAuth.uuid;
export const selectIsLoggened = (state: AppState) => state.userAuth.isLoggened;
export const selectUsername = (state: AppState) => state.userAuth.username;
export const selectRegisterConfirm = (state: AppState) => state.userAuth.registerConfirm;

export default authSlice.reducer;