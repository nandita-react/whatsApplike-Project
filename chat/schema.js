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
    ref: "Group",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/// ✅ Virtual field for lastMessage (insert here)
chatSchema.virtual('lastMessage', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'chat',
  justOne: true,
  options: {
    sort: { createdAt: -1 },
    select: 'content messageType createdAt messageuser'
  }
});


module.exports = mongoose.model('Chat', chatSchema);