const Repository=require('./repository');
const handler=require('../handler');

exports.create=async(req,res)=>{
    const chatRepo=new Repository(req);
    try{
        const newchat=await chatRepo.createChat();
       return handler.successResponse(res,newchat,'Create New Chat');
    }
    catch(error)
    { return handler.errorResponse(res,error)}
}

exports.getUserChats=async(req,res)=>{
    const chatRepo= new Repository(req)
 try{
    const chat=await chatRepo.getChatsForUser(req.params.userId);
  return  handler.successResponse(res,chat,"Chat Fetch successfully");
 }catch(error){
  return  handler.errorResponse(res,error)
 }
}