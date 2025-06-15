'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { config } from 'dotenv';
import React, { useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setMessage, setMessages } from '@/store/slices/messageSlice';
import { setUsers, setRoom } from '@/store/slices/roomSlice';
import Username from '@/components/AppComponents/username';
import useSocket from '@/hooks/useSocket';
config();


function Room() {

    const socket = useSocket();
    const message = useSelector((state: RootState) => state.message.message);
    const messages = useSelector((state: RootState) => state.message.messages);
    const users = useSelector((state: RootState) => state.room.users);
    const room = useSelector((state: RootState) => state.room.room);
    const userName = useSelector((state: RootState) => state.createRoom.userName);

    console.log(userName);

    const dispatch = useDispatch();
    useEffect(() => {
        socket.on("receive-message", dataS => {
            const message = dataS.data.message;
            const user = dataS.user;
            dispatch(setMessages([...messages, message]))
            dispatch(setUsers([...users, user]))
        })

        console.log(messages);

        return () => {
            socket.off("receive-message");
        }
    }, [socket]);

    const joinRoom = () => {
        if (room != "") {
            socket.emit("join-room", { roomName: room })
            console.log(room);
            dispatch(setRoom(room))
        }
    }

    const sendMessage = () => {
        dispatch(setMessages([...messages, message]))
        socket.emit("send-message", { message: message, roomName: room });
        console.log(message, messages);
        dispatch(setMessage(""))
    }

    return (
        <section className="flex items-center justify-center flex-col gap-2 h-screen w-screen">
            <div className="flex items-center justify-center w-1/2 h-1/2 bg-muted rounded-md flex-col border-2 border-border">
                <div className='flex justify-center w-1/3 h-1/3 rounded-md flex-col'>
                    <Username socketId={socket.id} />
                    <Input type='text' placeholder='Room' value={room} onChange={(e) =>

                        // setRoom(e.target.value)
                        dispatch(setRoom(e.target.value))
                    } />
                    <Button onClick={joinRoom} className='bg-primary text-primary-foreground'> Join room </Button>
                </div>
                <div className='flex justify-center w-1/3 h-1/3 rounded-md flex-col'>
                    <Input type='text' placeholder='Message' value={message || ""} onChange={(e) => dispatch(setMessage(e.target.value))} />
                    <Button onClick={sendMessage} className='bg-primary text-primary-foreground'> Send message </Button>
                </div>
                <div className='flex flex-col m-4 w-1/2 wrap-break-word text-foreground'>
                    Chat:
                    <h3 className='text-foreground'>
                        User: {users[users.length - 1]}
                        <br />
                        Message: {messages[messages.length - 1]}
                    </h3>
                    <h4 className='text-foreground'>

                    </h4>
                </div>
            </div>
        </section>
    )
}

export default Room