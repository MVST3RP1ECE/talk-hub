import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TMessageTransfer = {
    userName: string;
    message: string;
    timestamp: number;
};

interface MessagesState {
    messages: TMessageTransfer[];
}

const initialState: MessagesState = {
    messages: [],
};

export const messagesTransfer = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        receiveMessageTransfer: (state, action: PayloadAction<TMessageTransfer>) => {
            state.messages.push(action.payload);
        },
    },
});

export const { receiveMessageTransfer } = messagesTransfer.actions;
export default messagesTransfer.reducer;