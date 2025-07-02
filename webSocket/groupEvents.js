const onlinerUser=require('../utils/onlineUsers');

module.exports=(io,socket)=>{
    socket.on("joinGroup",({groupId,userId})=>{
        socket.join(groupId);
        console.log(`User ${userId} joined group ${groupId}`);

        socket.to(groupId).emit("groupNotification",{
            message:`User ${userId } has joined  the group`,
            groupId
        });
    });

    socket.on ("sendGroupMessage",({groupId,senderId,message})=>{
        console.log(`Group ${groupId} | ${senderId}: ${message}`);

        io.to(groupId).emit("receiveGroupMessage",{
            groupId,
            senderId,
            message,
            timestamp:new Date()
        })
    });

    socket.on("groupTyping",({groupId,senderId})=>{
        socket.to(groupId).emit("groupTyping",{senderId})
    });


    socket.on("groupStopTyping",({groupId,senderId})=>{
        socket.to(groupId).emit("groupStopTyping",{senderId})
    })
}