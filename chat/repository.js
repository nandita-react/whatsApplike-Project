const { populate } = require('../user/schema');
const Schema = require('./schema');

class chatRepository {
    constructor(request) {
        this.requestBody = request?.body;
        this.userId = request?.userId;

        console.log(request.user);
    }


    async createChat() {

        const { participants = [], isGroup = false, group: groupId } = this.requestBody

        if (!isGroup) {
            const existingChat = await Schema.findOne({
                isGroup: false,
                participants: { $all: participants, $size: 2 }
            });

            if (existingChat) return existingChat;
            const chat = new Schema({ participants, isGroup: false });
            return await chat.save();
        }

        if (isGroup) {
            const groupChat = new Chat({
                participants,
                isGroup: true,
                group: groupId
            });

            return await groupChat.save();
        }

    }



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

   async getChatsForUser(userId) {
    const chats = await Schema.find({ participants: userId })
      .populate('participants', 'name phoneNumber image')
      .populate('group')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'sender',
          select: 'name'
        }
      })
      .sort({ updatedAt: -1 })
      .lean();

    const modifiedChats = chats.map(chat => {
      if (!chat.isGroup) {
        // Only include the other participant (not the logged-in user)
        chat.participants = chat.participants.filter(
          p => p._id.toString() !== userId.toString()
        );
      }
      return chat;
    });

    return modifiedChats;
  }
}

module.exports = chatRepository;