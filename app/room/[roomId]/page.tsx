"use client";
import React, { useEffect } from 'react'
import { GetUserName } from '@/components/AppComponents/ClientComponents/getUserName';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '@/store/slices/messageSlice';
import { setUsers } from '@/store/slices/roomSlice';
import { RootState } from '@/store/store';

const socket = io(`http://localhost:1111`);


export function RoomPage({ params }: { params: { roomId: string } }) {
    const { roomId } = params;
    const dispatch = useDispatch();

    const message = useSelector((state: RootState) => state.message.message);
    const messages = useSelector((state: RootState) => state.message.messages);
    const users = useSelector((state: RootState) => state.room.users);
    const userName = useSelector((state: RootState) => state.createRoom.userName);
    const room = useSelector((state: RootState) => state.createRoom.roomName);
    const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);

    useEffect(() => {
        socket.emit("join-room", { room, userName, createdRooms })
        socket.on("recive-message", dataS => {
            const message = dataS.data.message;
            const user = dataS.user;
            dispatch(setMessages([...messages, message]))
            dispatch(setUsers([...users, user]))
        })

        console.log(messages);

        return () => {
            socket.off("recive-message");
        }
    }, [socket]);

    return (
        <section className='flex items-center justify-center flex-col gap-2 h-screen w-screen bg-muted'>
            <div className='flex items-center justify-center flex-col gap-2'>
                <h1 className='text-2xl font-bold'> Room: {roomId}</h1>
                <GetUserName />
            </div>
        </section>
    )
}

export default RoomPage