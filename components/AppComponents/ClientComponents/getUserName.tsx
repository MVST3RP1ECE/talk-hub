"use client";
import { setUsers } from "@/store/slices/roomSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function GetUserName({ userName, users }: { userName: string, users: string[] }) {


    useEffect(() => {
        console.log(userName, users);

    }, [userName, users])

    // const socket = useSocket();

    // const dispatch = useDispatch();
    // const userName = useSelector((state: RootState) => state.createRoom.userName);
    // const users = useSelector((state: RootState) => state.room.users)
    // const usersInRoom = useSelector((state: RootState) => state.room.users);



    // console.log(userName, users);

    // console.log(userName);


    // useEffect(() => {
    //     dispatch(setUsers([userName]));
    //     return () => {
    //         dispatch(setUsers([]));
    //     }
    // }, [userName]);

    return (
        <div className='flex items-center justify-center flex-col gap-2'>
            <h1 className='text-xl'> UserName: {userName}</h1>
            <h1 className='text-xl'> Users in room: </h1>
            {users.length === 0
                ? <span key={userName}>{userName}</span>
                : users.map((user, index) => (
                    <span key={`user-${user}-${index}`}>{user}</span>
                ))}
        </div>
    )
}
