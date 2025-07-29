const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
     group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group", // reference your new Group schema
  },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },{
   timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }  
});

module.exports=mongoose.model('Chat',chatSchema);