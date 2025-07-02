const onlineUsers = new Map();

socket.on("userOnline", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(` User ${userId} is online`);

    io.emit("onlineUser", Array.from(onlineUsers.keys()));
})

socket.on("disconnect",()=>{
    let disconnectedUserId=null; 
   
    for(let [userId,id] of onlineUsers){
        if(id=== socket.id){
            disconnectedUserId=userId;
            onlineUsers.delete(userId);
            break;
        }
    }

    if(disconnectedUserId){
        console.log(`User ${disconnectedUserId} disconnected`);

        io.emit("onlinerUser",Array.from(onlineUsers.keys()))
    }
})