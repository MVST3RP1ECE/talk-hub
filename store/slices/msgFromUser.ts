import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TMessageStateFromUser = {
    messageFrom: string,
    messagesFrom: string[],
    userNameSender: string
};

const initialState: TMessageStateFromUser = {
    messageFrom: "",
    messagesFrom: [],
    userNameSender: "",
};

export const msgFromUser = createSlice({
    name: "msgFromUser",
    initialState,
    reducers: {
        setMessageFrom(state, action: PayloadAction<string>) {
            state.messageFrom = action.payload;
        },
        setMessagesFrom(state, action: PayloadAction<string[]>) {
            state.messagesFrom = action.payload;
        },
        setUserNameSender(state, action: PayloadAction<string>) {
            state.userNameSender = action.payload;
        },
    }
});

export const { setMessageFrom, setMessagesFrom, setUserNameSender } = msgFromUser.actions;