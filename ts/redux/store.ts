import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {authSlice} from "./authSlice";
import {chatSlice} from "./chatSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [chatSlice.name]: chatSlice.reducer
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);