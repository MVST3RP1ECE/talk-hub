"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setCreatedRooms, setRoomName, setUserName } from '@/store/slices/createRoomSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function CreateRoomName() {
    const roomName = useSelector((state: RootState) => state.createRoom.roomName)
    const userName = useSelector((state: RootState) => state.createRoom.userName)
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = async () => {
        await dispatch(setRoomName(roomName))
        await dispatch(setUserName(userName))
        await dispatch(setCreatedRooms([{ roomName, userName }]))
        console.log(roomName, userName);

        router.push(`/room/${roomName}`);
    }

    return (
        <div className='flex flex-col gap-2'>
            <Input type='text' placeholder='Room name' value={roomName}
                onChange={(e) => dispatch(setRoomName(e.target.value))} />

            <Input type='text' placeholder='My name' value={userName}
                onChange={(e) => dispatch(setUserName(e.target.value))} />
            <Button type='submit' variant={'default'} onClick={handleClick}>Create room </Button>
        </div>
    )
}

export default CreateRoomName