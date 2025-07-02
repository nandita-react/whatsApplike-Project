const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    },
    content:{
        type:'String',
        required:true
    },
    messageType:{
        type:String,
        enum:["text","image","video","file"],
        default:"text"
    },
    isEdited:{
      type:Boolean,
      default:false
    },
    deletedBy:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]

},{
   timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
 
})

module.exports=mongoose.model('Message',messageSchema)