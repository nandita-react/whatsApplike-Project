const socketEvents = require('./socketEvents');

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

    // Pass both io and socket to handle events
    socketEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};


