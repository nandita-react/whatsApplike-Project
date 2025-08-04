const Message = require("./schema");
const Chat = require("../chat/schema")


class messageRepository {
    constructor(request) {
        this.requestBody = request?.body;
        this.query = request.query;
        this.userId = request.user?._id;
    }



    async createMessage() {
        const newMessage = new Message(this.requestBody);

        console.log(newMessage);
        return await newMessage.save();
    }

    async getMessageByChat(id) {
        const message = await Message.find({ chat: id })
            // .populate('sender', 'name')
            .populate('replyTo')
            .populate('forwardedFrom', 'name')
            .populate('reactions.user', 'name')
            .sort({ createdAt: 1 });

        return message
    }

    async editMessage(id) {
        return await Message.findByIdAndUpdate(id, { content: this.requestBody.content, isEdited: true }, { new: true })
    }

    async deleteMessageForUser(messageId) {
        return await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { deletedBy: this.userId } },
            { new: true }
        );
    }

    async reactMessage(id) {
        const { emoji } = this.requestBody;
        const message = await Message.findById(id);

        // Filter out any previous reaction by this user
        message.reactions = message.reactions.filter(
            r => r.user.toString() !== this.userId.toString()
        );

        // Add the new reaction
        message.reactions.push({ emoji, user: this.userId });

        await message.save();
        return message;
    }

    // async reactMessage(id) {
    //     const { emoji } = this.requestBody;
    //     const message = await Message.findById(id);

    //     const existingReactionIndex = message.reactions.findIndex(
    //         r => r.user.toString() === this.userId.toString()
    //     );

    //     if (existingReactionIndex !== -1) {
    //         // If user already reacted, update their emoji
    //         message.reactions[existingReactionIndex].emoji = emoji;
    //     } else {
    //         // Else, add new reaction
    //         message.reactions.push({ emoji, user: this.userId });
    //     }

    //     await message.save();
    //     return message;
    // }


    async removeReaction(id) {
        return await Message.findByIdAndUpdate(id, { $pull: { reactions: { user: this.userId } } }, { new: true })
    }

    async forwardMessageToChat(messageId, chatId) {
        const originalMessage = await Message.findById(messageId);
        if (!originalMessage) throw new Error('Original message not found');

        const newMessage = await Message.create({
            chat: chatId,
            sender: this.userId,
            content: originalMessage.content,
            messageType: originalMessage.messageType,
            forwardedFrom: originalMessage.sender,
        });

        // Optionally update lastMessage in Chat
        await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

        return newMessage;
    }
}

module.exports = messageRepository;