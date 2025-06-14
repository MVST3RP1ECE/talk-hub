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

const HASH_TABLE_USERNAMES = new Map<string, string>()

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

    socket.on("confirm-username", (username: string) => {
        try {
            if (HASH_TABLE_USERNAMES.has(username)) {
                // username already exist
                return socket.emit("username-available", false);
            }
            HASH_TABLE_USERNAMES.set(username, socket.id);
            socket.emit("username-available", true);

            console.log(HASH_TABLE_USERNAMES);
        } catch (error) {
            console.log(error);
        }

    })

    socket.on("join-room", (data: TCreateRoomState) => {
        socket.join(data.roomName)
        socket.to(data.roomName).emit("recive-message", { data, user: socket.id })

        socket.broadcast.emit("room-created", data)

        console.log("join-room", data, socket.id);
    })

    socket.on("send-message", (data: { roomName: string, message: string }) => {
        console.log("send-message", data);
        // socket.broadcast.emit("recive-message", { data, user: socket.id }) // Для всех
        socket.to(data.roomName).emit("recive-message", { data, user: socket.id })

        // io.to(data.room).emit("recieve-message", data)
    })

    socket.on("room-closed", (data: TCreatedRooms) => {
        socket.broadcast.emit("room-closed", data)

        // socket.leave(data.roomName);
        // socket.to(data.roomName).emit("user-left", { userName: data.userName });
    })

    socket.on("room-created", (data: TCreatedRooms) => {
        createdRooms.push(data)
        socket.broadcast.emit("room-created", data)
    })



})

server.listen(SERVER_PORT, () => {
    console.log(`Express server ready on PORT ${SERVER_PORT}`);
});

