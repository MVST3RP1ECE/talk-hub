"use client";
import { Button } from '@/components/ui/button';
import React from 'react'

function ActiveSingleRoom() {
    return (
        <div className='flex items-center justify-around w-full h-full bg-muted text-primary rounded-md border-2 border-primary'>
            <div className='flex flex-col items-center justify-center '>
                <h3>Hosted by: </h3>
                <span>user</span>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <h3>Room name: </h3>
                <span>{ }</span>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <Button variant={"default"} className='hover:cursor-pointer'> Connect </Button>
            </div>
        </div>
    )
}

export default ActiveSingleRoom