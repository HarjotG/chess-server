import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import initgame from "./game";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // to allow local testing on firefox
        origin: "*",
    },
});
io.on("connection", (socket: Socket) => {
    //console.log("new connection");
    initgame(io, socket);
});

server.listen(5000, () => {
    console.log("server is listening on port 5000");
});
