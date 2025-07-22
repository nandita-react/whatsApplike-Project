const Repository=require('./repository');
const handler=require('../handler');

// exports.create=async(req,res)=>{
//     const chatRepo=new Repository(req);
//     try{
//         const newchat=await chatRepo.createChat();
//        return handler.successResponse(res,newchat,'Create New Chat');
//     }
//     catch(error)
//     { return handler.errorResponse(res,error)}
// }

// exports.getUserChats=async(req,res)=>{
//     const chatRepo= new Repository(req)
//  try{
//     const chat=await chatRepo.getChatsForUser(req.userId);
//     console.log(req.userId);
//   return  handler.successResponse(res,chat,"Chat Fetch successfully");
//  }catch(error){
//   return  handler.errorResponse(res,error)
//  }
// }

exports.createOneToOneChat=async(req,res)=>{
    const chatRepo=new Repository(req);
    const {receiverId}=req.body;

    try{
        const chat= await chatRepo.CreateOnetoOneChat(receiverId);
       return handler.successResponse(res,chat,'1-to-1 Chat created or fetched successfully')
    }catch(error){
       return handler.errorResponse(res,error)
    }
}

exports.createChatGroup = async (req, res) => {
    const chatRepo = new Repository(req); // assumes your repo takes the request

    try {
        const groupChat = await chatRepo.createChatGroup();
        return handler.successResponse(res, groupChat, 'Group chat created successfully');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
};

exports.getUserChats=async(req,res)=>{
    const chatRepo = new Repository(req);

    try {
        const chats = await chatRepo.getChatsForUser();
        return handler.successResponse(res, chats, 'Chats fetched successfully');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
}


exports.getChatById = async (req, res) => {
    const chatRepo = new Repository(req);

    try {
        const chat = await chatRepo.getChatById(req.params.id);
        return handler.successResponse(res, chat, 'Chat fetched successfully');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
};


exports.updateChatById = async (req, res) => {
    const chatRepo = new Repository(req);

    try {
        const updated = await chatRepo.updateChatById(req.params.id);
        return handler.successResponse(res, updated, 'Chat updated successfully');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
};


exports.deleteChat = async (req, res) => {
    const chatRepo = new Repository(req);

    try {
        const deleted = await chatRepo.deleteOneToOneChatWith(req.params.id); // id = receiverId or groupId
        return handler.successResponse(res, deleted, 'Chat deleted or left successfully');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
};

exports.addParticipants = async (req, res) => {
    const chatRepo = new Repository(req);

    try {
        const updatedGroup = await chatRepo.addParticipantsToGroup(req.params.id, req.body.participants);
        return handler.successResponse(res, updatedGroup, 'Participants added to group');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
};


exports.removeParticipant = async (req, res) => {
    const chatRepo = new Repository(req);

    try {
        const updatedGroup = await chatRepo.removeParticipantsFromGroup(req.params.id, req.params.userId);
        return handler.successResponse(res, updatedGroup, 'Participant removed from group');
    } catch (error) {
        return handler.errorResponse(res, error);
    }
};