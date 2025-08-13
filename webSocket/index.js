const socketEvents = require('./socketEvents');
const onlineUsers = require('../utils/onlineUsers');
 
module.exports = (server) => {
    const { Server } = require("socket.io");
 
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
 
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
 
        const userId = socket.handshake.query.userId;
 
        if (userId) {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} connected & is online`);
 
            // Broadcast updated list
            io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        } else {
            console.log(`Socket ${socket.id} connected without userId`);
        }
        // Pass both io and socket to handle events
        socketEvents(io, socket);
 
        socket.on("disconnect", () => {
            // console.log("User disconnected:", socket.id);
            let disconnectedUserId = null;
            for (let [uid, sid] of onlineUsers.entries()) {
                if (sid === socket.id) {
                    disconnectedUserId = uid;
                    onlineUsers.delete(uid);
                    break;
                }
            }
 
            if (disconnectedUserId) {
                console.log(`User ${disconnectedUserId} disconnected`);
                io.emit("onlineUsers", Array.from(onlineUsers.keys()));
            }
        });
    });
};