const Repository=require('./repository');
const handler=require('../handler');
const { response, request } = require('express');


exports.create=async (request,response)=>{
    const groupRepo=new Repository(request);

    try{
        const group=await groupRepo.create();
       return  handler.createdResponse(response,group,"Group Create Successfully")
    }catch(error){
      return  handler.errorResponse(response,error)
    }
}

exports.findById=async(request,response)=>{
       const groupRepo=new Repository(request);

       try{
        const group=await groupRepo.findById(request.params.id);
        return handler.successResponse(response,group,"fetch Successfully")
       }catch(error){
        return handler.errorResponse(response,error)
       }

}

exports.addmembers=async(request,response)=>{
    const groupRepo=new Repository(request);
    try{
        const groupId=request.params.groupId;
        const userId=request.params.userId;

        const addMemberOfgroup=await groupRepo.addMember(groupId,userId);
        return handler.successResponse (response,addMemberOfgroup,"Member add Successfully")
    }catch(error){
        return handler.errorResponse(response,error);
    }
}

exports.assignAdmin=async(request,response)=>{
    const groupRepo=new Repository(request);

     try{
        const groupId=request.params.groupId;
        const userId=request.params.userId;

        const aassignAdminOfgroup=await groupRepo.assignAdmin(groupId,userId);
        return handler.successResponse (response,aassignAdminOfgroup," Add Admin Successfully")
    }catch(error){
        return handler.errorResponse(response,error);
    }
}

exports.deleteGroup=async(request,response)=>{
    const groupRepo=new Repository(request);

     try{
        const deleteId=request.params.deleteId;
        const deleteGroup=await groupRepo.deleteGroup(deleteId);
        return handler.successResponse (response,deleteGroup," Group delete  Successfully")
    }catch(error){
        return handler.errorResponse(response,error);
    }
}