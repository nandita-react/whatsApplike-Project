const socketEvent=require('./socketEvents');

module.exports=(server)=>{
    const io=require("socket.io")(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    });
  io.on("connected",(socket)=>{
    console.log("socket.id",socket.id);

    socketEvent(io,socket);

    socket.on("disconnected",()=>{
         console.log(" User disconnected:", socket.id);
    })
})

}

