const { Socket } = require('socket.io');
const Message = require('../message/schema');
const onlinerUsers = require('../utils/onlineUsers');



module.exports = (io, socket) => {
    socket.on("sendMessage", async (data) => {

        console.log(`${data.senderId}->${data.receiverId} :${data.content}`);



        try {
            const newMessage = await Message.create(data)

            io.to(socket.id).emit("message:sent", newMessage);
            const receiverSocketId = onlinerUsers.get(data.receiverId);

            if (receiverSocketId) {
                // ✅✅ Emit to receiver
                io.to(receiverSocketId).emit("receiveMessage", newMessage);

                // ✅✅ Add to deliveredTo
                await Message.findByIdAndUpdate(newMessage._id, {
                    $addToSet: { deliveredTo: data.receiverId }
                });

                // Notify sender about delivery
                io.to(socket.id).emit("message:delivered", {
                    messageId: newMessage._id,
                    userId: data.receiverId
                });
            } else {
                console.log(`User ${data.receiverId} is offline. Consider push or store for later.`);
            }
        } catch (err) {
            console.log("Message send error", err)
        }


    });

    socket.on("message:read", async ({ messageId, readerId }) => {
        try {
            await Message.findByIdAndUpdate(messageId, {
                $addToSet: { readBy: readerId }
            });
            const message = await Message.findById(messageId);
            if (message) {
                const senderSocketId = onlinerUsers.get(message.messageuser.toString());
                if (senderSocketId) {
                    io.to(senderSocketId).emit("message:read", {
                        messageId,
                        userId: readerId
                    })
                }
            }
        } catch (err) {
            console.log("read receipt error", err)
        }
    })

    socket.on("forwardMessage", async ({ senderId, receiverId, chatId, originalMessageId }) => {
        try {
            const originalMessage = await Message.findById(originalMessageId);

            const newMessage = new Message.create({
                chatId: chatId,
                messageuser: senderId,
                content: originalMessage.content,
                messageType: originalMessage.messageType,
                forwardedFrom: originalMessage.messageuser
            });

            io.to(Socket.io).emit('message:sent', newMessage);

            const receiverSocketId = onlinerUsers.get(receiverId);
            if (receiverSocketId) {
                io.to(socket.io).emit('receiveMessage', newMessage);

                await Message.findByIdAndUpdate(newMessage._id, {
                    $addToSet: { deliveredTo: receiverId }
                })

                io.to(socket.io).emit("message:delivered", {
                    messageId: newMessage._id,
                    userId: receiverId

                })
            }
        } catch (err) {
            console.error("Error in forwardMessage:", err);
        }
    })

    socket.on("editMessage",async({messageId,content,userId})=>{
        const message=await Message.findById(messageId)

        message.content=content;
        message.isEdited=true;


        await message.save();
        io.to(socket.io).emit("message:edited", message);
    })

    socket.on("deleteMessageForUser", async ({ messageId, userId }) => {
      await Message.findByIdAndUpdate(messageId, {
        $addToSet: { deletedBy: userId }
      });

      io.to(socket.id).emit("message:deleted", { messageId, userId });
    });

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