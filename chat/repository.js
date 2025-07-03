const { populate } = require('../user/schema');
const Schema = require('./schema');

class chatRepository {
    constructor(request) {
        this.requestBody = request?.body;
       this.userId = request?.user?.userId;
         
    }
    

    async createChat(){
       
        const{ participants=[],isGroup=false,group:groupId}=this.requestBody
        
        if(!isGroup){
            const existingChat=await Schema.findOne({
                isGroup:false,
                participants:{$all:participants,$size:2}
            });

            if(existingChat) return existingChat;
            const chat=new Schema({participants,isGroup:false});
            return await chat.save();
        }

        if(isGroup){
            const groupChat=new Chat({
                participants,
                isGroup:true,
                group:groupId
            });

            return await groupChat.save();
        }

    }



    async getChatsForUser(userId) {
        return await Schema.find({ participants: userId }).populate('participants', 'name phoneNumber image')
            .populate("group")
            .populate({
                path: 'latestMessage',
                populate: {
                    path: 'sender',
                    select: 'name'
                }
            })
            .sort({ updatedAt: -1 });
    }
}

module.exports = chatRepository;