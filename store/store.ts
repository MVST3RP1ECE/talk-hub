import { configureStore } from '@reduxjs/toolkit'
import { messageSlice } from './slices/messageSlice'
import { roomSlice } from './slices/roomSlice'

export const store = configureStore({
    reducer: {
        message: messageSlice.reducer,
        room: roomSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch