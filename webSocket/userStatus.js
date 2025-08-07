const onlineUsers = new Map();

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("userOnline", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} is online`);

            io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        });

        socket.on("disconnect", () => {
            let disconnectedUserId = null;

            for (let [userId, id] of onlineUsers.entries()) {
                if (id === socket.id) {
                    disconnectedUserId = userId;
                    onlineUsers.delete(userId);
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
