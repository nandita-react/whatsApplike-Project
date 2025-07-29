const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true, // not "require"
        validate: {
            validator: function (v) {
                return /^[6-9]\d{9}$/.test(v); 
            },
            message: props => `${props.value} is not a valid Indian phone number!`
        },
        unique:true
    },

    image: {
        url: { type: String, default: null },
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    
     status: {
        type: String,
        default: 'Hey there! I’m using ChatApp.'
    },

    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

})

userSchema.pre("save", async function (next) {
  const existingDocCount = await mongoose.models.User.countDocuments({
    name: this.name
  });

  if (existingDocCount > 0) {
    const err = new Error("User with this name already exists");
    return next(err); 
  }

  next(); 
});

module.exports = mongoose.model('User', userSchema);