"use client";
import React from 'react'
import ActiveSingleRoom from './activeSingleRoom';

function ActiveRooms() {
    return (
        <section className='flex flex-col items-center justify-around w-1/2 h-1/5 bg-background border-2 border-border rounded-md gap-2'>
            <h1 className='flex items-center justify-center'>
                Active rooms
            </h1>
            <div className='flex flex-col items-center justify-center w-full h-full p-2'>
                <ActiveSingleRoom />
                {/* <ActiveSingleRoom /> */}
                {/* <ActiveSingleRoom /> */}
            </div>
        </section>
    )
}

export default ActiveRooms