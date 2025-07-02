const Repository=require("./schema")

class reportRepository{
    constructor(request){
        this.requestBody=request?.body;
        this.userId=request.userId;
    }

    async create(){
        const report=new Repository(this.requestBody);
        return await report.save()
    }

    async getAll(){
        return  await Repository.find().populate('reporter','name').populate("reportedUser", "name")
    }
}
module.exports=reportRepository