const Repository=require('./repository');
const handler=require('../handler');
const { request, response } = require('express');


exports.send=async(request,response)=>{
    const msgRepo=new Repository(request);
    try{
        const msg=await msgRepo.send();
     return   handler.createdResponse(response,msg,"Message create Successfully")
    }catch(error){
      return  handler.errorResponse(response,error)
    }
}

exports.edit=async(request,response)=>{
    const msgRepo=new Repository(request);
    try{
        const msgEdit=await msgRepo.edit(request.params.editId);
     return   handler.successResponse(response,msgEdit,"Message Edit Successfully")
    }
    catch(error){
     return   handler.errorResponse(response,error);
    }
}

exports.delete=async(request,response)=>{
    const msgRepo=new Repository(request);
   try{
    const msgdelete=await msgRepo.delete(request.params.deleteId);
    handler.successResponse(response,msgdelete,"Message delete Successfully")
   }
   catch(error){
   return handler.createdResponse(response,error);
   }
}

exports.softDelete=async(request,response)=>{
    const msgRepo=new Repository(request);
  try{
    const softmsg=await msgRepo.softdelete(request.params.softdeleteId);
    return handler.successResponse(response,softmsg,"Soft Message  delete Successfully")
   }
   catch(error){
   return handler.createdResponse(response,error);
   }
  
}

exports.getAll=async(request,response)=>{
    const msgRepo=new Repository(request);
  try{
    const filter=request.query;
    const messages = await new Repository(request).find(filter);
    return handler.successResponse(response, messages, "Messages fetched");
  }
  catch (error) {
    return handler.errorResponse(response,error);
  }
}