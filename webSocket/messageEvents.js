const onlinerUsers=require('../utils/onlineUsers');

module.exports=(io,socket)=>{
    socket.on("sendMessage",({senderId,receiverId,message})=>{
        console.log(`${senderId}->${receiverId} :${message}`);

        const receiverSocketId=onlinerUsers.get(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("receiveMessage",{
                senderId,
                message,
                timestamp:new Date()
            })
        }
        else{
            console.log(` User ${receiverId} is offline. Store message in DB if needed.`);
        }

    });

    socket.on("typing",({senderId,receiverId})=>{
        const receiverSocketId=onlineUsers.get(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("typing",{senderId});
        }
    });

    socket.on("stopTyping ",({senderId,receiverId})=>{
        const receiverSocketId=onlinerUsers.get(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("stopTying",{senderId})
        }
    })
}