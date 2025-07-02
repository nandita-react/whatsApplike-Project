const Group=require("./schema");

class GroupRepo{
    constructor(request){
        this.requestBody=request?.body;
        this.userId=request.userId;
    }

    async create(){
        this.requestBody.createdBy=this.userId;
        const group=new Group(this.requestBody);
        return await group.save()
    }

    async addMember(groupId,userId){
        return await Group.findByIdAndUpdate(
            groupId,
            {$addToSet:{members:userId}},
            {new:true}
        )
    }


    async assignAdmin(groupId,userId){
           return await Group.findByIdAndUpdate(
            groupId,
            {$addToSet:{admins:userId}},
            {new:true}
           )
    }

    async findById(id){
        const group=await Group.findById(id).populate('members admins createdBy');
        if(! group) throw new Error("Group not found");
        return group;
    }

    async update(groupId){
        return await Group.findByIdAndUpdate(
            groupId,
            this.requestBody,
            {new:true}

        )
    }

    async deleteGroup(groupId){
        const deleted=await Group.findByIdAndDelete(groupId);
        if(!deleted) throw new Error("Group not found or already deleted");
        return groupId
    }
}

module.exports=GroupRepo