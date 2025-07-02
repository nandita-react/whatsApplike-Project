const mongoose=require("mongoose");

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }],
    admins:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true 
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

})

groupSchema.pre('save',function (next){
    if(!this.members.includes(this.createdBy)){
        this.members.push(this.createdBy)
    }

    next();
})

module.exports=mongoose.model('Group',groupSchema);