import { configureStore } from '@reduxjs/toolkit'
import { messageSlice } from './slices/messageSlice'
import { roomSlice } from './slices/roomSlice'
import { createRoomSlice } from './slices/createRoomSlice'
import { msgFromUser } from './slices/msgFromUser'
import { msgToUser } from './slices/msgToUser'
import { messagesTransfer } from './slices/msgTransfer'

export const store = configureStore({
    reducer: {
        message: messageSlice.reducer,
        room: roomSlice.reducer,
        createRoom: createRoomSlice.reducer,
        msgFromUser: msgFromUser.reducer,
        msgToUser: msgToUser.reducer,
        messagesTransfer: messagesTransfer.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch