import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface authState {
    uuid: string | undefined;
    isLoggened: string | undefined;
    username: string | undefined;
    registerConfirm: boolean | undefined;
    token: string | undefined;
    id: number | undefined
}

const initialState: authState = {
    uuid: undefined,
    isLoggened: undefined,
    username: undefined,
    id: undefined,
    registerConfirm: undefined,
    token: undefined
};

// Actual Slice
export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {

        setUUID(state, action) {
            state.uuid = action.payload;
        },

        setId(state, action) {
            state.id = action.payload;
        },

        setIsLoggened(state, action) {
            state.isLoggened = action.payload;
        },

        setUsername(state, action) {
            state.username = action.payload
        },

        setRegisterConfirm(state, action) {
            state.registerConfirm = action.payload
        },

        setToken(state, action) {
            state.token = action.payload
        }

    },
});

export const { setUUID } = authSlice.actions;
export const { setToken } = authSlice.actions;
export const { setIsLoggened } = authSlice.actions;
export const { setUsername } = authSlice.actions;
export const { setRegisterConfirm } = authSlice.actions;
export const { setId } = authSlice.actions;

export const selectUUID = (state: AppState) => state.authSlice.uuid;
export const selectTOKEN = (state: AppState) => state.authSlice.token;
export const selectIsLoggened = (state: AppState) => state.authSlice.isLoggened;
export const selectUsername = (state: AppState) => state.authSlice.username;
export const selectRegisterConfirm = (state: AppState) => state.authSlice.registerConfirm;
export const selectId = (state: AppState) => state.authSlice.id;

export default authSlice.reducer;