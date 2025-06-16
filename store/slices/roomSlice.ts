import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRoomState = {
    room: string,
    users: string[]
}

const initialState: TRoomState = {
    room: "",
    users: [] // Пустое
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<string>) {
            state.room = action.payload;
        },
        setUsers(state, action: PayloadAction<string[]>) {
            state.users = action.payload;
        }
    }
});

export const { setRoom, setUsers } = roomSlice.actions;