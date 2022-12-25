import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface userAuthState {
    currentChat: number | undefined,
    currentMessage: string | undefined,
}

const initialState: userAuthState = {
    currentChat: undefined,
    currentMessage: undefined
};

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {

        setCurrentMessage(state, action) {
            state.currentMessage = action.payload
        },

        setCurrentChat(state, action) {
            state.currentChat = action.payload
        }

    },
});

export const { setCurrentMessage } = chatSlice.actions;
export const { setCurrentChat } = chatSlice.actions;

export const selectCurrentMessage = (state: AppState) => state.chatSlice.currentMessage;
export const selectCurrentChat = (state: AppState) => state.chatSlice.currentChat;

export default chatSlice.reducer;