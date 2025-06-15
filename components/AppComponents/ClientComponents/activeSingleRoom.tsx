"use client";
import { Button } from '@/components/ui/button';
import useSocket from '@/hooks/useSocket';
import { setRoomName, setUserName } from '@/store/slices/createRoomSlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

function ActiveSingleRoom({ roomName, userName }: { roomName: string, userName: string }) {
    const router = useRouter();
    const socket = useSocket();
    const dispatch = useDispatch();

    console.log("ROOM NAME -> ", roomName);


    function connect() {
        dispatch(setRoomName(roomName));
        // dispatch(setUserName(userName));

        socket.emit("join-room", { roomName: roomName, userName: userName })

        router.push(`/room/${roomName}`)
    }

    return (
        <div className='flex items-center justify-around w-full min-h-[75px] bg-muted text-primary rounded-md border-2 border-primary'>
            <div className='flex flex-col items-center justify-center text-sm'>
                <h3>Hosted by: {userName}</h3>
            </div>
            <div className='flex flex-col items-center justify-center text-sm'>
                <h3>Room name: {roomName}</h3>
            </div>
            <div className='flex flex-col items-center justify-center text-sm'>
                <Button
                    variant={"default"}
                    className='hover:cursor-pointer w-full h-[25px]'
                    onClick={connect}> Connect </Button>
            </div>
        </div>
    )
}

export default ActiveSingleRoom