"use client";
import { GetUserName } from '@/components/AppComponents/ClientComponents/getUserName';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSocket from '@/hooks/useSocket';
import { setMessage, setMessages } from '@/store/slices/messageSlice';
import { setUsers } from '@/store/slices/roomSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function RoomId({ roomId }: { roomId: string }) {

    const socket = useSocket();
    const dispatch = useDispatch();
    const router = useRouter();

    const message = useSelector((state: RootState) => state.message.message);
    const messages = useSelector((state: RootState) => state.message.messages);
    const users = useSelector((state: RootState) => state.room.users);
    const userName = useSelector((state: RootState) => state.createRoom.userName);
    const room = useSelector((state: RootState) => state.createRoom.roomName);
    const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);

    useEffect(() => {
        socket.emit("join-room", { roomName: room, userName, createdRooms })
        socket.on("recive-message", dataS => {
            const message = dataS.data.message;
            const user = dataS.user;
            dispatch(setMessages([...messages, message]))
            dispatch(setUsers([...users, user]))
        })

        console.log(messages);

        return () => {
            socket.off("recive-message");
            // socket.emit("room-closed", { roomName: room, userName })
            socket.on("disconnect", (reason) => {
                console.log(reason);

            })
            socket.off("room-closed");
        }
    }, [socket]);

    function disconnect() {
        socket?.emit("room-closed", { roomName: room, userName });
        socket?.close();
        router.replace("/");
    }

    // const joinRoom = () => {
    //     if (room != "") {
    //         socket.emit("join-room", { roomName: room })
    //         console.log(room);
    //         dispatch(setRoom(room))
    //     }
    // }

    const sendMessage = () => {
        dispatch(setMessages([...messages, message]))
        socket.emit("send-message", { message: message, roomName: room });
        console.log(message, messages);
        dispatch(setMessage(""))
    }

    return (
        <section className='flex content-center flex-row gap-2 h-screen w-screen bg-muted'>
            <aside className='flex h-full w-1/6 bg-muted flex-col gap-2'>
                <Button className='box-border m-4 border-2 border-chart-2 bg-muted text-foreground
                hover:cursor-pointer hover:bg-chart-2'
                    variant={'default'}
                    onClick={disconnect}> Disconnect </Button>
                <GetUserName />
            </aside>
            <div className='flex content-center justify-between h-full w-5/6 flex-col'>
                <div className='flex items-center justify-center flex-row gap-2 mt-4'>
                    <h1 className='text-2xl font-bold'> Room: {roomId}</h1>
                </div>
                <div>
                    <h2 className='text-xl font-bold'>Messages</h2>
                    <div className='flex flex-col gap-2'>
                        {messages.map((msg, index) => (
                            <div key={index} className='bg-background border-2 border-border rounded-md p-2 mb-4'>
                                <p className='font-bold'>{"Пользователь"}: {msg}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center justify-between gap-2 mb-6'>
                        <Input type='text' placeholder='Введите сообщение'
                            value={message}
                            onChange={(e) => dispatch(setMessage(e.target.value))} />
                        <Button onClick={sendMessage}> Отправить</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomId