import { useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { config } from 'dotenv';
config();

type TSocketInstance = Socket | null;
let socketInstance: TSocketInstance = null;

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    if (!socketRef.current) {
        if (!socketInstance) {
            socketInstance = io(`http://localhost:1111`);
        }
        socketRef.current = socketInstance;
    }
    return socketRef.current;
}

export default useSocket