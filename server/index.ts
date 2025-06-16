import express, { json } from "express";
import { config } from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors"
import { TCreatedRooms, TCreateRoomState } from "@/store/slices/createRoomSlice";

config({ path: ".env" });
const SERVER_PORT = process.env.SERVER_PORT

const usersInRoom: string[] = [];
const createdRooms: Array<TCreatedRooms> = [];

const MAP_USERNAMES = new Map<string, string>()

const app = express().use(json()).use(cors());
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})


io.on("connection", socket => {
    console.log("User connected =>", socket.id);

    socket.emit("check-rooms", createdRooms);

    socket.on("disconnect", (reason) => {
        console.log(`User ${socket.id} - disconnected by - ${reason}`);
        MAP_USERNAMES.delete(socket.id)
        console.log(MAP_USERNAMES);

    })

    socket.on("confirm-username", (username: string) => {
        try {
            for (const [key, value] of MAP_USERNAMES) {
                console.log(`key ${key} - value ${value}`);
                if (value === username) {
                    return socket.emit("username-available", false);
                }
            }
            console.log("get ->", MAP_USERNAMES.get(username))
            console.log("has ->", MAP_USERNAMES.has(username))

            MAP_USERNAMES.set(socket.id, username);
            socket.emit("username-available", true);

            console.log(MAP_USERNAMES);
        } catch (error) {
            console.log(error);
        }

    })

    // Прослушиваем событие создания комнаты. Принимаем инфу с клиента если
    // тот создаст комнату
    socket.on("join-room", (data: TCreateRoomState) => {
        // Подключаем сокет к комнате
        socket.join(data.roomName)
        // Вызываем сообщение о том, что пользователь получает сообщения
        socket.to(data.roomName).emit("receive-message", { data, user: socket.id })
        // Уведомляем всех пользователей о создании комнаты 
        // Тригер ререндера главной страницы
        socket.broadcast.emit("room-created", data)



        console.log("join-room", data, socket.id);
    })

    socket.on("send-message", (data: { message: string, roomName: string }) => {
        console.log("send-message", data);
        console.log("CretedRooms->", createdRooms);
        // socket.broadcast.emit("receive-message", { data, user: socket.id }) // Для всех
        socket.to(data.roomName).emit("receive-message", { ...data, userSender: MAP_USERNAMES.get(socket.id) })

        // io.to(data.room).emit("recieve-message", data)
    })

    socket.on("room-closed", (data: TCreatedRooms) => {

        // socket.broadcast.emit("room-closed", data)
        socket.leave(data.roomName);
        socket.to(data.roomName).emit("user-left", MAP_USERNAMES.get(socket.id))

        createdRooms.forEach((room, index) => {
            if ((room.roomName === data.roomName) && (room.userName === data.userName)) {
                console.log(room, index);
                createdRooms.splice(index, 1)
                return createdRooms
            }
        })
        console.log("CHECK-ROOMS", createdRooms);

        if (createdRooms.length === 0) {
            io.emit("check-rooms", [])
        }

    })

    socket.on("room-created", (data: TCreatedRooms) => {
        createdRooms.push(data)
        socket.broadcast.emit("room-created", data)
    })

    socket.on("update-created-rooms", data => {

    })

})

server.listen(SERVER_PORT, () => {
    console.log(`Express server ready on PORT ${SERVER_PORT}`);
});

