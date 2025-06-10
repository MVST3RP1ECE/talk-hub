import express, { json } from "express";
import { config } from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors"

config({ path: ".env" });
const SERVER_PORT = process.env.SERVER_PORT


const app = express().use(json()).use(cors());
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


io.on("connection", socket => {
    console.log("User connected =>", socket.id);

    socket.on("join-room", data => {
        socket.join(data.room)
        socket.to(data.room).emit("recive-message", { data, user: socket.id })


        console.log("join-room", data, socket.id);
    })

    socket.on("send-message", data => {
        console.log("send-message", data);
        // socket.broadcast.emit("recive-message", { data, user: socket.id }) // Для всех
        socket.to(data.room).emit("recive-message", { data, user: socket.id })

        // io.to(data.room).emit("recieve-message", data)
    })

})

server.listen(SERVER_PORT, () => {
    console.log(`Express server ready on PORT ${SERVER_PORT}`);
});

