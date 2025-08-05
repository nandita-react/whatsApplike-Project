const Message = require('../message/schema');
const onlinerUsers = require('../utils/onlineUsers');



module.exports = (io, socket) => {
    socket.on("sendMessage", async ({ senderId, receiverId, chatId, content, messageType = "Text" }) => {
        console.log(`${senderId}->${receiverId} :${content}`);



        try {
            const newMessage = await Message.create({
                chat: chatId,
                messageuser: senderId,
                content,
                messageType
            })

            io.to(socket.id).emit("message:sent", newMessage);
            const receiverSocketId = onlinerUsers.get(receiverId);

            if (receiverSocketId) {
                // ✅✅ Emit to receiver
                io.to(receiverSocketId).emit("receiveMessage", newMessage);

                // ✅✅ Add to deliveredTo
                await Message.findByIdAndUpdate(newMessage._id, {
                    $addToSet: { deliveredTo: receiverId }
                });

                // Notify sender about delivery
                io.to(socket.id).emit("message:delivered", {
                    messageId: newMessage._id,
                    userId: receiverId
                });
            } else {
                console.log(`User ${receiverId} is offline. Consider push or store for later.`);
            }
        }catch(err){
            console.log("Message send error",err)
        }
     

    });

    socket.on("message:read",async({messageId,readerId})=>{
        try{
            await Message.findByIdAndUpdate(messageId,{
                $addToSet:{readBy:readerId}
            });
            const message=await Message.findById(messageId);
            if(message){
                const senderSocketId=onlinerUsers.get(message.messageuser.toString());
                if(senderSocketId){
                    io.to(senderSocketId).emit("message:read",{
                        messageId,
                        userId:readerId
                    })
                }
            }
        }catch(err){
            console.log("read receipt error",err)
        }
    })

    socket.on("typing", ({ senderId, receiverId }) => {
        const receiverSocketId = onlinerUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("typing", { senderId });
        }
    });

    socket.on("stopTyping ", ({ senderId, receiverId }) => {
        const receiverSocketId = onlinerUsers.get(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("stopTying", { senderId })
        }
    })
}