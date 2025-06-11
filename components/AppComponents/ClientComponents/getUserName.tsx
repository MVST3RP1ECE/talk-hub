"use client";

import { setUsers } from "@/store/slices/roomSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function GetUserName() {
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.createRoom.userName);
    const usersInRoom = useSelector((state: RootState) => state.room.users);

    useEffect(() => {
        dispatch(setUsers([userName]));

        return () => {
            dispatch(setUsers([]));
        }
    }, [userName, dispatch]);

    return (
        <div className='flex items-center justify-center flex-col gap-2'>
            <h1 className='text-xl'> UserName: {userName}</h1>
            <h1 className='text-xl'> Users in room: </h1>
            {usersInRoom.map((user, index) => (
                console.log(user),
                <span key={`user-${user}-${index}`}>{user}</span>
            ))}
        </div>
    )
}
