import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TMessageState = {
    message: string,
    messages: string[]
}

const initialState: TMessageState = {
    message: "",
    messages: []
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
        setMessages(state, action: PayloadAction<string[]>) {
            state.messages = action.payload;
        }
    }
});

export const { setMessage, setMessages } = messageSlice.actions;