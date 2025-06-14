import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useSocket from '@/hooks/useSocket';
import { setUserName } from '@/store/slices/createRoomSlice';
import { RootState } from '@/store/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import checkExistUserName from '../serverActions/checkExistUserName';


// TODO: Доделать компонент с проверкой имени пользователя
function SetUserName() {
    const socket = useSocket();
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.createRoom.userName);

    async function saveUserName() {
        try {
            const isAvailable = await checkExistUserName(userName, socket);
            if (isAvailable) {
                dispatch(setUserName(userName));
                socket.emit("confirm-username", userName);
            } else {
                alert("Это имя пользователя уже занято");
            }
        } catch (error) {
            console.error("Error checking username:", error);
            alert("Произошла ошибка при проверке имени пользователя");
        }
    }

    return (
        <div className='w-1/2 flex items-center justify-between'>
            <Input
                className='mr-2'
                name='userName'
                placeholder='Введите имя пользователя...'
                value={userName}
                onChange={(e) => dispatch(setUserName(e.target.value))}
            />
            <Button
                className='bg-accent'
                variant={'default'}
                onClick={saveUserName}>Сохранить</Button>
        </div>
    )
}

export default SetUserName