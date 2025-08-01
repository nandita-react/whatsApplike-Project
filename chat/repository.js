const { populate } = require('../user/schema');
const Schema = require('./schema');
const {formatChatTime} =require('./helper')

class chatRepository {
    constructor(request) {
        this.requestBody = request?.body;
        this.userId = request?.userId;

        console.log(request.user);
    }


    // async createChat() {

    //     const { participants = [], isGroup = false, group: groupId } = this.requestBody

    //     if (!isGroup) {
    //         const existingChat = await Schema.findOne({
    //             isGroup: false,
    //             participants: { $all: participants, $size: 2 }
    //         });

    //         if (existingChat) return existingChat;
    //         const chat = new Schema({ participants, isGroup: false });
    //         return await chat.save();
    //     }

    //     if (isGroup) {
    //         const groupChat = new Chat({
    //             participants,
    //             isGroup: true,
    //             group: groupId
    //         });

    //         return await groupChat.save();
    //     }

    // }



    // async getChatsForUser(userId) {
    //     return await Schema.find({ participants: userId }).populate('participants', 'name phoneNumber image')
    //         .populate("group")
    //         .populate("lastMessage")
    //         // .populate({
    //         //     path: 'latestMessage',
    //         //     populate: {
    //         //         path: 'sender',
    //         //         select: 'name'
    //         //     }
    //         // })
    //         .sort({ updatedAt: -1 });
    // }

    //    async getChatsForUser(userId) {
    //     const chats = await Schema.find({ participants: userId })
    //       .populate('participants', 'name phoneNumber image')
    //       .populate('group')
    //       .populate({
    //         path: 'lastMessage',
    //         populate: {
    //           path: 'sender',
    //           select: 'name'
    //         }
    //       })
    //       .sort({ updatedAt: -1 })
    //       .lean();

    //     const modifiedChats = chats.map(chat => {
    //       if (!chat.isGroup) {
    //         // Only include the other participant (not the logged-in user)
    //         chat.participants = chat.participants.filter(
    //           p => p._id.toString() !== userId.toString()
    //         );
    //       }
    //       return chat;
    //     });

    //     return modifiedChats;
    //   }

    async CreateOnetoOneChat(receiverId) {
        let chat = await Schema.findOne({
            isGroup: false,
            participants: { $all: [this.userId, receiverId] }
        })

        if (!chat) {
            chat = new Schema({
                participants: [this.userId, receiverId],
                isGroup: false,
                createdBy: this.userId 
            });
            await chat.save()
        }
        return chat
    }

    async createChatGroup() {
        if (this.requestBody.participants.length < 2) {
            throw new Error('At least 2 participants required for a group chat');
        }

        const createGroup = new Schema(this.requestBody);
        return await createGroup.save()
    }


    async getChatsForUser() {
        const chats = await Schema.find({ participants: this.userId })
       
            .populate('participants', 'name phoneNumber image')
            .populate('group')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'messageuser',select:'_id'
                   
                }
            })
            .sort({ updatedAt: -1 })
            .lean();

        const modifiedChats = chats.map(chat => {
            if (!chat.isGroup) {
                // Only include the other participant (not the logged-in user)
                chat.participants = chat.participants.filter(
                    p => p._id.toString() !== this.userId.toString()
                );
            }
             if(chat.lastMessage?.createdAt){
                chat.lastMessage.formattedTime=formatChatTime(chat.lastMessage.createdAt);
             }

            return chat;
        });

       return modifiedChats;
    
    }

    async getChatById(id) {
        const chat = await Schema.findById(id)
            .populate('participants', 'name phoneNumber image')
            .populate('group')
            .populate({
                path: 'lastMessage',
                  populate: { path: 'messageuser',select:'_id'}
            })
            .lean(); 
        if (!chat) return null;
 
      
        if (!chat.isGroup) {
            chat.participants = chat.participants.filter(
                p => p._id.toString() !== this.userId.toString()
            );
        }

        return chat;
    }


    async updateChatById(id) {
        const updateBody = this.requestBody;
        return await Schema.findByIdAndUpdate(id, updateBody, { new: true })
    }

    async deleteOneToOneChatWith(reciverId) {
    const chat = await Schema.findOne({
        participants: { $all: [this.userId, reciverId] }
    });

    if (!chat) return null;

    // ✅ Handle Group Chat Case
    if (chat.isGroup) {
        chat.participants = chat.participants.filter(
            p => p.toString() !== this.userId.toString()
        );
        return await chat.save();  // 🔁 Save group chat with user removed
    } 
    // ✅ Handle 1-to-1 Chat Case
    else {
        if (chat.participants.length === 2) {
            return await Schema.findByIdAndDelete(chat._id);  // 🔁 Delete entire chat
        } else {
            return null;
        }
    }
}

    async addParticipantsToGroup(chatId, newParticipants) {
        return await Schema.findByIdAndUpdate(
            chatId,
            { $addToSet: { participants: { $each: newParticipants } } },
            { new: true })
            .populate('participants', 'name phoneNumber image')
    }

    async removeParticipantsFromGroup(chatId, userIdRemove) {
        return await Schema.findByIdAndUpdate(
            chatId,
            { $pull: { participants: userIdRemove } },
            { new: true }
        ).populate('participants', 'name phoneNumber image')
    }

}

module.exports = chatRepository;