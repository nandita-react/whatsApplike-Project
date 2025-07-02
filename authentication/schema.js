const mongoose=require('mongoose');

const otpSchema=new mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

})

model.exports=mongoose.model('OTP',otpSchema);