"use client";
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

function ActiveUserName() {
    const userName = useSelector((state: RootState) => state.createRoom.userName)

    return (
        <div className='flex absolute text-2xl justify-center pt-4 text-white'>
            <h3 >Username: {userName}</h3>
        </div>
    )
}

export default ActiveUserName