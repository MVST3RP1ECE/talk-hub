import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TMessageStateToUser = {
    messageTo: string,
    messagesTo: string[],
    userNameReceiver: string,
};

const initialState: TMessageStateToUser = {
    messageTo: "",
    messagesTo: [],
    userNameReceiver: "",
};

export const msgToUser = createSlice({
    name: "msgToUser",
    initialState,
    reducers: {
        setMessageTo(state, action: PayloadAction<string>) {
            state.messageTo = action.payload;
        },
        setMessagesTo(state, action: PayloadAction<string[]>) {
            state.messagesTo = action.payload;
        },
        setUserNameReceiver(state, action: PayloadAction<string>) {
            state.userNameReceiver = action.payload;
        },
    }
});

export const { setMessageTo, setMessagesTo, setUserNameReceiver } = msgToUser.actions;