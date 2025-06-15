"use client";
import React from 'react'
import ActiveSingleRoom from './activeSingleRoom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function ActiveRooms() {
    const userName = useSelector((state: RootState) => state.createRoom.userName);
    const roomName = useSelector((state: RootState) => state.createRoom.roomName);

    const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);
    return (
        <section className='flex flex-col items-center w-1/2 max-h-[200px] box-border bg-background border-2 border-border rounded-md gap-2'>
            <h1 className='flex items-center justify-center pt-2'>
                Active rooms
            </h1>
            <div className='flex flex-col items-center w-full p-2 gap-2 overflow-y-auto scrollbar-hidden'>
                {createdRooms.map((room, index) => (
                    <>
                        <ActiveSingleRoom key={index} roomName={room.roomName} userName={room.userName} />
                    </>
                ))}
            </div>
        </section>
    )
}

export default ActiveRooms