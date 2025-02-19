import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173","https://p-chat-pro.netlify.app"],
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["websocket", "polling"] // 👈 Allow WebSocket + Polling for cross-origin support
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

export const sendNotification = (userId, notification) => {
    const socketId = userSocketMap[userId];
    if (socketId) {
      io.to(socketId).emit("notification", notification);
    }
};

const userSocketMap = {}; //{userId: socketId}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io,app,server} 