import { Socket } from 'socket.io';

// NOTE: инстанс сокета нужно передавать как параметр функции. 
// Передача сокета через хук useSocket - НЕВОЗМОЖНА
// т.к. хуки можно использовать только внутри функциональных компонентов


// TODO: Доделать проверки имени пользователя
function checkExistUserName(username: string, socket: Socket): Promise<boolean> {
    return new Promise((resolve) => {
        socket.emit("confirm-username", username);

        socket.on("username-available", (data: boolean) => {
            if (data === true) {
                console.log(`Пользователь с именем ${username} доступен`);
                resolve(true);
            } else {
                console.log(`Пользователь с именем ${username} уже существует`);
                resolve(false);
            }
        })
    });
}

export default checkExistUserName;