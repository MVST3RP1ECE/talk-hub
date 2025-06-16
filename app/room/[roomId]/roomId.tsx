"use client";

import { GetUserName } from '@/components/AppComponents/ClientComponents/getUserName';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSocket from '@/hooks/useSocket';
import { TCreateRoomState } from '@/store/slices/createRoomSlice';
import { receiveMessageTransfer } from '@/store/slices/msgTransfer';
import { setUsers } from '@/store/slices/roomSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type TRreciveMessage = {
    message: string,
    roomName: string,
    userSender: string
}

function RoomId({ roomId }: { roomId: string }) {

    const socket = useSocket();
    const dispatch = useDispatch();
    const router = useRouter();

    const users = useSelector((state: RootState) => state.room.users);
    const userName = useSelector((state: RootState) => state.createRoom.userName);
    const room = useSelector((state: RootState) => state.createRoom.roomName);
    const createdRooms = useSelector((state: RootState) => state.createRoom.createdRooms);

    const messages = useSelector((state: RootState) => state.messagesTransfer.messages);

    console.log(userName, users);



    const [message, setMessage] = useState('');
    useEffect(() => {
        // TODO: FIX socket "join-room"

        // Создали комнату, отправили инфу на сервер.
        socket.emit("join-room", { roomName: room, userName, createdRooms })
        socket.on("join-room", (data: TCreateRoomState) => {
            dispatch(setUsers([...data.userName]))
            console.log(users);
        })

        // Подписка на обновление пользователей в комнате
        socket.on("room-users", (userList: string[]) => {
            dispatch(setUsers(userList));
        });

        console.log(...createdRooms);

        socket.on("receive-message", (msg) => {
            dispatch(receiveMessageTransfer(msg))
        })

        socket.on("user-left", (username: string) => {
            alert(`Пользователь ${username} вышел из комнаты.`);
            router.replace("/");
        })

        return () => {
            disconnect();
        }
    }, [socket]);

    function disconnect() {

        // TODO: FIX pipline

        // socket.off("receive-message");
        socket.off();

        // При отключении ХОСТА от комнаты, вызываем событие 'room-closed'
        // передаём имя комнаты и имя ХОСТА комнаты, которая закрывается
        socket.emit("room-closed", { roomName: room, userName: userName });
        // socket.disconnect();

        console.log(`User Disconnected from room ${room} `);

        dispatch(setUsers([]));

        router.replace("/");
    }

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("send-message", { message: message, roomName: room, userName: userName });
        setMessage("");
    }

    return (
        <section className='flex content-center flex-row gap-2 h-screen w-screen bg-muted'>
            <aside className='flex h-full w-1/6 bg-muted flex-col gap-2'>
                <Button className='box-border m-4 border-2 border-chart-2 bg-muted text-foreground
                hover:cursor-pointer hover:bg-chart-2'
                    variant={'default'}
                    onClick={disconnect}> Disconnect </Button>
                <GetUserName userName={userName} users={users} />
            </aside>
            <div className='flex content-center justify-between h-full w-5/6 flex-col'>
                <div className='flex items-center justify-center flex-row gap-2 mt-4'>
                    <h1 className='text-2xl font-bold'> Room: {roomId}</h1>
                    {/* <span className='ml-4 text-lg'>Пользователей в комнате: {users.length}</span> */}
                </div>
                <div>
                    <h2 className='text-xl font-bold'>Messages</h2>
                    <div className='flex flex-col gap-2'>
                        {messages.map((msg, index) => (
                            <div key={Math.random() * (index + 1)} className='bg-muted border-2 border-primary rounded-md p-2 mb-4'>
                                <p className='font-bold'>{msg.userName}: {msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center justify-between gap-2 mb-6'>
                        <Input type='text' placeholder='Введите сообщение'
                            value={message}
                            onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
                            onChange={(e) => setMessage(e.target.value)} />
                        <Button onClick={sendMessage}> Отправить</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomId