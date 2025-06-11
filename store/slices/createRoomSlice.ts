import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCreatedRooms = {
    roomName: string,
    userName: string
}

export type TCreateRoomState = {
    roomName: string,
    userName: string,
    createdRooms: Array<TCreatedRooms>
}

const initialState: TCreateRoomState = {
    roomName: "",
    userName: "",
    createdRooms: []
};

export const createRoomSlice = createSlice({
    name: "createRoom",
    initialState,
    reducers: {
        setRoomName(state, action: PayloadAction<string>) {
            state.roomName = action.payload;
        },
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setCreatedRooms(state, action: PayloadAction<Array<{
            roomName: string,
            userName: string,
        }>>) {
            state.createdRooms = action.payload
        }
    }
});

export const { setRoomName, setUserName, setCreatedRooms } = createRoomSlice.actions;