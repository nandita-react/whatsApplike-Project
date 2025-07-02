const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
               ref:'User',
               required:true
    },
    reportedUser:{
        type:mongoose.Schema.Types.ObjectId,
               ref:'User',
               required:true
    },
    reason:{
        type:String,
        required:true,
        enum:["spam", "abuse", "fake account", "other"]
    },
    description:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

})

module.exports=mongoose.model("Report",reportSchema);