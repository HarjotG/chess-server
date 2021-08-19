import { Server, Socket } from "socket.io";

let io: Server;
let gameSocket: Socket;

// registerig event listeners and emitters
const initgame = (sio: Server, socket: Socket) => {
    io = sio;
    gameSocket = socket;

    gameSocket.on("createNewGame", createNewGame);

    gameSocket.on("playerJoinsGame", playerJoinsGame);

    gameSocket.on("giveName", giveName);

    gameSocket.on("playerMoved", playerMoved);
};

const createNewGame = (gameid: string) => {
    gameSocket.emit("createNewGame", gameid);
    gameSocket.join(gameid);
    console.log("new game created with id: " + gameid);
};

const playerJoinsGame = (info: { gameid: string; name: string }) => {
    io.to(info.gameid).emit("playerJoined", info.name); // tell the room creator that another player joined
    gameSocket.join(info.gameid);

    console.log("player " + info.name + " joined game room " + info.gameid);
};

const giveName = (info: { gameid: string; name: string }) => {
    io.to(info.gameid).emit("oppName", info.name); // only the player that joined from the link will be listening for this
};

const playerMoved = (move: { gameid: string; from: string; to: string; promotion: string }) => {
    const moveSend = { from: move.from, to: move.to, promotion: move.promotion };
    // send the move to the other player
    io.to(move.gameid).emit("otherMoved", moveSend);
};

export default initgame;
