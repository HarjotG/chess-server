"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var game_1 = __importDefault(require("./game"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        // to allow local testing on firefox
        origin: "*",
    },
});
io.on("connection", function (socket) {
    //console.log("new connection");
    game_1.default(io, socket);
});
server.listen(5000, function () {
    console.log("server is listening on port 5000");
});
