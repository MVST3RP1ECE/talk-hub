"use client";

import useSocket from "@/hooks/useSocket";
import { setUsers } from "@/store/slices/roomSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function GetUserName() {

    // const socket = useSocket();

    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.createRoom.userName);
    const usersInRoom = useSelector((state: RootState) => state.room.users);
    // const roomName = useSelector((state: RootState) => state.createRoom.roomName);
    // const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);
    // console.log("usersInRoom -", usersInRoom);

    console.log(userName);


    useEffect(() => {
        // socket.emit("join-room", { roomName: roomName, userName: userName, createdRooms: createdRooms });

        dispatch(setUsers([userName]));
        // console.log("User connected");


        return () => {
            dispatch(setUsers([]));
        }
    }, [userName, dispatch]);

    return (
        <div className='flex items-center justify-center flex-col gap-2'>
            <h1 className='text-xl'> UserName: {userName}</h1>
            <h1 className='text-xl'> Users in room: </h1>
            {usersInRoom.map((user, index) => (
                // console.log("span user ->", user),
                <span key={`user-${user}-${index}`}>{user}</span>
            ))}
        </div>
    )
}
