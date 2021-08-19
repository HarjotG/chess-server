"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io;
var gameSocket;
// registerig event listeners and emitters
var initgame = function (sio, socket) {
    io = sio;
    gameSocket = socket;
    gameSocket.on("createNewGame", createNewGame);
    gameSocket.on("playerJoinsGame", playerJoinsGame);
    gameSocket.on("giveName", giveName);
    gameSocket.on("playerMoved", playerMoved);
};
var createNewGame = function (gameid) {
    gameSocket.emit("createNewGame", gameid);
    gameSocket.join(gameid);
    console.log("new game created with id: " + gameid);
};
var playerJoinsGame = function (info) {
    io.to(info.gameid).emit("playerJoined", info.name); // tell the room creator that another player joined
    gameSocket.join(info.gameid);
    console.log("player " + info.name + " joined game room " + info.gameid);
};
var giveName = function (info) {
    io.to(info.gameid).emit("oppName", info.name); // only the player that joined from the link will be listening for this
};
var playerMoved = function (move) {
    var moveSend = { from: move.from, to: move.to, promotion: move.promotion };
    // send the move to the other player
    io.to(move.gameid).emit("otherMoved", moveSend);
};
exports.default = initgame;
