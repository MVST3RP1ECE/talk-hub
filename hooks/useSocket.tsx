import React, { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { config } from 'dotenv';
config()

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(`http://localhost:${process.env.SERVER_PORT}/room`);

        return () => {
            socketRef.current?.disconnect();
        }
    }, [])

    return socketRef.current;
}

export default useSocket