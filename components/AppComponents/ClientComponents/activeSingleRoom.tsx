"use client";
import { Button } from '@/components/ui/button';
import useSocket from '@/hooks/useSocket';
import { useRouter } from 'next/navigation';
import React from 'react'

function ActiveSingleRoom({ roomName, userName }: { roomName: string, userName: string }) {
    const router = useRouter();
    const socket = useSocket();

    function connect() {
        socket.emit("join-room", { roomName, userName })
        router.push(`/room/${roomName}`)
    }

    return (
        <div className='flex items-center justify-around w-full h-full bg-muted text-primary rounded-md border-2 border-primary'>
            <div className='flex flex-col items-center justify-center '>
                <h3>Hosted by: </h3>
                <span>{userName}</span>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <h3>Room name: </h3>
                <span>{roomName}</span>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <Button
                    variant={"default"}
                    className='hover:cursor-pointer'
                    onClick={connect}> Connect </Button>
            </div>
        </div>
    )
}

export default ActiveSingleRoom