const Message=require("./schema");

class messageRepository{
    constructor(request){
        this.requestBody=request?.body;
            this.query = request.query; 
          this.userId=request?.userId
    }

    // async send(){
    //     this.requestBody.createdBy=this.userId;
    //     const message=new Message(this.requestBody);
    //     return await message.save();
    // }
    // async edit(messageId){
    //     return await Message.findByIdAndUpdate(messageId,{content:this.requestBody.content,isEdited:true},{new:true})
    // }

    // async delete(messageId){
    //     return await Message.findByIdAndDelete(messageId)
    // }

    // async softdelete(messageId){
    //     return await Message.findByIdAndUpdate(messageId,{$addToSet:{deletedBy:this.userId}},{new:true})
    // }

    // async find(filter={}){
    //     return await Message.find(filter).populate('sender receiver group').sort({ createdAt: 1 });
    // }

   async getMessage(){
       const{receiverId,groupId}=this.query

       if(groupId){
        return await Message.find({group:groupId}).sort({createdAt:1})
       }

       if(receiverId){
        return await Message.find({
              $or: [
          { sender: this.userId, receiver: receiverId },
          { sender: receiverId, receiver: this.userId }
        ]
        }).sort({ createdAt: 1 });
       }
   } 
}

module.exports=messageRepository;