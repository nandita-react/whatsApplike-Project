const Schema=require('../user/schema');

class otpRepository{
    constructor(request){
        this.requestBody=request?.body
    }

    async createOtp(){
        const {phoneNumber,otp,expiresAt}=this.requestBody

        const result=await Schema.findOneAndUpdate(
            {phoneNumber},
            {otp,expiresAt},
            {upsert:true }
        )
        return result
    };


}
module.exports=otpRepository;