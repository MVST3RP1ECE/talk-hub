import { configureStore } from '@reduxjs/toolkit'
import { messageSlice } from './slices/messageSlice'
import { roomSlice } from './slices/roomSlice'
import { createRoomSlice } from './slices/createRoomSlice'

export const store = configureStore({
    reducer: {
        message: messageSlice.reducer,
        room: roomSlice.reducer,
        createRoom: createRoomSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch